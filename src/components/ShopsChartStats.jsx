import React, { useEffect, useState } from "react";
import ApiService from "../api/ApiService"; // Adjust import based on your folder structure
import BarChart from "./charts/BarChart";

export default function ShopChartStats({ ...rest }) {
	const [shopStats, setShopStats] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const apiService = new ApiService("stats");
				const shopStatsData = await apiService.getShopStats();

				const shopData = shopStatsData.data.items.reduce(
					(acc, { industry, count }) => {
						acc[industry] = count;
						return acc;
					},
					{}
				);

				setShopStats(shopData);
			} catch (error) {
				console.error("Error fetching stats:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchStats();
	}, []);

	const chartOptions = {
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "right",
			},
			tooltip: {
				callbacks: {
					label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
				},
			},
		},
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div {...rest}>
			<h3>Shop Stats</h3>
			<BarChart
				data={{
					labels: Object.keys(shopStats),
					datasets: [
						{
							data: Object.values(shopStats),
							backgroundColor: "#36A2EB",
						},
					],
				}}
				options={chartOptions}
			/>
		</div>
	);
}
