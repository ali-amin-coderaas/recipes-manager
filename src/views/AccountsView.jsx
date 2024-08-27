import React from "react";
import MallAccounts from "../components/MallAccounts";

const AccountsView = () => {
	return (
		<div className="mx-4 md:mx-8">
			<h1>Available Accounts</h1>

			<MallAccounts />
		</div>
	);
};

export default AccountsView;
