import React from "react";
import AccountChartStats from "../components/AccountChartStats";
import ShopChartStats from "../components/ShopsChartStats";

export default function DashboardView() {
	return (
		<div className="flex gap-4 justify-content-between flex-wrap md:flex-nowrap">
			<AccountChartStats />
			<ShopChartStats />
		</div>
	);
}
