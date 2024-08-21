import React from "react";
import MallAccounts from "../components/MallAccounts";

const DashboardView = () => {
	return (
		<div className="w-10 mx-8">
			<h1>Available Accounts</h1>

			<MallAccounts />
		</div>
	);
};

export default DashboardView;
