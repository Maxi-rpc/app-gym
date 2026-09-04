import { Lineicons } from "@lineiconshq/react-lineicons";
import {
	Trash3Outlined,
	Pencil1Outlined,
	Search1Outlined,
} from "@lineiconshq/free-icons";

import {
	Client,
	ClientPageSize,
	ClientSortKey,
} from "../../../service/types/Client";
import { formatLocalDateTime } from "../../../utils/date";

type SortConfig = { key: ClientSortKey; direction: "asc" | "desc" };

type Props = {
	listData: Client[];
	page: number;
	pageSize: ClientPageSize;
	total: number;
	isLoading?: boolean;
	sortConfig: SortConfig;
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: ClientPageSize) => void;
	onSortChange: (sortConfig: SortConfig) => void;
	onEdit?: (client: Client) => void;
	onDelet?: (client: Client) => void;
	onView?: (client: Client) => void;
};

const columns: Array<{ label: string; key: ClientSortKey }> = [
	{ label: "User ID", key: "user_id" },
	{ label: "Nombre", key: "name" },
	{ label: "Apellido", key: "last_name" },
	{ label: "Fecha Creacion", key: "created_at" },
	{ label: "Estado", key: "status" },
	{ label: "Actualizado", key: "updated_at" },
];

export default function DataTable({
	listData,
	page,
	pageSize,
	total,
	isLoading = false,
	sortConfig,
	onPageChange,
	onPageSizeChange,
	onSortChange,
	onEdit,
	onDelet,
	onView,
}: Props) {
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
	const to = Math.min(page * pageSize, total);

	const handleSort = (key: ClientSortKey) => {
		onSortChange({
			key,
			direction:
				sortConfig.key === key && sortConfig.direction === "asc"
					? "desc"
					: "asc",
		});
	};

	const SortIcon = ({ column }: { column: ClientSortKey }) => {
		if (sortConfig.key !== column)
			return <span className="text-gray-400">↕</span>;
		return (
			<span className="text-blue-500">
				{sortConfig.direction === "asc" ? "↑" : "↓"}
			</span>
		);
	};

	return (
		<div className="overflow-x-auto">
			<table className="w-full table-auto">
				<thead>
					<tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
						{columns.map(({ label, key }) => (
							<th key={key} className="px-4 py-3 text-left">
								<button
									type="button"
									onClick={() => handleSort(key)}
									disabled={isLoading}
									className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-300"
								>
									{label} <SortIcon column={key} />
								</button>
							</th>
						))}
						<th className="px-4 py-3 text-left">
							<span className="font-semibold text-gray-700 dark:text-gray-300">
								Acciones
							</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{listData.map((client, index) => (
						<tr
							key={client.user_id}
							className={`border-b border-gray-200 transition-colors dark:border-gray-700 ${index % 2 === 0 ? "bg-white dark:bg-white/2" : "bg-gray-50 dark:bg-white/5"} hover:bg-gray-100 dark:hover:bg-white/8`}
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
								{formatLocalDateTime(client.created_at)}
							</td>
							<td className="px-4 py-3 text-sm">
								<span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
									{client.profile?.status?.name}
								</span>
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{formatLocalDateTime(client.updated_at)}
							</td>
							<td className="px-4 py-3 text-sm">
								<div className="flex gap-2">
									<button
										type="button"
										onClick={() => onView?.(client)}
										className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
									>
										<Lineicons icon={Search1Outlined} size={20} />
									</button>
									<button
										type="button"
										onClick={() => onEdit?.(client)}
										className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
									>
										<Lineicons icon={Pencil1Outlined} size={20} />
									</button>
									<button
										type="button"
										onClick={() => onDelet?.(client)}
										className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-error-500 transition-colors hover:bg-gray-100 hover:text-error-700 dark:border-gray-800 dark:bg-gray-900 dark:text-red-400 dark:hover:bg-gray-800 dark:hover:text-white"
									>
										<Lineicons icon={Trash3Outlined} size={20} />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="mt-4 flex flex-col gap-4 text-sm text-gray-600 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-2">
					<label htmlFor="clients-page-size">Mostrar</label>
					<select
						id="clients-page-size"
						value={pageSize}
						disabled={isLoading}
						onChange={(event) =>
							onPageSizeChange(Number(event.target.value) as ClientPageSize)
						}
						className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 outline-none focus:border-brand-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
					>
						{([5, 10, 15, 20] as ClientPageSize[]).map((size) => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>
					<span>por pagina</span>
				</div>
				<div className="flex items-center gap-3 sm:justify-end">
					<span>
						Mostrando {from}-{to} de {total}
					</span>
					<button
						type="button"
						disabled={isLoading || page <= 1}
						onClick={() => onPageChange(page - 1)}
						className="rounded-lg border border-gray-300 px-3 py-2 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
					>
						Anterior
					</button>
					<span>
						{page} / {totalPages}
					</span>
					<button
						type="button"
						disabled={isLoading || page >= totalPages || total === 0}
						onClick={() => onPageChange(page + 1)}
						className="rounded-lg border border-gray-300 px-3 py-2 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
					>
						Siguiente
					</button>
				</div>
			</div>
		</div>
	);
}
