import { useState } from "react";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { Trash3Outlined, Pencil1Outlined } from "@lineiconshq/free-icons";

import { Membership_payment } from "../../service/types/Payments";

type SortKey =
	| "id"
	| "name"
	| "lastName"
	| "createdAt"
	| "status"
	| "nextDueDate"
	| "registeredBy"
	| "updatedAt";

type SortConfig = {
	key: SortKey;
	direction: "asc" | "desc";
};

type Props = {
	listData: Membership_payment[] | [];
	searchText: string;
	onEdit?: (client: Membership_payment) => void;
	onDelet?: (client: Membership_payment) => void;
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

	const handleEdit = (client: Membership_payment) => {
		onEdit?.(client);
	};

	const handleDelete = (client: Membership_payment) => {
		onDelet?.(client);
	};

	const filterData = (listData: Membership_payment[]) => {
		if (!searchText.trim()) {
			return listData;
		}

		const searchLower = searchText.toLowerCase();

		return listData.filter((client) => {
			const nameMatch = client.membership?.client?.profile?.name
				?.toLowerCase()
				.includes(searchLower);
			const lastnameMatch = client.membership?.client?.profile?.last_name
				?.toLowerCase()
				.includes(searchLower);

			return nameMatch || lastnameMatch;
		});
	};

	const getSortValue = (
		payment: Membership_payment,
		key: SortKey,
	): string | number => {
		switch (key) {
			case "id":
				return payment.id;
			case "name":
				return payment.membership?.client?.profile?.name ?? "";
			case "lastName":
				return payment.membership?.client?.profile?.last_name ?? "";
			case "createdAt":
				return new Date(payment.created_at).getTime() || 0;
			case "status":
				return payment.payment_status?.name ?? "";
			case "nextDueDate":
				return new Date(payment.next_due_date).getTime() || 0;
			case "registeredBy":
				return `${payment.employee?.profile?.name ?? ""} ${payment.employee?.profile?.last_name ?? ""}`.trim();
			case "updatedAt":
				return new Date(payment.updated_at).getTime() || 0;
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
								onClick={() => handleSort("nextDueDate")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Próximo Pago <SortIcon column="nextDueDate" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("registeredBy")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Registrado Por <SortIcon column="registeredBy" />
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
								{client?.membership?.client?.profile?.name}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client?.membership?.client?.profile?.last_name}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client.created_at}
							</td>
							<td className="px-4 py-3 text-sm">
								{client?.payment_status?.name}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client?.next_due_date}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client?.employee?.profile?.name}{" "}
								{client?.employee?.profile?.last_name}
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
