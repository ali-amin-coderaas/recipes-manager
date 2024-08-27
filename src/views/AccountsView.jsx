import React from "react";
import AccountsList from "../components/AccountsList";

const AccountsView = () => {
	return (
		<div className="mx-4 md:mx-8">
			<h1>Available Accounts</h1>

			<AccountsList />
		</div>
	);
};

export default AccountsView;
