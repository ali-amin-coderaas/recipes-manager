import { Tag } from "primereact/tag";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatTimeStamp } from "../utils/FormatTimeStamp";
import CreateDialog from "./CreateDialog";
import DataTableComponent from "./DataTableComponent";
const AccountsTable = () => {
	const endpoint = "accounts";

	const accountTypes = [
		{ label: "Personal", value: "Personal", severity: "primary" },
		{ label: "Business", value: "Business", severity: "warning" },
		{ label: "Non-Profit", value: "Non-Profit", severity: "success" },
	];

	const getSeverity = (type) => {
		const accountType = accountTypes.find((item) => item.value === type);
		return accountType ? accountType.severity : null;
	};

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
			field: "shopCount",
			header: "# of Shops",
			body: (rowData) => rowData.shopCount,
		},
		{
			field: "createdAt",
			header: "Created On",
			body: (rowData) => formatTimeStamp(rowData.createdAt),
		},
		{
			field: "accountType",
			header: "Account Type",
			body: (rowData) => (
				<Tag
					value={rowData.accountType}
					severity={getSeverity(rowData.accountType)}
				/>
			),
		},
	];

	const createFields = [{ name: "name", label: "Name", type: "text" }];

	return (
		<DataTableComponent
			endpoint={endpoint}
			columns={columns}
			createDialog={CreateDialog}
			fields={createFields}
		/>
	);
};

export default AccountsTable;
