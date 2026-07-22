import { useState } from "react";

import { Membership } from "../types/Membership";

type SortKey =
	| "id"
	| "service"
	| "startDate"
	| "endDate"
	| "nextDueDate"
	| "active"
	| "createdAt"
	| "observations";

type SortConfig = {
	key: SortKey;
	direction: "asc" | "desc";
};

type Props = {
	listData: Membership[];
	searchText: string;
};

export default function MembershipsTable({ listData, searchText }: Props) {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: "createdAt",
		direction: "desc",
	});

	const getSortValue = (
		membership: Membership,
		key: SortKey,
	): string | number => {
		switch (key) {
			case "id":
				return membership.id;
			case "service":
				return membership.service?.name ?? "";
			case "startDate":
				return new Date(membership.start_date).getTime() || 0;
			case "endDate":
				return new Date(membership.end_date).getTime() || 0;
			case "nextDueDate":
				return new Date(membership.next_due_date).getTime() || 0;
			case "active":
				return Number(membership.active);
			case "createdAt":
				return new Date(membership.created_at).getTime() || 0;
			case "observations":
				return membership.observations ?? "";
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

	const filteredData = sortedData.filter((membership) => {
		if (!searchText.trim()) {
			return true;
		}

		const searchLower = searchText.toLowerCase();
		return [
			membership.id,
			membership.service?.name,
			membership.observations,
			membership.start_date,
			membership.end_date,
			membership.next_due_date,
		]
			.filter((value): value is string => Boolean(value))
			.some((value) => value.toLowerCase().includes(searchLower));
	});

	const handleSort = (key: SortKey) => {
		setSortConfig((previous) => ({
			key,
			direction:
				previous.key === key && previous.direction === "asc" ? "desc" : "asc",
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

	const columns: { key: SortKey; label: string }[] = [
		{ key: "id", label: "ID" },
		{ key: "service", label: "Servicio" },
		{ key: "startDate", label: "Fecha de inicio" },
		{ key: "endDate", label: "Fecha de fin" },
		{ key: "nextDueDate", label: "Próximo vencimiento" },
		{ key: "active", label: "Estado" },
		{ key: "createdAt", label: "Creada" },
		{ key: "observations", label: "Observaciones" },
	];

	return (
		<div className="overflow-x-auto">
			<table className="w-full table-auto">
				<thead>
					<tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
						{columns.map((column) => (
							<th className="px-4 py-3 text-left" key={column.key}>
								<button
									className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 dark:text-gray-300"
									onClick={() => handleSort(column.key)}
									type="button"
								>
									{column.label} <SortIcon column={column.key} />
								</button>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{filteredData.map((membership, index) => (
						<tr
							className={`border-b border-gray-200 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-white/8 ${
								index % 2 === 0
									? "bg-white dark:bg-white/2"
									: "bg-gray-50 dark:bg-white/5"
							}`}
							key={membership.id}
						>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{membership.id}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{membership.service?.name}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{membership.start_date}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{membership.end_date}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{membership.next_due_date}
							</td>
							<td className="px-4 py-3 text-sm">
								<span
									className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
										membership.active
											? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
											: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
									}`}
								>
									{membership.active ? "Activa" : "Inactiva"}
								</span>
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{membership.created_at}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{membership.observations}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
