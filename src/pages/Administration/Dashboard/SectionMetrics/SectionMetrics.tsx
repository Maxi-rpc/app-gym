import { useState, useEffect } from "react";

import CardIconMetric from "../Cards/CardIconMetric";
import CardIconMoneyMetric from "../Cards/CardIconMoneyMetric";

import { Payments, Attendance } from "../../../../service/types/Dashboard";

type Props = {
	dataPayment: Payments | null;
	dataAttendance: Attendance | null;
};

export default function SectionMetrics({ dataPayment, dataAttendance }: Props) {
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
		if (dataPayment) {
			setMonth((prev) => ({
				...prev,
				count: dataPayment?.month,
			}));
		}

		if (dataAttendance) {
			setAttendance((prev) => ({
				...prev,
				count: dataAttendance?.month,
			}));
		}
	}, [dataPayment, dataAttendance]);

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
			<CardIconMoneyMetric
				title="Ingresos del mes"
				amount={month?.count}
				icon="dolar"
			/>

			<CardIconMetric
				title="Asistencias del mes"
				total={attendance?.count}
				icon="user"
			/>
		</div>
	);
}
