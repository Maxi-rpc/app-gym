import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { ProductRevenueMonth } from "../../../../../service/types/Dashboard";

type Props = {
	data: ProductRevenueMonth[] | null;
};

const months = [
	"Ene",
	"Feb",
	"Mar",
	"Abr",
	"May",
	"Jun",
	"Jul",
	"Ago",
	"Sep",
	"Oct",
	"Nov",
	"Dic",
];

const currencyFormatter = new Intl.NumberFormat("es-AR", {
	style: "currency",
	currency: "ARS",
	maximumFractionDigits: 0,
});

export default function BarChart({ data }: Props) {
	const revenueByMonth = data ?? [];
	const series = [
		{
			name: "Facturación",
			data: months.map(
				(_, index) =>
					revenueByMonth.find((item) => item.month === index + 1)
						?.total_revenue ?? 0,
			),
		},
	];

	const options: ApexOptions = {
		legend: { show: false },
		colors: ["#465FFF"],
		chart: {
			fontFamily: "Outfit, sans-serif",
			height: 320,
			type: "bar",
			toolbar: { show: false },
		},
		plotOptions: {
			bar: {
				horizontal: false,
				borderRadius: 4,
				columnWidth: "55%",
			},
		},
		grid: {
			xaxis: { lines: { show: false } },
			yaxis: { lines: { show: true } },
		},
		dataLabels: { enabled: false },
		tooltip: {
			enabled: true,
			y: { formatter: (value) => currencyFormatter.format(value) },
		},
		xaxis: {
			categories: months,
			axisBorder: { show: false },
			axisTicks: { show: false },
		},
		yaxis: {
			labels: {
				formatter: (value) => currencyFormatter.format(value),
				style: { fontSize: "12px", colors: ["#6B7280"] },
			},
		},
	};

	if (revenueByMonth.length === 0) {
		return (
			<p className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
				No hay datos de facturación para mostrar.
			</p>
		);
	}

	return <Chart options={options} series={series} type="bar" height={320} />;
}
