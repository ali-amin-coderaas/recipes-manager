import { useEffect, useState } from "react";
import ApiService from "../api/ApiService";
import StackedBarChart from "./charts/StackedBarChart";
const AccountAndShopsStats = ({ ...rest }) => {
	const [combinedChartData, setCombinedChartData] = useState({});
	const [combinedChartOptions, setCombinedChartOptions] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch account data
				const accountService = new ApiService("stats/accounts/type");
				const accountResponse = await accountService.getAll();
				const accountCounts = accountResponse.data.items.reduce((acc, item) => {
					acc[item.accountType] = item.count;
					return acc;
				}, {});

				// Fetch shop data
				const shopService = new ApiService("stats/shops/industry");
				const shopResponse = await shopService.getAll();
				const shopCounts = shopResponse.data.items.reduce((acc, item) => {
					acc[item.industry] = item.count;
					return acc;
				}, {});

				// Combine data
				const labels = [
					...new Set([
						...Object.keys(accountCounts),
						...Object.keys(shopCounts),
					]),
				];
				const data = {
					labels: labels,
					datasets: [
						{
							label: "Accounts",
							data: labels.map((label) => accountCounts[label] || 0),
							backgroundColor: "#36A2EB",
						},
						{
							label: "Shops",
							data: labels.map((label) => shopCounts[label] || 0),
							backgroundColor: "#FF6384",
						},
					],
				};

				setCombinedChartData(data);
				setCombinedChartOptions({
					responsive: true,
					plugins: {
						legend: {
							position: "top",
						},
						tooltip: {
							callbacks: {
								label: (tooltipItem) => {
									const label = tooltipItem.dataset.label || "";
									const value = tooltipItem.raw || 0;
									return `${label}: ${value}`;
								},
							},
						},
					},
					scales: {
						x: {
							stacked: true,
						},
						y: {
							stacked: true,
						},
					},
				});
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);
	return (
		<div {...rest}>
			<StackedBarChart
				data={combinedChartData}
				options={combinedChartOptions}
			/>
		</div>
	);
};

export default AccountAndShopsStats;
