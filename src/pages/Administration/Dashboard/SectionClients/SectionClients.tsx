import { useState, useEffect } from "react";

import CardMetric from "../Cards/CardMetric";

import { Clients } from "../../../../service/types/Dashboard";

type Props = {
	data: Clients | null;
};

export default function SectionClients({ data }: Props) {
	const [total, setTotal] = useState({
		count: 0,
		percent: 0,
		arrow: "",
	});

	const [active, setActive] = useState({
		count: 0,
		percent: 0,
		arrow: "",
	});

	const [thisMonth, setThisMonth] = useState({
		count: 0,
		percent: 0,
		arrow: "",
	});

	const [expired, setExpired] = useState({
		count: 0,
		percent: 0,
		arrow: "",
	});

	useEffect(() => {
		if (data) {
			setTotal((prev) => ({
				...prev,
				count: data?.total,
				percent: (data?.new_this_month * 100) / data?.total,
			}));

			setActive((prev) => ({
				...prev,
				count: data?.active,
				percent: (data?.active * 100) / data?.total,
			}));

			setThisMonth((prev) => ({
				...prev,
				count: data?.new_this_month,
				percent: (data?.new_this_month * 100) / data?.total,
			}));

			setExpired((prev) => ({
				...prev,
				count: data?.expired,
				percent: (data?.expired * 100) / data?.total,
			}));
		}
	}, [data]);

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
			<CardMetric
				title={"Total de Clientes"}
				total={total?.count}
				percent={total?.percent}
			/>
			<CardMetric
				title={"Clientes activos"}
				total={active?.count}
				percent={active?.percent}
			/>
			<CardMetric
				title={"Nuevos clientes del mes"}
				total={thisMonth?.count}
				percent={thisMonth?.percent}
			/>

			<CardMetric
				title={"Membresías vencidas"}
				total={expired?.count}
				percent={expired?.percent}
			/>
		</div>
	);
}
