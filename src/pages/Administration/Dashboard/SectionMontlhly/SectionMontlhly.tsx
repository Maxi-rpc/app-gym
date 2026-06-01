import { useState, useEffect } from "react";

import { Lineicons } from "@lineiconshq/react-lineicons";
import {
	ArrowDownwardOutlined,
	ArrowUpwardOutlined,
} from "@lineiconshq/free-icons";

import GraphObjetive from "./GraphObjetive";

export default function SectionMontlhly() {
	const [data, setData] = useState({
		targetMonthly: 0,
		targetNow: 0,
		targetToday: 0,
		diferenceToday: 0,
		percent: 0,
		percentDif: 0,
	});

	const [graphConfig, setGraphConfig] = useState({
		series: [0],
	});

	const getData = () => {
		const targetObjetive = 200;
		const target = 60;
		const targetToday = 10;
		const targetBefore = 30;
		const diferenceToday = target - targetBefore;
		const percentGraph = (target / targetObjetive) * 100;
		const percentNow = ((target - targetBefore) / targetBefore) * 100;

		setData({
			...data,
			targetMonthly: targetObjetive,
			targetNow: target,
			targetToday: targetToday,
			diferenceToday: diferenceToday,
			percent: percentGraph,
			percentDif: percentNow,
		});

		setGraphConfig({
			...graphConfig,
			series: [percentGraph],
		});
	};

	useEffect(() => {
		getData();
	}, []);

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
					<GraphObjetive series={graphConfig?.series} />

					<span className="absolute left-1/2 top-full -translate-x-1/2 translate-y-[-95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
						{data?.percentDif}%
					</span>
				</div>
				<p className="mx-auto mt-10 w-full max-w-95 text-center text-sm text-gray-500 sm:text-base">
					Hoy ganaste ${data?.diferenceToday}, más que el mes pasado. ¡Sigue
					así! ¡Buen trabajo!
				</p>
			</div>

			<div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
				<div>
					<p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
						Objetivo
					</p>
					<p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
						${data?.targetMonthly}
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
						${data?.targetNow}
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
						${data?.targetToday}
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
