import { useState, useEffect } from "react";

import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { Charts } from "../../../../../service/types/Dashboard";

type Props = {
	data: Charts | null;
};

export default function BarChart({ data }: Props) {
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
				"0",
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12",
				"13",
				"14",
				"15",
				"16",
				"17",
				"18",
				"19",
				"20",
				"21",
				"22",
				"23",
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
			const values = data?.attendance_by_hour.map((item) => item.count);
			const newSeries = [
				{
					name: "Asistencias",
					data: values,
				},
			];
			setListValues(newSeries);
		}
	}, [data]);

	return (
		<Chart options={options} series={listValues} type="bar" height={180} />
	);
}
