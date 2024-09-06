import React from "react";
import { Link } from "react-router-dom";
import { formatTimeStamp } from "../utils/FormatTimeStamp";
import DataTableComponent from "./DataTableComponent";
import DialogComponent from "./DialogComponent";

const ShopsTable = ({ accountId, ...rest }) => {
	let endpoint = `accounts/${accountId}/shops`;
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
				<Link to={`/${endpoint}/${rowData.shopId}/`} className="text-primary">
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
		{
			name: "industry",
			label: "Industry",
			type: "dropdown",
			options: [
				"Food",
				"Retail",
				"Clothing",
				"Entertainment",
				"Health",
				"Technology",
				"Other",
			],
		},
	];

	return (
		<div {...rest}>
			<DataTableComponent
				endpoint={endpoint}
				columns={columns}
				createDialog={DialogComponent}
				fields={createFields}
			/>
		</div>
	);
};

export default ShopsTable;
