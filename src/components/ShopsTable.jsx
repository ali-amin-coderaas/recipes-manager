import React from "react";
import { Link, useParams } from "react-router-dom";
import { formatTimeStamp } from "../utils/FormatTimeStamp";
import CreateDialog from "./CreateDialog";
import DataTableComponent from "./DataTableComponent";
const ShopsTable = ({ id, ...rest }) => {
	let endpoint = `accounts/${id}/shops`;
	const columns = [
		{
			field: "id",
			header: "ID",
			body: (rowData) => rowData.id,
		},
		{
			field: "name",
			header: "Name",
			body: (rowData) => (
				<Link to={`/${endpoint}/${rowData.id}`} className="text-primary">
					{rowData.name}
				</Link>
			),
		},
		{
			field: "businessName",
			header: "Business Name",
			body: (rowData) => rowData.businessName,
		},
		{
			field: "email",
			header: "Email",
			body: (rowData) => rowData.email,
		},
		{
			field: "createdAt",
			header: "Created On",
			body: (rowData) => formatTimeStamp(rowData.createdAt),
		},
		{
			field: "industry",
			header: "Industry",
			body: (rowData) => rowData.industry,
		},
	];

	const createFields = [
		{ name: "name", label: "Name", type: "text" },
		{ name: "businessName", label: "Business Name", type: "text" },
		{ name: "email", label: "Email", type: "email" },
	];

	return (
		<div {...rest}>
			<DataTableComponent
				endpoint={endpoint}
				columns={columns}
				createDialog={CreateDialog}
				fields={createFields}
			/>
		</div>
	);
};

export default ShopsTable;
