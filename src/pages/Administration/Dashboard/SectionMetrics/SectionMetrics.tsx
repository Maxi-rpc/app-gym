import { useState, useEffect } from "react";

import CardIconMetric from "../Cards/CardIconMetric";

import { Payments, Attendance } from "../../../../service/types/Dashboard";

type Props = {
	data: Payments | null;
	dataAttendance: Attendance | null;
};

export default function SectionMetrics({ data, dataAttendance }: Props) {
	const [month, setMonth] = useState({
		count: 0,
		percent: 0,
		arrow: "",
		icon: "dolar",
	});

	const [attendance, setAttendance] = useState({
		count: 0,
		percent: 0,
		arrow: "",
		icon: "user",
	});

	useEffect(() => {
		if (data) {
			setMonth((prev) => ({
				...prev,
				count: data?.month,
			}));
		}

		if (dataAttendance) {
			setAttendance((prev) => ({
				...prev,
				count: dataAttendance?.month,
			}));
		}
	}, [data, dataAttendance]);

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
			{/* <!-- Metric Item Start --> */}
			<CardIconMetric
				title="Ingresos del mes"
				total={month?.count}
				icon="dolar"
			/>
			{/* <!-- Metric Item End --> */}

			{/* <!-- Metric Item Start --> */}
			<CardIconMetric
				title="Ingresos del mes"
				total={attendance?.count}
				icon="user"
			/>
			{/* <!-- Metric Item End --> */}
		</div>
	);
}
