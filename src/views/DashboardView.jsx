import React from "react";
import AccountAndShopsStats from "../components/AccountAndShopsStats";
import AccountChartStats from "../components/AccountChartStats";
import ShopChartStats from "../components/ShopsChartStats";

export default function DashboardView() {
	return (
		<div className="grid gap-4 w-full justify-content-evenly place-items-center">
			<AccountChartStats className="col-12 md:col surface-50 border-round shadow-2 p-3 " />
			<ShopChartStats className="col-12 md:col" />
		</div>
	);
}
