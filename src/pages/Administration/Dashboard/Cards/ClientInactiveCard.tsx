import { useState, useEffect } from "react";

import Badge from "../../../../components/ui/badge/Badge";
import AnimateCount from "../common/AnimateCount";

import { Clients } from "../../../../service/types/Dashboard";

type Props = {
	data: Clients | null;
};

export default function ClientActiveCard({ data }: Props) {
	const [client, setClient] = useState<Clients>();

	useEffect(() => {
		if (data) {
			setClient(data);
		}
	}, [data]);

	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
			<p className="text-gray-500 text-theme-sm dark:text-gray-400">Inactivo</p>
			<div className="flex items-end justify-between mt-3">
				<div>
					<h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
						<AnimateCount target={client?.inactive || 0} />
					</h4>
				</div>
				<div className="flex items-center gap-1">
					<Badge
						color={client?.inactive || 0 > 0 ? "warning" : "info"}
						size="sm"
					>
						{client?.inactive || 0}
					</Badge>
					<span className="text-gray-500 text-theme-xs dark:text-gray-400">
						Este Mes
					</span>
				</div>
			</div>
		</div>
	);
}
