import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { ProductRanking } from "../../../../../service/types/Dashboard";

type Props = {
	data: ProductRanking[] | null;
};

export default function BarChart({ data }: Props) {
	const products = data ?? [];
	const chartHeight = Math.max(220, products.length * 52);
	const series = [
		{
			name: "Cantidad vendida",
			data: products.map((product) => product.quantity_sold),
		},
	];

	const options: ApexOptions = {
		legend: {
			show: false,
		},
		colors: ["#465FFF"],
		chart: {
			fontFamily: "Outfit, sans-serif",
			height: chartHeight,
			type: "bar",
			toolbar: {
				show: false,
			},
		},
		plotOptions: {
			bar: {
				horizontal: true,
				borderRadius: 4,
				barHeight: "55%",
			},
		},
		grid: {
			xaxis: {
				lines: {
					show: true,
				},
			},
			yaxis: {
				lines: {
					show: false,
				},
			},
		},
		dataLabels: {
			enabled: false,
			formatter: (value) => `${value} unidades`,
			style: {
				fontSize: "12px",
				fontWeight: 600,
				// colors: ["#374151"],
			},
		},
		tooltip: {
			enabled: true,
			y: {
				formatter: (value) => `${value} unidades vendidas`,
			},
		},
		xaxis: {
			categories: products.map((product) => product.product_name),
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
		},
		yaxis: {
			labels: {
				style: {
					fontSize: "12px", // Adjust font size for y-axis labels
					colors: ["#6B7280"], // Color of the labels
				},
			},
		},
	};

	if (products.length === 0) {
		return (
			<p className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
				No hay productos vendidos para mostrar.
			</p>
		);
	}

	return (
		<Chart options={options} series={series} type="bar" height={chartHeight} />
	);
}
