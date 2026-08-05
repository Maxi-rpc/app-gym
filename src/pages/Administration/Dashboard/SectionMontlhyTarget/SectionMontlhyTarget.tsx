import { useState, useEffect } from "react";

import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { Charts } from "../../../../service/types/Dashboard";

type Props = {
	data: Charts | null;
};

export default function SectionMontlhyTarget({ data }: Props) {
	const [listValues, setListValues] = useState([
		{
			name: "Ventas",
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		},
	]);

	const options: ApexOptions = {
		colors: ["#465fff"],
		chart: {
			fontFamily: "Outfit, sans-serif",
			type: "bar",
			height: 180,
			toolbar: {
				show: false,
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: "39%",
				borderRadius: 5,
				borderRadiusApplication: "end",
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			show: true,
			width: 4,
			colors: ["transparent"],
		},
		xaxis: {
			categories: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			],
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
		},
		legend: {
			show: true,
			position: "top",
			horizontalAlign: "left",
			fontFamily: "Outfit",
		},
		yaxis: {
			title: {
				text: undefined,
			},
		},
		grid: {
			yaxis: {
				lines: {
					show: true,
				},
			},
		},
		fill: {
			opacity: 1,
		},

		tooltip: {
			x: {
				show: false,
			},
			y: {
				formatter: (val: number) => `${val}`,
			},
		},
	};

	useEffect(() => {
		if (data) {
			const values = data?.payments_by_month.map((item) => item.amount);
			const newSeries = [
				{
					name: "Ventas",
					data: values,
				},
			];
			setListValues(newSeries);
		}
	}, [data]);

	return (
		<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/3 sm:px-6 sm:pt-6">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
					Membresías Mensuales
				</h3>
			</div>

			<div className="max-w-full overflow-x-auto custom-scrollbar">
				<div className="-ml-5 min-w-162.5 xl:min-w-full pl-2">
					<Chart
						options={options}
						series={listValues}
						type="bar"
						height={180}
					/>
				</div>
			</div>
		</div>
	);
}
