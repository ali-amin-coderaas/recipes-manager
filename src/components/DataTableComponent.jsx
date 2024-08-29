import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { Skeleton } from "primereact/skeleton";
import React, { useState } from "react";
import useApi from "../hooks/useApi";

const DataTableComponent = ({
	columns,
	createDialog: CreateDialog,
	fields,
	endpoint,
}) => {
	const {
		data: items,
		isLoading,
		currentPage,
		totalItems,
		pageSize,
		setCurrentPage,
		setPageSize,
		createItem,
	} = useApi(endpoint);

	const skeletonBodyTemplate = <Skeleton width="100%" />;

	const [dialogVisible, setDialogVisible] = useState(false);

	const handleCreate = () => {
		setDialogVisible(true);
	};

	const handleDialogHide = () => {
		setDialogVisible(false);
	};
	const handleCreateDialogSubmit = (formData) => {
		const dataToSubmit = fields.reduce((acc, field) => {
			acc[field.name] = formData[field.name] || "";
			return acc;
		}, {});

		createItem(dataToSubmit);
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
			template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
			first={(currentPage - 1) * pageSize}
			totalRecords={totalItems}
			rows={pageSize}
			onPageChange={(e) => {
				setCurrentPage(e.page + 1);
				setPageSize(e.rows);
			}}
			rowsPerPageOptions={[5, 10, 25]}
			change
		/>
	);

	return (
		<div>
			<div className="card">
				<DataTable
					scrollable
					scrollHeight="550px"
					value={items}
					first={(currentPage - 1) * pageSize}
					dataKey="id"
					header={header}
					footer={footer}
				>
					{columns.map((col, index) => (
						<Column
							key={index}
							field={col.field}
							header={col.header}
							body={isLoading ? () => skeletonBodyTemplate : col.body}
						/>
					))}
				</DataTable>
			</div>
			{CreateDialog && (
				<CreateDialog
					fields={fields}
					visible={dialogVisible}
					onHide={handleDialogHide}
					onSubmit={handleCreateDialogSubmit}
				/>
			)}
		</div>
	);
};

export default DataTableComponent;
