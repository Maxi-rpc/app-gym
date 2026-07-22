import { useState } from "react";

import { Attendance } from "../../types/Attendance";

type SortKey =
	| "id"
	| "checkInAt"
	| "checkOutAt"
	| "accessGranted"
	| "accessReason";

type SortConfig = {
	key: SortKey;
	direction: "asc" | "desc";
};

type Props = {
	listData: Attendance[];
	searchText: string;
};

export default function AttendanceTable({ listData, searchText }: Props) {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: "checkInAt",
		direction: "desc",
	});

	const getSortValue = (
		attendance: Attendance,
		key: SortKey,
	): string | number => {
		switch (key) {
			case "id":
				return attendance.id;
			case "checkInAt":
				return new Date(attendance.check_in_at).getTime() || 0;
			case "checkOutAt":
				return new Date(attendance.check_out_at).getTime() || 0;
			case "accessGranted":
				return String(attendance.access_granted);
			case "accessReason":
				return attendance.access_reason ?? "";
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

	const filteredData = sortedData.filter((attendance) => {
		if (!searchText.trim()) {
			return true;
		}

		const searchLower = searchText.toLowerCase();
		return [
			attendance.id,
			attendance.check_in_at,
			attendance.access_granted,
			attendance.access_reason,
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
		{ key: "checkInAt", label: "Check In" },
		{ key: "checkOutAt", label: "Check Out" },
		{ key: "accessGranted", label: "Acceso" },
		{ key: "accessReason", label: "Razón" },
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
					{filteredData.map((attendance, index) => (
						<tr
							className={`border-b border-gray-200 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-white/8 ${
								index % 2 === 0
									? "bg-white dark:bg-white/2"
									: "bg-gray-50 dark:bg-white/5"
							}`}
							key={attendance.id}
						>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{attendance.id}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{attendance?.check_in_at}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{attendance?.check_out_at}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								<span
									className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
										attendance?.access_granted
											? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
											: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
									}`}
								>
									{attendance?.access_granted ? "Si" : "No"}
								</span>
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{attendance?.access_reason}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
