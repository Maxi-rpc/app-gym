import { useState } from "react";

import Badge from "../../../components/ui/badge/Badge";

import { Lineicons } from "@lineiconshq/react-lineicons";
import { Search1Outlined } from "@lineiconshq/free-icons";

import { StockMovement } from "../../../service/types/ProductStock";

import { formatLocalDateTime } from "../../../utils/date";

type SortKey =
	| "createdAt"
	| "name"
	| "movementType"
	| "quantity"
	| "previousStock"
	| "newStock"
	| "productName"
	| "employeeName";

type SortConfig = {
	key: SortKey;
	direction: "asc" | "desc";
};

type Props = {
	listData: StockMovement[] | [];
	searchText: string;
	onEdit?: (data: StockMovement) => void;
};

export default function DataTable({ listData, searchText, onEdit }: Props) {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: "createdAt",
		direction: "asc",
	});

	const handleEdit = (data: StockMovement) => {
		onEdit?.(data);
	};

	const filterData = (listData: StockMovement[]) => {
		if (!searchText.trim()) {
			return listData;
		}

		const searchLower = searchText.toLowerCase();

		return listData.filter((data) => {
			const nameMatch = data.product?.name?.toLowerCase().includes(searchLower);
			const descriptionMatch = data?.employee?.name
				?.toLowerCase()
				.includes(searchLower);

			return nameMatch || descriptionMatch;
		});
	};

	const getSortValue = (data: StockMovement, key: SortKey): string | number => {
		switch (key) {
			case "createdAt":
				return data.created_at ? new Date(data.created_at).getTime() : 0;
			case "name":
				return data.name ?? "";
			case "movementType":
				return data?.movement_type ?? "";
			case "quantity":
				return data?.quantity ?? "";
			case "previousStock":
				return data?.previous_stock ?? "";
			case "newStock":
				return data?.new_stock ?? "";
			case "productName":
				return data?.product?.name ?? "";
			case "employeeName":
				return data?.employee?.name ?? "";
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
								onClick={() => handleSort("createdAt")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Fecha <SortIcon column="createdAt" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("name")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Producto <SortIcon column="name" />
							</button>
						</th>

						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("movementType")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Movimiento <SortIcon column="movementType" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("quantity")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Cantidad <SortIcon column="quantity" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("employeeName")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Empleado <SortIcon column="employeeName" />
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
					{filterData(sortedData).map((item, index) => (
						<tr
							key={item.id}
							className={`border-b border-gray-200 dark:border-gray-700 ${
								index % 2 === 0
									? "bg-white dark:bg-white/2"
									: "bg-gray-50 dark:bg-white/5"
							} hover:bg-gray-100 dark:hover:bg-white/8 transition-colors`}
						>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{formatLocalDateTime(item.created_at)}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{item?.product?.name}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{item?.movement_type}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								<Badge color={"info"}>{item?.quantity}</Badge>
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{item?.employee?.name} {item?.employee?.last_name}
							</td>
							<td className="px-4 py-3 text-sm">
								<div className="flex gap-2">
									<button
										onClick={() => handleEdit(item)}
										className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
									>
										<Lineicons icon={Search1Outlined} size={20} />
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
