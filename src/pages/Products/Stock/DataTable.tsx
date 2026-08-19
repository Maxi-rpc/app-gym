import { useState } from "react";

import Badge from "../../../components/ui/badge/Badge";

import { Lineicons } from "@lineiconshq/react-lineicons";
import { Pencil1Outlined } from "@lineiconshq/free-icons";
import { AlertHexaIcon } from "../../../icons";

import { Product } from "../../../service/types/Product";

type SortKey =
	| "barcode"
	| "name"
	| "image"
	| "category"
	| "salePrice"
	| "stock"
	| "minimumStock"
	| "status";

type SortConfig = {
	key: SortKey;
	direction: "asc" | "desc";
};

type Props = {
	listData: Product[] | [];
	searchText: string;
	onEdit?: (data: Product) => void;
};

export default function DataTable({ listData, searchText, onEdit }: Props) {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: "barcode",
		direction: "asc",
	});

	const handleEdit = (data: Product) => {
		onEdit?.(data);
	};

	const filterData = (listData: Product[]) => {
		if (!searchText.trim()) {
			return listData;
		}

		const searchLower = searchText.toLowerCase();

		return listData.filter((data) => {
			const nameMatch = data.name?.toLowerCase().includes(searchLower);
			const descriptionMatch = data?.description
				?.toLowerCase()
				.includes(searchLower);

			return nameMatch || descriptionMatch;
		});
	};

	const getSortValue = (data: Product, key: SortKey): string | number => {
		switch (key) {
			case "barcode":
				return data.barcode ?? "";
			case "name":
				return data?.name ?? "";
			case "image":
				return data?.image ?? "";
			case "category":
				return data?.category?.name ?? "";
			case "salePrice":
				return data?.sale_price ?? "";
			case "stock":
				return data?.stock ?? "";
			case "minimumStock":
				return data?.minimum_stock ?? "";
			case "status":
				return data?.status?.name ?? "";
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
								onClick={() => handleSort("name")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Producto <SortIcon column="name" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("category")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Categoría <SortIcon column="category" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("stock")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Stock <SortIcon column="stock" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("minimumStock")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Stock Mínimo <SortIcon column="minimumStock" />
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
								<div className="flex items-center gap-3">
									<div className="h-12.5 w-12.5 overflow-hidden rounded-md">
										<img
											src={item?.image}
											className="h-12.5 w-12.5"
											alt={item.name}
										/>
									</div>
									<div>
										<p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
											{item?.name}
										</p>
									</div>
								</div>
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{item?.category?.name}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{item?.stock}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								<Badge
									color={
										item?.stock > item?.minimum_stock ? "success" : "warning"
									}
								>
									{item?.minimum_stock}
									{item?.stock <= item?.minimum_stock && <AlertHexaIcon />}
								</Badge>
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								<Badge
									color={
										item?.stock > item?.minimum_stock ? "success" : "warning"
									}
								>
									{item?.stock > item?.minimum_stock ? "Normal" : "Bajo"}
									{item?.stock <= item?.minimum_stock && <AlertHexaIcon />}
								</Badge>
							</td>
							<td className="px-4 py-3 text-sm">
								<div className="flex gap-2">
									<button
										onClick={() => handleEdit(item)}
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
