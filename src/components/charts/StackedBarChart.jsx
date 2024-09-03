import { Chart } from "primereact/chart";
import React from "react";

const StackedBarChart = ({ data, options }) => {
	return (
		<div className="card">
			<Chart type="bar" data={data} options={options} />
		</div>
	);
};

export default StackedBarChart;
