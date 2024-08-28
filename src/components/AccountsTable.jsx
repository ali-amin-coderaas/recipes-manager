import React from "react";
import { Link } from "react-router-dom";
import useAccounts from "../hooks/useAccounts";
import { formatTimeStamp } from "../utils/FormatTimeStamp";
import CreateDialog from "./CreateDialog";
import DataTableComponent from "./DataTableComponent";
const AccountsTable = () => {
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
				<Link to={`/accounts/${rowData.id}`} className="text-primary">
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
	];

	const createFields = [{ name: "name", label: "Name", type: "text" }];

	const createAccount = () => {};

	return (
		<DataTableComponent
			endpoint={"accounts"}
			columns={columns}
			createDialog={CreateDialog}
			fields={createFields}
			onCreate={createAccount}
		/>
	);
};

export default AccountsTable;
