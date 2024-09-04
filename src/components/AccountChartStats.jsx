import React, { useEffect, useState } from "react";
import ApiService from "../api/ApiService"; // Adjust import based on your folder structure
import PieChart from "./charts/PieChart";

export default function AccountChartStats({ ...rest }) {
	const [accountStats, setAccountStats] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const apiService = new ApiService("stats");
				const accountStatsData = await apiService.getAccountStats();

				const accountData = accountStatsData.data.items.reduce(
					(acc, { accountType, count }) => {
						acc[accountType] = count;
						return acc;
					},
					{}
				);

				setAccountStats(accountData);
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
		<div {...rest} className="surface-50 border-round shadow-2 p-3 w-full">
			<h3>Account Stats</h3>
			<PieChart
				data={{
					labels: Object.keys(accountStats),
					datasets: [
						{
							data: Object.values(accountStats),
							backgroundColor: ["#F97316", "#3B82F6", "#22C55E"],
						},
					],
				}}
				options={chartOptions}
			/>
		</div>
	);
}
