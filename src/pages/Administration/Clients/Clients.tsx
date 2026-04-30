import { useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import FormdAdd from "./FormAdd";

type Client = {
	id: number;
	name: string;
	lastname: string;
	document: string;
	birthDate: string;
	phoneNumber: string;
	email: string;
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
		document: "",
		birthDate: "",
		phoneNumber: "",
		email: "",
		createDate: "11-01-2026",
		status: "Active",
		nextPaid: "11-02-2026",
		updateDate: "11-01-2026",
	},
	{
		id: 2,
		name: "Pepe",
		lastname: "Pepito",
		document: "",
		birthDate: "",
		phoneNumber: "",
		email: "",
		createDate: "12-01-2026",
		status: "Active",
		nextPaid: "12-02-2026",
		updateDate: "12-01-2026",
	},
	{
		id: 3,
		name: "Pepito",
		lastname: "Pepito",
		document: "",
		birthDate: "",
		phoneNumber: "",
		email: "",
		createDate: "12-01-2026",
		status: "Active",
		nextPaid: "12-02-2026",
		updateDate: "12-01-2026",
	},
	{
		id: 4,
		name: "Pepa",
		lastname: "Pepito",
		document: "",
		birthDate: "",
		phoneNumber: "",
		email: "",
		createDate: "12-01-2026",
		status: "Active",
		nextPaid: "12-02-2026",
		updateDate: "12-01-2026",
	},
];

export default function Clients() {
	const { isOpen, openModal, closeModal } = useModal();

	const handleSave = () => {
		// Handle save logic here
		console.log("Saving changes...");
		closeModal();
	};

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
			<div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/3 xl:px-10 xl:py-12">
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
						Actualizar
					</button>

					<button
						onClick={openModal}
						className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
					>
						<svg
							className="fill-current"
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
								fill=""
							/>
						</svg>
						Agregar
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
			{/* Modal */}
			<Modal isOpen={isOpen} onClose={closeModal} className="max-w-175 m-4">
				<div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
					<div className="px-2 pr-14">
						<h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
							Agregar Registro
						</h4>
						<p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
							Complete los campos requeridos*.
						</p>
					</div>

					<FormdAdd onClose={closeModal} onSubmit={handleSave} />
				</div>
			</Modal>
		</div>
	);
}
