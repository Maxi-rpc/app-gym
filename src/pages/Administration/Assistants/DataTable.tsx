import { useState } from "react";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { Trash3Outlined, Pencil1Outlined } from "@lineiconshq/free-icons";

import { ClientAssistant } from "./types/ClientAssistant";

type SortConfig = {
	key: keyof ClientAssistant;
	direction: "asc" | "desc";
};

type Props = {
	listData: ClientAssistant[] | [];
	searchText: string;
	onEdit?: (client: ClientAssistant) => void;
	onDelet?: (client: ClientAssistant) => void;
};

export default function DataTable({
	listData,
	searchText,
	onEdit,
	onDelet,
}: Props) {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: "id",
		direction: "asc",
	});

	const handleEdit = (client: ClientAssistant) => {
		onEdit?.(client);
	};

	const handleDelete = (client: ClientAssistant) => {
		onDelet?.(client);
	};

	const sortedData = [...listData].sort((a, b) => {
		const aValue = a[sortConfig.key];
		const bValue = b[sortConfig.key];

		if (typeof aValue === "string") {
			return sortConfig.direction === "asc"
				? aValue.localeCompare(bValue as string)
				: (bValue as string).localeCompare(aValue);
		}

		if (typeof aValue === "number") {
			return sortConfig.direction === "asc"
				? (aValue as number) - (bValue as number)
				: (bValue as number) - (aValue as number);
		}

		return 0;
	});

	const filterData = (listData: ClientAssistant[]) => {
		if (!searchText.trim()) {
			return listData;
		}

		const searchLower = searchText.toLowerCase();

		return listData.filter((client) => {
			const nameMatch = client.name.toLowerCase().includes(searchLower);
			const lastnameMatch = client.lastname.toLowerCase().includes(searchLower);

			return nameMatch || lastnameMatch;
		});
	};

	const handleSort = (key: keyof ClientAssistant) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
		}));
	};

	const SortIcon = ({ column }: { column: keyof ClientAssistant }) => {
		if (sortConfig.key !== column) {
			return <span className="text-gray-400">↕</span>;
		}
		return sortConfig.direction === "asc" ? (
			<span className="text-blue-500">↑</span>
		) : (
			<span className="text-blue-500">↓</span>
		);
	};

	return (
		<div className="overflow-x-auto">
			<table className="w-full table-auto">
				<thead>
					<tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("id")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								ID <SortIcon column="id" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("name")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Nombre <SortIcon column="name" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("lastname")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Apellido <SortIcon column="lastname" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("status")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Estado <SortIcon column="status" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("nextPaid")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Próximo Pago <SortIcon column="nextPaid" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<span className="font-semibold text-gray-700 dark:text-gray-300">
								Acciones
							</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{filterData(sortedData).map((client, index) => (
						<tr
							key={client.id}
							className={`border-b border-gray-200 dark:border-gray-700 ${
								index % 2 === 0
									? "bg-white dark:bg-white/2"
									: "bg-gray-50 dark:bg-white/5"
							} hover:bg-gray-100 dark:hover:bg-white/8 transition-colors`}
						>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client.id}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client.name}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client.lastname}
							</td>
							<td className="px-4 py-3 text-sm">
								<span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold dark:bg-green-900/30 dark:text-green-400">
									{client.status}
								</span>
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client.nextPaid}
							</td>
							<td className="px-4 py-3 text-sm">
								<div className="flex gap-2">
									<button
										onClick={() => handleEdit(client)}
										className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
										title="Editar"
									>
										<Lineicons icon={Pencil1Outlined} size={20} color="blue" />
									</button>

									<button
										onClick={() => handleDelete(client)}
										className="text-red-500 hover:text-red-700 dark:hover:text-red-300 transition-colors"
										title="Eliminar"
									>
										<Lineicons icon={Trash3Outlined} size={20} color="red" />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
