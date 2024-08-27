import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import Pagination from "./Pagination";

const DataTableComponent = ({
	data,
	columns,
	isLoading,
	onCreate,
	setGlobalFilter,
	selection,
	onSelectionChange,
	currentPage,
	totalItems,
	pageSize,
	onPageChange,
	...rest
}) => {
	const dt = useRef(null);
	const toast = useRef(null);

	const skeletonBodyTemplate = <Skeleton width="100%" />;

	const header = (
		<div className="flex flex-wrap gap-2 align-items-center justify-content-between">
			<IconField iconPosition="left">
				<InputIcon className="pi pi-search" />
				<InputText
					type="search"
					onInput={(e) => setGlobalFilter(e.target.value)}
					placeholder="Search..."
				/>
			</IconField>
			<Button
				label="New"
				icon="pi pi-plus"
				severity="success"
				rounded
				onClick={onCreate}
			/>
		</div>
	);

	return (
		<div>
			<Toast ref={toast} />
			<div className="card">
				<DataTable
					scrollable
					scrollHeight="450px"
					ref={dt}
					value={isLoading ? [null] : data}
					selection={selection}
					onSelectionChange={(e) => onSelectionChange(e.value)}
					dataKey="id"
					header={header}
					{...rest}
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
		</div>
	);
};

export default DataTableComponent;
