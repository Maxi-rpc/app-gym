// import { useState, useEffect } from "react";

import BartChart from "./charts/BarChart";

import { Charts } from "../../../../service/types/Dashboard";

type Props = {
	data: Charts | null;
};

export default function BarChart({ data }: Props) {
	// const [listValues, setListValues] = useState([
	// 	{
	// 		name: "Ventas",
	// 		data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	},
	// ]);

	// useEffect(() => {
	// 	if (data) {
	// 		const values = data?.attendance_by_hour.map((item) => item.count);
	// 		const newSeries = [
	// 			{
	// 				name: "Ventas",
	// 				data: values,
	// 			},
	// 		];
	// 	}
	// }, [data]);

	return (
		<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/3 sm:px-6 sm:pt-6">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
					Asistencias por Hora
				</h3>
			</div>

			<div className="max-w-full overflow-x-auto custom-scrollbar">
				<div className="-ml-5 min-w-162.5 xl:min-w-full pl-2">
					<BartChart data={data} />
				</div>
			</div>
		</div>
	);
}
