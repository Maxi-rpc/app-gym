import { useState } from "react";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { Trash3Outlined, Pencil1Outlined } from "@lineiconshq/free-icons";

import { Coach } from "../../service/types/Coach";

type SortKey =
	| "userId"
	| "name"
	| "lastName"
	| "status"
	| "createdAt"
	| "updatedAt";

type SortConfig = {
	key: SortKey;
	direction: "asc" | "desc";
};

type Props = {
	listData: Coach[] | [];
	searchText: string;
	onEdit?: (Coach: Coach) => void;
	onDelet?: (Coach: Coach) => void;
};

export default function DataTable({
	listData,
	searchText,
	onEdit,
	onDelet,
}: Props) {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: "userId",
		direction: "asc",
	});

	const handleEdit = (Coach: Coach) => {
		onEdit?.(Coach);
	};

	const handleDelete = (Coach: Coach) => {
		onDelet?.(Coach);
	};

	const filterData = (listData: Coach[]) => {
		if (!searchText.trim()) {
			return listData;
		}

		const searchLower = searchText.toLowerCase();

		return listData.filter((coach) => {
			const nameMatch = coach.profile?.name
				?.toLowerCase()
				.includes(searchLower);
			const lastnameMatch = coach.profile?.last_name
				?.toLowerCase()
				.includes(searchLower);

			return nameMatch || lastnameMatch;
		});
	};

	const getSortValue = (coach: Coach, key: SortKey): string | number => {
		switch (key) {
			case "userId":
				return coach.user_id;
			case "name":
				return coach.profile?.name ?? "";
			case "lastName":
				return coach.profile?.last_name ?? "";
			case "status":
				return coach.profile?.status?.name ?? "";
			case "createdAt":
				return new Date(coach.created_at).getTime() || 0;
			case "updatedAt":
				return new Date(coach.updated_at).getTime() || 0;
		}
	};

	const sortedData = [...listData].sort((a, b) => {
		const aValue = getSortValue(a, sortConfig.key);
		const bValue = getSortValue(b, sortConfig.key);
		const comparison =
			typeof aValue === "string" && typeof bValue === "string"
				? aValue.localeCompare(bValue, undefined, { sensitivity: "base" })
				: Number(aValue) - Number(bValue);

		return sortConfig.direction === "asc" ? comparison : -comparison;
	});

	const handleSort = (key: SortKey) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
		}));
	};

	const SortIcon = ({ column }: { column: SortKey }) => {
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
								onClick={() => handleSort("userId")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								User ID <SortIcon column="userId" />
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
								onClick={() => handleSort("lastName")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Apellido <SortIcon column="lastName" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("createdAt")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Fecha Creación <SortIcon column="createdAt" />
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
								onClick={() => handleSort("updatedAt")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Actualizado <SortIcon column="updatedAt" />
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
					{filterData(sortedData).map((Coach, index) => (
						<tr
							key={Coach.user_id}
							className={`border-b border-gray-200 dark:border-gray-700 ${
								index % 2 === 0
									? "bg-white dark:bg-white/2"
									: "bg-gray-50 dark:bg-white/5"
							} hover:bg-gray-100 dark:hover:bg-white/8 transition-colors`}
						>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{Coach.user_id}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{Coach.profile?.name}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{Coach.profile?.last_name}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{Coach.created_at}
							</td>
							<td className="px-4 py-3 text-sm">
								<span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold dark:bg-green-900/30 dark:text-green-400">
									{Coach.profile?.status?.name}
								</span>
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{Coach.updated_at}
							</td>
							<td className="px-4 py-3 text-sm">
								<div className="flex gap-2">
									<button
										onClick={() => handleEdit(Coach)}
										className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
										title="Editar"
									>
										<Lineicons icon={Pencil1Outlined} size={20} color="blue" />
									</button>

									<button
										onClick={() => handleDelete(Coach)}
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
