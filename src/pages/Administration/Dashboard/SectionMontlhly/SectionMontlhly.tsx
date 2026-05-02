import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";

import { Lineicons } from "@lineiconshq/react-lineicons";
import {
	ArrowDownwardOutlined,
	ArrowUpwardOutlined,
} from "@lineiconshq/free-icons";

export default function SectionMontlhly() {
	const series = [75.55];
	const options: ApexOptions = {
		colors: ["#465FFF"],
		chart: {
			fontFamily: "Outfit, sans-serif",
			type: "radialBar",
			height: 330,
			sparkline: {
				enabled: true,
			},
		},
		plotOptions: {
			radialBar: {
				startAngle: -85,
				endAngle: 85,
				hollow: {
					size: "80%",
				},
				track: {
					background: "#E4E7EC",
					strokeWidth: "100%",
					margin: 5, // margin is in pixels
				},
				dataLabels: {
					name: {
						show: false,
					},
					value: {
						fontSize: "36px",
						fontWeight: "600",
						offsetY: -40,
						color: "#1D2939",
						formatter: function (val) {
							return val + "%";
						},
					},
				},
			},
		},
		fill: {
			type: "solid",
			colors: ["#465FFF"],
		},
		stroke: {
			lineCap: "round",
		},
		labels: ["Progress"],
	};

	return (
		<div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/3">
			<div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
				<div className="flex justify-between">
					<div>
						<h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
							Objetivo Mensual
						</h3>
						<p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
							Objetivo que te has fijado para cada mes
						</p>
					</div>
				</div>
				<div className="relative ">
					<div className="max-h-82.5" id="chartDarkStyle">
						<Chart
							options={options}
							series={series}
							type="radialBar"
							height={330}
						/>
					</div>

					<span className="absolute left-1/2 top-full -translate-x-1/2 translate-y-[-95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
						+10%
					</span>
				</div>
				<p className="mx-auto mt-10 w-full max-w-95 text-center text-sm text-gray-500 sm:text-base">
					Hoy ganaste $3287, más que el mes pasado. ¡Sigue así! ¡Buen trabajo!
				</p>
			</div>

			<div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
				<div>
					<p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
						Objetivo
					</p>
					<p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
						$20K
						<Lineicons
							icon={ArrowDownwardOutlined}
							className=" text-error-600 dark:text-error-500 size-4"
						/>
					</p>
				</div>

				<div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

				<div>
					<p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
						Ganancia
					</p>
					<p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
						$20K
						<Lineicons
							icon={ArrowUpwardOutlined}
							className=" text-green-600 dark:text-green-500 size-4"
						/>
					</p>
				</div>

				<div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

				<div>
					<p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
						Hoy
					</p>
					<p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
						$20K
						<Lineicons
							icon={ArrowUpwardOutlined}
							className=" text-green-600 dark:text-green-500 size-4"
						/>
					</p>
				</div>
			</div>
		</div>
	);
}
