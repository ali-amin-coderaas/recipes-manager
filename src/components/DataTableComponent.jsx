import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { Skeleton } from "primereact/skeleton";
import React, { useState } from "react";
import useAccounts from "../hooks/useAccounts";

const DataTableComponent = ({
	// customHook,
	columns,
	createDialog: CreateDialog,
	fields,
	onCreate,
	endpoint,
}) => {
	const {
		data: items,
		loading,
		currentPage,
		totalItems,
		pageSize,
		setCurrentPage,
	} = useAccounts(endpoint);

	const skeletonBodyTemplate = <Skeleton width="100%" />;

	const [dialogVisible, setDialogVisible] = useState(false);

	const handleCreate = () => {
		setDialogVisible(true);
	};

	const handleDialogHide = () => {
		setDialogVisible(false);
	};

	const header = (
		<div className="flex flex-wrap gap-2 align-items-center justify-content-between">
			<InputText
				type="search"
				onInput={(e) => setGlobalFilter(e.target.value)}
				placeholder="Search..."
			/>
			<Button
				label="New"
				icon="pi pi-plus"
				severity="success"
				rounded
				onClick={handleCreate}
			/>
		</div>
	);

	const footer = (
		<Paginator
			template="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
			// rowsPerPageOptions={[5, 10, 25]}
			totalRecords={totalItems}
			rows={pageSize}
			onPageChange={(e) => setCurrentPage(e.page + 1)}
		/>
	);

	return (
		<div>
			<div className="card">
				<DataTable
					scrollable
					scrollHeight="450px"
					value={items}
					dataKey="id"
					header={header}
					first={currentPage * pageSize - pageSize}
					rows={pageSize}
					totalRecords={totalItems}
					onPage={(e) => setCurrentPage(e.page + 1)}
					footer={footer}
				>
					{columns.map((col, index) => (
						<Column
							key={index}
							field={col.field}
							header={col.header}
							body={loading ? () => skeletonBodyTemplate : col.body}
						/>
					))}
				</DataTable>
			</div>
			{CreateDialog && (
				<CreateDialog
					fields={fields}
					visible={dialogVisible}
					onHide={handleDialogHide}
					onSubmit={onCreate}
				/>
			)}
		</div>
	);
};

export default DataTableComponent;
