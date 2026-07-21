import { useState } from "react";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { Trash3Outlined, Pencil1Outlined } from "@lineiconshq/free-icons";

import { Client } from "./types/Client";

type SortConfig = {
	key: keyof Client;
	direction: "asc" | "desc";
};

type Props = {
	listData: Client[] | [];
	searchText: string;
	onEdit?: (client: Client) => void;
	onDelet?: (client: Client) => void;
};

export default function DataTable({
	listData,
	searchText,
	onEdit,
	onDelet,
}: Props) {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: "user_id",
		direction: "asc",
	});

	const handleEdit = (client: Client) => {
		onEdit?.(client);
	};

	const handleDelete = (client: Client) => {
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

	const filterData = (listData: Client[]) => {
		if (!searchText.trim()) {
			return listData;
		}

		const searchLower = searchText.toLowerCase();

		return listData.filter((client) => {
			const nameMatch = client.profile?.name
				.toLowerCase()
				.includes(searchLower);
			const lastnameMatch = client.profile?.last_name
				.toLowerCase()
				.includes(searchLower);

			return nameMatch || lastnameMatch;
		});
	};

	const handleSort = (key: keyof Client) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
		}));
	};

	const SortIcon = ({ column }: { column: keyof Client }) => {
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
								onClick={() => handleSort("user_id")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								User ID <SortIcon column="user_id" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("profile")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Nombre <SortIcon column="profile" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("profile")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Apellido <SortIcon column="profile" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("created_at")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Fecha Creación <SortIcon column="created_at" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("profile")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Estado <SortIcon column="profile" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("profile")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Próximo Pago <SortIcon column="profile" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("updated_at")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Actualizado <SortIcon column="updated_at" />
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
							key={client.user_id}
							className={`border-b border-gray-200 dark:border-gray-700 ${
								index % 2 === 0
									? "bg-white dark:bg-white/2"
									: "bg-gray-50 dark:bg-white/5"
							} hover:bg-gray-100 dark:hover:bg-white/8 transition-colors`}
						>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client.user_id}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client.profile?.name}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client.profile?.last_name}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client.created_at}
							</td>
							<td className="px-4 py-3 text-sm">
								<span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold dark:bg-green-900/30 dark:text-green-400">
									{client.profile?.status?.name}
								</span>
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								en proceso
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client.updated_at}
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
