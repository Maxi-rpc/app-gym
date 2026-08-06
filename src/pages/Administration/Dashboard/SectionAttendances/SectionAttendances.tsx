import { useState, useEffect } from "react";

import MetricCard from "./Cards/MetricCard";

import { Attendance } from "../../../../service/types/Dashboard";

type Props = {
	data: Attendance | null;
};

export default function SectionAttendances({ data }: Props) {
	const [metric, setMetric] = useState<Attendance>();

	useEffect(() => {
		if (data) {
			setMetric(data);
		}
	}, [data]);

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
			<div className="col-span-4">
				<h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
					Asistencias
				</h3>
			</div>
			<MetricCard title="Hoy" total={metric?.today || 0} />
			<MetricCard title="Semana" total={metric?.week || 0} />
			<MetricCard title="Mes" total={metric?.month || 0} />
			<MetricCard title="Año" total={metric?.month || 0} />
		</div>
	);
}
