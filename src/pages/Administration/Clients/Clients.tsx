import { SetStateAction, useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";

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
	};

	const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
		setSearchText(e.target.value);
		console.log("handleSearch", searchText);
	};

	const handleSave = () => {
		// Handle save logic here
		console.log("Saving changes...");
		closeModalAdd();
	};

	const handleEdit = (client: Client) => {
		setSelectData(client);
		openModalEdit();
	};

	const handleDeleteItem = () => {
		// Handle save logic here
		console.log("Delete item...");
		closeModalDelete();
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

					<Button size="sm" variant="outline" onClick={getData}>
						Actualizar
					</Button>
					<Button size="sm" onClick={openModalAdd}>
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
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M19.3028 3.7801C18.4241 2.90142 16.9995 2.90142 16.1208 3.7801L14.3498 5.5511C14.3442 5.55633 14.3387 5.56166 14.3333 5.5671C14.3279 5.57253 14.3225 5.57803 14.3173 5.58359L5.83373 14.0672C5.57259 14.3283 5.37974 14.6497 5.27221 15.003L4.05205 19.0121C3.9714 19.2771 4.04336 19.565 4.23922 19.7608C4.43508 19.9567 4.72294 20.0287 4.98792 19.948L8.99703 18.7279C9.35035 18.6203 9.67176 18.4275 9.93291 18.1663L20.22 7.87928C21.0986 7.0006 21.0986 5.57598 20.22 4.6973L19.3028 3.7801ZM14.8639 7.15833L6.89439 15.1278C6.80735 15.2149 6.74306 15.322 6.70722 15.4398L5.8965 18.1036L8.56029 17.2928C8.67806 17.257 8.7852 17.1927 8.87225 17.1057L16.8417 9.13619L14.8639 7.15833ZM17.9024 8.07553L19.1593 6.81862C19.4522 6.52572 19.4522 6.05085 19.1593 5.75796L18.2421 4.84076C17.9492 4.54787 17.4743 4.54787 17.1814 4.84076L15.9245 6.09767L17.9024 8.07553Z"
														fill="#323544"
													/>
												</svg>
											</button>

											<button
												onClick={() => handleDelete(client)}
												className="text-red-500 hover:text-red-700 dark:hover:text-red-300 transition-colors"
												title="Eliminar"
											>
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M14.7223 12.7585C14.7426 12.3448 14.4237 11.9929 14.01 11.9726C13.5963 11.9522 13.2444 12.2711 13.2241 12.6848L12.9999 17.2415C12.9796 17.6552 13.2985 18.0071 13.7122 18.0274C14.1259 18.0478 14.4778 17.7289 14.4981 17.3152L14.7223 12.7585Z"
														fill="#323544"
													/>
													<path
														d="M9.98802 11.9726C9.5743 11.9929 9.25542 12.3448 9.27577 12.7585L9.49993 17.3152C9.52028 17.7289 9.87216 18.0478 10.2859 18.0274C10.6996 18.0071 11.0185 17.6552 10.9981 17.2415L10.774 12.6848C10.7536 12.2711 10.4017 11.9522 9.98802 11.9726Z"
														fill="#323544"
													/>
													<path
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M10.249 2C9.00638 2 7.99902 3.00736 7.99902 4.25V5H5.5C4.25736 5 3.25 6.00736 3.25 7.25C3.25 8.28958 3.95503 9.16449 4.91303 9.42267L5.54076 19.8848C5.61205 21.0729 6.59642 22 7.78672 22H16.2113C17.4016 22 18.386 21.0729 18.4573 19.8848L19.085 9.42267C20.043 9.16449 20.748 8.28958 20.748 7.25C20.748 6.00736 19.7407 5 18.498 5H15.999V4.25C15.999 3.00736 14.9917 2 13.749 2H10.249ZM14.499 5V4.25C14.499 3.83579 14.1632 3.5 13.749 3.5H10.249C9.83481 3.5 9.49902 3.83579 9.49902 4.25V5H14.499ZM5.5 6.5C5.08579 6.5 4.75 6.83579 4.75 7.25C4.75 7.66421 5.08579 8 5.5 8H18.498C18.9123 8 19.248 7.66421 19.248 7.25C19.248 6.83579 18.9123 6.5 18.498 6.5H5.5ZM6.42037 9.5H17.5777L16.96 19.7949C16.9362 20.191 16.6081 20.5 16.2113 20.5H7.78672C7.38995 20.5 7.06183 20.191 7.03807 19.7949L6.42037 9.5Z"
														fill="#323544"
													/>
												</svg>
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
							Eliminar Registro
						</h4>
						<p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
							Complete los campos requeridos*.
						</p>
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
