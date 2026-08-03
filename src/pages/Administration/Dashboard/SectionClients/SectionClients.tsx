import { useState, useEffect } from "react";

import ClientCard from "../Cards/ClientCard";
import ClientNewCard from "../Cards/ClientNewCard";
import ClientActiveCard from "../Cards/ClientActiveCard";
import ClientInactiveCard from "../Cards/ClientInactiveCard";

import { Clients } from "../../../../service/types/Dashboard";

type Props = {
	data: Clients | null;
};

export default function SectionClients({ data }: Props) {
	const [client, setClient] = useState<Clients>();

	useEffect(() => {
		if (data) {
			setClient(data);
		}
	}, [data]);

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
			<ClientCard data={client || null} />
			<ClientNewCard data={client || null} />
			<ClientActiveCard data={client || null} />
			<ClientInactiveCard data={client || null} />
		</div>
	);
}
