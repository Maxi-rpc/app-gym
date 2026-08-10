import { useEffect } from "react";

import Badge from "../../../../../components/ui/badge/Badge";
import AnimateCount from "../../common/AnimateCount";

type Props = {
	title?: string;
	total?: number;
};

export default function MetricCard({ title, total }: Props) {
	useEffect(() => {
		if (!total) {
			return;
		}
	}, [total]);

	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
			<p className="text-gray-500 text-theme-sm dark:text-gray-400">
				{title || ""}
			</p>
			<div className="flex items-end justify-between mt-3">
				<div>
					<h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
						<AnimateCount target={total || 0} />
					</h4>
				</div>
				<div className="flex items-center gap-1">
					<Badge color="success" size="sm">
						+ 1
					</Badge>
					<span className="text-gray-500 text-theme-xs dark:text-gray-400">
						Este Mes
					</span>
				</div>
			</div>
		</div>
	);
}
