import { useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";

type Client = {
	id: number;
	name: string;
	lastname: string;
	createDate: string;
	status: string;
	nextPaid: string;
	updateDate: string;
};

type SortConfig = {
	key: keyof Client;
	direction: "asc" | "desc";
};

const mockData: Client[] = [
	{
		id: 1,
		name: "Pepedon",
		lastname: "Pepe",
		createDate: "11-01-2026",
		status: "Valid",
		nextPaid: "11-02-2026",
		updateDate: "11-01-2026",
	},
	{
		id: 2,
		name: "Pepe",
		lastname: "Pepito",
		createDate: "12-01-2026",
		status: "Valid",
		nextPaid: "12-02-2026",
		updateDate: "12-01-2026",
    },
    {
		id: 3,
		name: "Pepito",
		lastname: "Pepito",
		createDate: "12-01-2026",
		status: "Valid",
		nextPaid: "12-02-2026",
		updateDate: "12-01-2026",
    },
    {
		id: 4,
		name: "Pepa",
		lastname: "Pepito",
		createDate: "12-01-2026",
		status: "Valid",
		nextPaid: "12-02-2026",
		updateDate: "12-01-2026",
	},
];

export default function Clients() {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: "id",
		direction: "asc",
	});

	const handleSort = (key: keyof Client) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
		}));
	};

	const sortedData = [...mockData].sort((a, b) => {
		const aValue = a[sortConfig.key];
		const bValue = b[sortConfig.key];

		if (typeof aValue === "string") {
			return sortConfig.direction === "asc"
				? aValue.localeCompare(bValue as string)
				: (bValue as string).localeCompare(aValue);
		}

		if (typeof aValue === "number") {
			return sortConfig.direction === "asc"
				? (aValue as number) - (bValue as number)
				: (bValue as number) - (aValue as number);
		}

		return 0;
	});

	const SortIcon = ({ column }: { column: keyof Client }) => {
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
		<div>
			<PageMeta
				title="App Gym - Administration Client"
				description="Panel de administracion para clientes"
			/>
			<PageBreadcrumb pageTitle="Clients" />
			<div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
				<div className="mx-auto w-full text-center mb-8">
					<h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
						Listado de clientes
					</h3>

					<p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
						Se muestran los clientes registrados hasta la fecha actual.
					</p>
				</div>

				{/* Data Table */}
				<div className="flex justify-between items-end gap-4 max-sm:px-4 mb-2">
					<div className="space-y-6 flex-1">
						<Label htmlFor="inputTwo">Buscar Cliente</Label>
						<Input type="text" id="inputTwo" placeholder="nombre o appelido" />
					</div>
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 sm:py-2 sm:px-6 rounded text-sm sm:text-base whitespace-nowrap">
						Agregar
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 sm:py-2 sm:px-6 rounded text-sm sm:text-base whitespace-nowrap">
						Actualizar
					</button>
				</div>

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
										onClick={() => handleSort("lastname")}
										className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
									>
										Apellido <SortIcon column="lastname" />
									</button>
								</th>
								<th className="px-4 py-3 text-left">
									<button
										onClick={() => handleSort("createDate")}
										className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
									>
										Fecha Creación <SortIcon column="createDate" />
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
										onClick={() => handleSort("nextPaid")}
										className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
									>
										Próximo Pago <SortIcon column="nextPaid" />
									</button>
								</th>
								<th className="px-4 py-3 text-left">
									<button
										onClick={() => handleSort("updateDate")}
										className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
									>
										Actualizado <SortIcon column="updateDate" />
									</button>
								</th>
							</tr>
						</thead>
						<tbody>
							{sortedData.map((client, index) => (
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
										{client.name}
									</td>
									<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
										{client.lastname}
									</td>
									<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
										{client.createDate}
									</td>
									<td className="px-4 py-3 text-sm">
										<span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold dark:bg-green-900/30 dark:text-green-400">
											{client.status}
										</span>
									</td>
									<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
										{client.nextPaid}
									</td>
									<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
										{client.updateDate}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
