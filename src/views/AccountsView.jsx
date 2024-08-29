import React from "react";
// import AccountsList from "../components/AccountsList";
import AccountsTable from "../components/AccountsTable";

const AccountsView = () => {
	return (
		<div className="mx-4 md:mx-8">
			<h1>Available Accounts</h1>
			<AccountsTable />
		</div>
	);
};

export default AccountsView;
