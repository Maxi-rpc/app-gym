import { useState } from "react";

import { Lineicons } from "@lineiconshq/react-lineicons";
import { Pencil1Outlined } from "@lineiconshq/free-icons";

import { UserStatus } from "../../../service/types/UserStatus";

import { formatLocalDateTime } from "../../../utils/date";

type SortKey = "id" | "createdAt" | "name" | "description" | "updatedAt";

type SortConfig = {
	key: SortKey;
	direction: "asc" | "desc";
};

type Props = {
	listData: UserStatus[] | [];
	searchText: string;
	onEdit?: (UserStatus: UserStatus) => void;
};

export default function DataTable({ listData, searchText, onEdit }: Props) {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: "id",
		direction: "asc",
	});

	const handleEdit = (UserStatus: UserStatus) => {
		onEdit?.(UserStatus);
	};

	const filterData = (listData: UserStatus[]) => {
		if (!searchText.trim()) {
			return listData;
		}

		const searchLower = searchText.toLowerCase();

		return listData.filter((Role) => {
			const nameMatch = Role.name?.toLowerCase().includes(searchLower);
			const descriptionMatch = Role?.description
				?.toLowerCase()
				.includes(searchLower);

			return nameMatch || descriptionMatch;
		});
	};

	const getSortValue = (
		userStatus: UserStatus,
		key: SortKey,
	): string | number => {
		switch (key) {
			case "id":
				return userStatus.id ?? "";
			case "createdAt":
				return userStatus.created_at
					? new Date(userStatus.created_at).getTime()
					: 0;
			case "name":
				return userStatus?.name ?? "";
			case "description":
				return userStatus?.description ?? "";
			case "updatedAt":
				return userStatus.updated_at
					? new Date(userStatus.updated_at).getTime()
					: 0;
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
								onClick={() => handleSort("id")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								ID <SortIcon column="id" />
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
								onClick={() => handleSort("name")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Nombre <SortIcon column="name" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("description")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Descripción <SortIcon column="description" />
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
					{filterData(sortedData).map((role, index) => (
						<tr
							key={role.id}
							className={`border-b border-gray-200 dark:border-gray-700 ${
								index % 2 === 0
									? "bg-white dark:bg-white/2"
									: "bg-gray-50 dark:bg-white/5"
							} hover:bg-gray-100 dark:hover:bg-white/8 transition-colors`}
						>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{role.id}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{formatLocalDateTime(role.created_at)}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{role?.name}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{role?.description}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{formatLocalDateTime(role.updated_at)}
							</td>
							<td className="px-4 py-3 text-sm">
								<div className="flex gap-2">
									<button
										onClick={() => handleEdit(role)}
										className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
									>
										<Lineicons icon={Pencil1Outlined} size={20} />
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
