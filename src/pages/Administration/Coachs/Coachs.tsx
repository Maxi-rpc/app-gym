import { SetStateAction, useState, useEffect } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { useModal } from "../../../hooks/useModal";

import { Lineicons } from "@lineiconshq/react-lineicons";
import {
	PlusOutlined,
	RefreshCircle1ClockwiseOutlined,
} from "@lineiconshq/free-icons";

import { Coach } from "./types/Coach";
import { employeeService } from "../../../service/employee.service";

import DataTable from "./DataTable";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";

export default function Coachs() {
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
	const [selectData, setSelectData] = useState<Coach | null>(null);
	const [listData, setListData] = useState<Coach[] | []>([]);

	const getData = async () => {
		console.log("Coachs - getData");
		try {
			const data = await employeeService.getAll();
			setListData(data);
		} catch (error) {
			console.error("Error getData", error);
		}
	};

	const handleUpdate = () => {
		// Handle save logic here
		console.log("Updating changes...");
		closeModalEdit();
		getData();
	};

	const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
		setSearchText(e.target.value);
		console.log("handleSearch", searchText);
	};

	const handleSave = () => {
		// Handle save logic here
		console.log("Saving changes...");
		closeModalAdd();
		getData();
	};

	const handleEdit = (Coach: Coach) => {
		setSelectData(Coach);
		openModalEdit();
	};

	const handleDeleteItem = () => {
		// Handle save logic here
		console.log("Delete item...");
		closeModalDelete();
		getData();
	};

	const handleDelete = (Coach: Coach) => {
		setSelectData(Coach);
		openModalDelete();
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<PageMeta
				title="App Gym - Administration Coach"
				description="Panel de administracion para Coaches"
			/>
			<PageBreadcrumb pageTitle="Coachs" />
			<div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/3 xl:px-10 xl:py-12">
				<div className="mx-auto w-full text-center mb-8">
					<h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
						Listado de Profesores
					</h3>

					<p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
						Se muestran los profesores registrados hasta la fecha actual.
					</p>
				</div>

				{/* Search */}
				<div className="flex justify-between items-end gap-4 max-sm:px-4 mb-3">
					<div className="space-y-6 flex-1">
						<Label htmlFor="inputTwo">Buscar Profesor</Label>
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
							<Lineicons
								icon={RefreshCircle1ClockwiseOutlined}
								size={20}
								color="grey"
							/>
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
				<DataTable
					listData={listData}
					searchText={searchText}
					onEdit={handleEdit}
					onDelet={handleDelete}
				/>
			</div>

			{/* Modal Add */}
			<ModalAdd
				isOpen={isOpenAdd}
				onClose={closeModalAdd}
				onSubmit={handleSave}
			/>

			{/* Modal Edit */}
			<ModalEdit
				isOpen={isOpenEdit}
				onClose={closeModalEdit}
				onSubmit={handleUpdate}
				defaultData={selectData}
			/>

			{/* Modal Delete */}
			<ModalDelete
				isOpen={isOpenDelete}
				onClose={closeModalDelete}
				onSubmit={handleDeleteItem}
				defaultData={selectData}
			/>
		</div>
	);
}
