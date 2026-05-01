import { SetStateAction, useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";

import { Lineicons } from "@lineiconshq/react-lineicons";
import {
	Trash3Outlined,
	Pencil1Outlined,
	PlusOutlined,
	RefreshCircle1ClockwiseOutlined,
} from "@lineiconshq/free-icons";

import FormdAdd from "./FormAdd";
import FormEdit from "./FormEdit";
import FormDelete from "./FormDelete";

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
		document: "33333",
		birthDate: "",
		phoneNumber: "",
		email: "pepe@test.com",
		createDate: "11-01-2026",
		status: "Activo",
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
		email: "pepe@test.com",
		createDate: "12-01-2026",
		status: "Activo",
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
		email: "pepe@test.com",
		createDate: "12-01-2026",
		status: "Activo",
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
		email: "pepe@test.com",
		createDate: "12-01-2026",
		status: "Activo",
		nextPaid: "12-02-2026",
		updateDate: "12-01-2026",
	},
];

export default function Clients() {
	const {
		isOpen: isOpenAdd,
		openModal: openModalAdd,
		closeModal: closeModalAdd,
	} = useModal();

	const {
		isOpen: isOpenEdit,
		openModal: openModalEdit,
		closeModal: closeModalEdit,
	} = useModal();

	const {
		isOpen: isOpenDelete,
		openModal: openModalDelete,
		closeModal: closeModalDelete,
	} = useModal();

	const [searchText, setSearchText] = useState("");
	const [selectData, setSelectData] = useState<Client | null>(null);

	const getData = () => {
		console.log("getData");
	};

	const handleUpdate = () => {
		// Handle save logic here
		console.log("Updating changes...");
		closeModalEdit();
		getData()
	};

	const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
		setSearchText(e.target.value);
		console.log("handleSearch", searchText);
	};

	const handleSave = () => {
		// Handle save logic here
		console.log("Saving changes...");
		closeModalAdd();
		getData()
	};

	const handleEdit = (client: Client) => {
		setSelectData(client);
		openModalEdit();
	};

	const handleDeleteItem = () => {
		// Handle save logic here
		console.log("Delete item...");
		closeModalDelete();
		getData()
	};

	const handleDelete = (client: Client) => {
		setSelectData(client);
		openModalDelete();
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

	const filterData = (listData: Client[]) => {
		if (!searchText.trim()) {
			return listData;
		}

		const searchLower = searchText.toLowerCase();

		return listData.filter((client) => {
			const nameMatch = client.name.toLowerCase().includes(searchLower);
			const lastnameMatch = client.lastname.toLowerCase().includes(searchLower);

			return nameMatch || lastnameMatch;
		});
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

				{/* Search */}
				<div className="flex justify-between items-end gap-4 max-sm:px-4 mb-2">
					<div className="space-y-6 flex-1">
						<Label htmlFor="inputTwo">Buscar Cliente</Label>
						<Input
							type="text"
							id="inputTwo"
							placeholder="nombre o appelido"
							value={searchText}
							onChange={handleSearch}
						/>
					</div>

					<Button
						size="sm"
						variant="outline"
						onClick={getData}
						startIcon={
							<Lineicons icon={RefreshCircle1ClockwiseOutlined} size={20} color="grey" />
						}
					>
						Actualizar
					</Button>
					<Button
						size="sm"
						onClick={openModalAdd}
						startIcon={
							<Lineicons icon={PlusOutlined} size={20} color="white" />
						}
					>
						Agregar
					</Button>
				</div>

				{/* Data Table */}
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
									<td className="px-4 py-3 text-sm">
										<div className="flex gap-2">
											<button
												onClick={() => handleEdit(client)}
												className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
												title="Editar"
											>
												<Lineicons
													icon={Pencil1Outlined}
													size={20}
													color="blue"
												/>
											</button>

											<button
												onClick={() => handleDelete(client)}
												className="text-red-500 hover:text-red-700 dark:hover:text-red-300 transition-colors"
												title="Eliminar"
											>
												<Lineicons
													icon={Trash3Outlined}
													size={20}
													color="red"
												/>
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal Add */}
			<Modal
				isOpen={isOpenAdd}
				onClose={closeModalAdd}
				className="max-w-175 m-4"
			>
				<div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
					<div className="px-2 pr-14">
						<h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
							Agregar Registro
						</h4>
						<p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
							Complete los campos requeridos*.
						</p>
					</div>

					<FormdAdd onClose={closeModalAdd} onSubmit={handleSave} />
				</div>
			</Modal>

			{/* Modal Edit */}
			<Modal
				isOpen={isOpenEdit}
				onClose={closeModalEdit}
				className="max-w-175 m-4"
			>
				<div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
					<div className="px-2 pr-14">
						<h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
							Editar Registro
						</h4>
						<p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
							Complete los campos requeridos*.
						</p>
					</div>

					<FormEdit
						onClose={closeModalEdit}
						onSubmit={handleUpdate}
						defaultData={selectData}
					/>
				</div>
			</Modal>

			{/* Modal Delete */}
			<Modal
				isOpen={isOpenDelete}
				onClose={closeModalDelete}
				className="max-w-175 m-4"
			>
				<div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
					<div className="px-2 pr-14">
						<h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
							Eliminar Registro: {selectData?.name} {selectData?.lastname}
						</h4>
					</div>

					<FormDelete
						onClose={closeModalDelete}
						onSubmit={handleDeleteItem}
						deleteText={selectData?.email}
					/>
				</div>
			</Modal>
		</div>
	);
}
