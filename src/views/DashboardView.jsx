import React from "react";
import { Link } from "react-router-dom";
import MallAccounts from "../components/MallAccounts";

const DashboardView = () => {
	return (
		<div>
			<h1>Dashboard</h1>
			<Link to={"/accounts"}>
				<a href="">accounts</a>
			</Link>
		</div>
	);
};

export default DashboardView;
