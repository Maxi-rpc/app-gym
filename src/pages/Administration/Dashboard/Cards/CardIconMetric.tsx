import { useEffect } from "react";

import Badge from "../../../../components/ui/badge/Badge";

import { Lineicons } from "@lineiconshq/react-lineicons";
import {
	ArrowDownwardOutlined,
	ArrowUpwardOutlined,
	DollarCircleOutlined,
	UserMultiple4Outlined,
} from "@lineiconshq/free-icons";

import AnimateCount from "../common/AnimateCount";

type Props = {
	title?: string;
	total?: number;
	percent?: number;
	arrow?: string;
	icon?: string;
};

export default function CardIconMetric({
	title,
	total,
	percent,
	arrow,
	icon,
}: Props) {
	useEffect(() => {
		if (!total) {
			return;
		}
	}, [total]);

	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
			<div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
				<Lineicons
					icon={icon == "dolar" ? DollarCircleOutlined : UserMultiple4Outlined}
					size={20}
					className="text-gray-800 size-6 dark:text-white/90"
				/>
			</div>

			<div className="flex items-end justify-between mt-5">
				<div>
					<span className="text-sm text-gray-500 dark:text-gray-400">
						{title ? title : "DEMO"}
					</span>
					<h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
						<AnimateCount target={total ? total : 0} />
					</h4>
				</div>

				{percent && (
					<Badge color={arrow == "up" ? "success" : "error"}>
						<Lineicons
							icon={arrow == "up" ? ArrowUpwardOutlined : ArrowDownwardOutlined}
							size={15}
						/>
						{percent > 0 ? "+" : ""} {percent}%
					</Badge>
				)}
			</div>
		</div>
	);
}
