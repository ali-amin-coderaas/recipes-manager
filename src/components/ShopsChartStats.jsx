import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import React, { useEffect, useState } from "react";
import ApiService from "../api/ApiService"; // Adjust import based on your folder structure
import BarChart from "./charts/BarChart";

export default function ShopChartStats({ ...rest }) {
	const [shopStats, setShopStats] = useState({});
	const [loading, setLoading] = useState(true);

	const fetchStats = async () => {
		setLoading(true);
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

	useEffect(() => {
		fetchStats();
	}, []);

	const chartOptions = {
		maintainAspectRatio: false,
		aspectRatio: 0.8,
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		responsive: true,
		plugins: {
			legend: {
				display: false,
				position: "right",
			},
			tooltip: {
				callbacks: {
					label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
				},
			},
		},
	};

	return !loading ? (
		<div {...rest} className="surface-50 border-round shadow-2 p-3 w-full ">
			<div className="flex justify-content-between align-items-center">
				<h2 className="m-0">Shop Stats</h2>
				<Button
					icon="pi pi-refresh"
					rounded
					className="surface-500 border-none"
					size="small"
					onClick={fetchStats}
					tooltip="Refresh"
					tooltipOptions={{
						position: "bottom",
						showOnDisabled: true,
						showDelay: 300,
					}}
				/>
			</div>
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
	) : (
		<Skeleton width="100%" height="20rem"></Skeleton>
	);
}
