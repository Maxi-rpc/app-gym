import { useState } from "react";
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
	Pencil1Outlined,
	Search1Outlined,
	Trash3Outlined,
} from "@lineiconshq/free-icons";

import { SaleTableRow } from "./types/Product";

type SortConfig = {
	key: keyof SaleTableRow;
	direction: "asc" | "desc";
};

type Props = {
	listData: SaleTableRow[] | [];
	searchText: string;
	onEdit?: (item: SaleTableRow) => void;
	onDelet?: (item: SaleTableRow) => void;
	onViewDetail?: (item: SaleTableRow) => void;
};

export default function DataTable({
	listData,
	searchText,
	onEdit,
	onDelet,
	onViewDetail,
}: Props) {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: "id",
		direction: "asc",
	});

	const handleSort = (key: keyof SaleTableRow) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
		}));
	};

	const sortedData = [...listData].sort((a, b) => {
		const aValue = a[sortConfig.key];
		const bValue = b[sortConfig.key];

		if (typeof aValue === "string" && typeof bValue === "string") {
			return sortConfig.direction === "asc"
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue);
		}

		if (typeof aValue === "number" && typeof bValue === "number") {
			return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
		}

		return 0;
	});

	const filterData = (data: SaleTableRow[]) => {
		if (!searchText.trim()) {
			return data;
		}

		const searchLower = searchText.toLowerCase();

		return data.filter((item) => {
			const productMatch = item.productsPreview.some((subItem) =>
				subItem.productName.toLowerCase().includes(searchLower),
			);
			const notesMatch =
				item.notes?.toLowerCase().includes(searchLower) ?? false;
			const statusMatch = item.status.toLowerCase().includes(searchLower);
			const dateMatch = item.saleDate.includes(searchLower);
			const idMatch = String(item.id).includes(searchLower);

			return productMatch || notesMatch || statusMatch || dateMatch || idMatch;
		});
	};

	const formatCurrency = (value: number) =>
		new Intl.NumberFormat("es-AR", {
			style: "currency",
			currency: "ARS",
			maximumFractionDigits: 0,
		}).format(value);

	const getProductsText = (item: SaleTableRow) =>
		item.productsPreview
			.map((product) => `${product.productName} x${product.quantity}`)
			.join(", ");

	const SortIcon = ({ column }: { column: keyof SaleTableRow }) => {
		if (sortConfig.key !== column) {
			return <span className="text-gray-400">&harr;</span>;
		}

		return sortConfig.direction === "asc" ? (
			<span className="text-blue-500">&uarr;</span>
		) : (
			<span className="text-blue-500">&darr;</span>
		);
	};

	return (
		<div className="overflow-x-auto">
			<table className="w-full table-auto">
				<thead>
					<tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("id")}
								className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 dark:text-gray-300"
							>
								ID <SortIcon column="id" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("saleDate")}
								className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 dark:text-gray-300"
							>
								Fecha <SortIcon column="saleDate" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<span className="font-semibold text-gray-700 dark:text-gray-300">
								Productos
							</span>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("itemsCount")}
								className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 dark:text-gray-300"
							>
								Items <SortIcon column="itemsCount" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("totalQuantity")}
								className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 dark:text-gray-300"
							>
								Cantidad <SortIcon column="totalQuantity" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("totalAmount")}
								className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 dark:text-gray-300"
							>
								Total <SortIcon column="totalAmount" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("totalProfit")}
								className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 dark:text-gray-300"
							>
								Ganancia <SortIcon column="totalProfit" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("status")}
								className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 dark:text-gray-300"
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
					{filterData(sortedData).map((sale, index) => (
						<tr
							key={sale.id}
							className={`border-b border-gray-200 transition-colors dark:border-gray-700 ${
								index % 2 === 0
									? "bg-white dark:bg-white/2"
									: "bg-gray-50 dark:bg-white/5"
							} hover:bg-gray-100 dark:hover:bg-white/8`}
						>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{sale.id}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{sale.saleDate}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								<div
									className="max-w-64 truncate"
									title={getProductsText(sale)}
								>
									{sale.productsPreview.map((product) => (
										<span key={product.productId} className="mr-2 inline-block">
											{product.productName}
											<span className="text-gray-500 dark:text-gray-400">
												{" "}
												x{product.quantity}
											</span>
										</span>
									))}
								</div>
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{sale.itemsCount}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{sale.totalQuantity}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{formatCurrency(sale.totalAmount)}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{formatCurrency(sale.totalProfit)}
							</td>
							<td className="px-4 py-3 text-sm">
								<span
									className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
										sale.status === "active"
											? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
											: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
									}`}
								>
									{sale.status}
								</span>
							</td>
							<td className="px-4 py-3 text-sm">
								<div className="flex gap-2">
									<button
										onClick={() => onViewDetail?.(sale)}
										className="text-gray-500 transition-colors hover:text-gray-700 dark:hover:text-gray-300"
										title="Ver detalle"
									>
										<Lineicons icon={Search1Outlined} size={20} color="gray" />
									</button>

									<button
										onClick={() => onEdit?.(sale)}
										className="text-blue-500 transition-colors hover:text-blue-700 dark:hover:text-blue-300"
										title="Editar"
									>
										<Lineicons icon={Pencil1Outlined} size={20} color="blue" />
									</button>

									<button
										onClick={() => onDelet?.(sale)}
										className="text-red-500 transition-colors hover:text-red-700 dark:hover:text-red-300"
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
