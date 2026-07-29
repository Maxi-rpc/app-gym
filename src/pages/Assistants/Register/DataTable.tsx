import { useState } from "react";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { Trash3Outlined, Pencil1Outlined } from "@lineiconshq/free-icons";

import Badge from "../../../components/ui/badge/Badge";

import { formatLocalDateTime } from "../../../utils/date";

import { ClientAssistant } from "../../../service/types/ClientAssistant";

type SortKey =
	| "id"
	| "checkInAt"
	| "name"
	| "lastName"
	| "accessGranted"
	| "membershipActive"
	| "createdBy";

type SortConfig = {
	key: SortKey;
	direction: "asc" | "desc";
};

type Props = {
	listData: ClientAssistant[] | [];
	searchText: string;
	onEdit?: (client: ClientAssistant) => void;
	onDelet?: (client: ClientAssistant) => void;
};

export default function DataTable({
	listData,
	searchText,
	onEdit,
	onDelet,
}: Props) {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: "checkInAt",
		direction: "desc",
	});

	const handleEdit = (client: ClientAssistant) => {
		onEdit?.(client);
	};

	const handleDelete = (client: ClientAssistant) => {
		onDelet?.(client);
	};

	const filterData = (listData: ClientAssistant[]) => {
		if (!searchText.trim()) {
			return listData;
		}

		const searchLower = searchText.toLowerCase();

		return listData.filter((client) => {
			const nameMatch = client.user?.name?.toLowerCase().includes(searchLower);
			const lastnameMatch = client.user?.last_name
				?.toLowerCase()
				.includes(searchLower);

			return nameMatch || lastnameMatch;
		});
	};

	const getSortValue = (
		client: ClientAssistant,
		key: SortKey,
	): string | number => {
		switch (key) {
			case "id":
				return client.id;
			case "checkInAt":
				return new Date(client.check_in_at).getTime() || 0;
			case "name":
				return client.user?.name ?? "";
			case "lastName":
				return client.user?.last_name ?? "";
			case "accessGranted":
				return String(client.access_granted);
			case "membershipActive":
				return client.membership?.membership_status?.name ?? "";
			case "createdBy":
				return client?.created_by_profile?.name ?? "";
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
						{/* <th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("id")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								ID <SortIcon column="id" />
							</button>
						</th> */}
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("checkInAt")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Fecha <SortIcon column="checkInAt" />
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
								onClick={() => handleSort("accessGranted")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Acceso <SortIcon column="accessGranted" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("membershipActive")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Membresía <SortIcon column="membershipActive" />
							</button>
						</th>
						<th className="px-4 py-3 text-left">
							<button
								onClick={() => handleSort("createdBy")}
								className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
							>
								Registrado Por <SortIcon column="createdBy" />
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
							{/* <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client.id}
							</td> */}
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{formatLocalDateTime(client?.check_in_at)}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client?.user?.name}
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client?.user?.last_name}
							</td>
							<td className="px-4 py-3 text-sm">
								<Badge color={client?.access_granted ? "success" : "warning"}>
									{client?.access_granted ? "Si" : "No"}
								</Badge>
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								<Badge
									color={
										client?.membership?.membership_status?.id == 1
											? "success"
											: "warning"
									}
								>
									{client?.membership?.membership_status?.name}
								</Badge>
							</td>
							<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
								{client?.created_by_profile?.name}{" "}
								{client?.created_by_profile?.last_name}
							</td>
							<td className="px-4 py-3 text-sm">
								<div className="flex gap-2">
									<button
										onClick={() => handleEdit(client)}
										className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
									>
										<Lineicons icon={Pencil1Outlined} size={20} />
									</button>

									<button
										onClick={() => handleDelete(client)}
										className="relative flex items-center justify-center text-error-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-error-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
									>
										<Lineicons icon={Trash3Outlined} size={20} />
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
