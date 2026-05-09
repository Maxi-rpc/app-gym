import { useState, useEffect } from "react";

import Badge from "../../../../components/ui/badge/Badge";

import { Lineicons } from "@lineiconshq/react-lineicons";
import {
	ArrowDownwardOutlined,
	ArrowUpwardOutlined,
	UserMultiple4Outlined,
	FileMultipleOutlined,
} from "@lineiconshq/free-icons";

import AnimateCount from "../common/AnimateCount";

export default function SectionMetrics() {
	const [clients, setClients] = useState({
		before: 0,
		now: 0,
		percent: 0,
		arrow: "up",
	});
	const [members, setMembers] = useState({
		before: 0,
		now: 0,
		percent: 0,
		arrow: "up",
	});

	const getData = () => {
		const clientsBefore = 100;
		const clientsNow = 130;
		const clientsPercent = ((clientsNow - clientsBefore) / clientsBefore) * 100;
		const clientsArrow = clientsNow > clientsBefore ? "up" : "down";

		setClients({
			before: clientsBefore,
			now: clientsNow,
			percent: clientsPercent,
			arrow: clientsArrow,
		});

		const membersBefore = 100;
		const membersNow = 20;
		const membersPercent = ((membersNow - membersBefore) / membersBefore) * 100;
		const membersArrow = membersNow > membersBefore ? "up" : "down";

		setMembers({
			before: membersBefore,
			now: membersNow,
			percent: membersPercent,
			arrow: membersArrow,
		});

	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
			{/* <!-- Metric Item Start --> */}
			<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
				<div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
					<Lineicons
						icon={UserMultiple4Outlined}
						size={20}
						className="text-gray-800 size-6 dark:text-white/90"
					/>
				</div>

				<div className="flex items-end justify-between mt-5">
					<div>
						<span className="text-sm text-gray-500 dark:text-gray-400">
							Clientes
						</span>
						<h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
							<AnimateCount target={clients?.now} />
						</h4>
					</div>
					<Badge color={clients.arrow == "up" ? "success" : "error"}>
						<Lineicons
							icon={
								clients.arrow == "up"
									? ArrowUpwardOutlined
									: ArrowDownwardOutlined
							}
							size={15}
						/>
						{clients?.percent}%
					</Badge>
				</div>
			</div>
			{/* <!-- Metric Item End --> */}

			{/* <!-- Metric Item Start --> */}
			<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
				<div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
					<Lineicons
						icon={FileMultipleOutlined}
						size={20}
						className="text-gray-800 size-6 dark:text-white/90"
					/>
				</div>
				<div className="flex items-end justify-between mt-5">
					<div>
						<span className="text-sm text-gray-500 dark:text-gray-400">
							Suscripciones
						</span>
						<h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
							<AnimateCount target={members?.now} />
						</h4>
					</div>

					<Badge color={members.arrow == "up" ? "success" : "error"}>
						<Lineicons
							icon={
								members.arrow == "up"
									? ArrowUpwardOutlined
									: ArrowDownwardOutlined
							}
							size={15}
						/>
						{members?.percent}%
					</Badge>
				</div>
			</div>
			{/* <!-- Metric Item End --> */}
		</div>
	);
}
