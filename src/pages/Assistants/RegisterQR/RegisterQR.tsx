import { SetStateAction, useState, useEffect } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Alert from "../../../components/ui/alert/Alert";
import { Feedback } from "../../../components/ui/alert/types/AlertFeedback";
import { useModal } from "../../../hooks/useModal";

import { Lineicons } from "@lineiconshq/react-lineicons";
import { RefreshCircle1ClockwiseOutlined } from "@lineiconshq/free-icons";

import { ClientAssistant } from "../../../service/types/ClientAssistant";
import { attendanceService } from "../../../service/attendance.service";

import ButtonQr from "./ButtonQr";
import DataTable from "./DataTable";
import ModalEdit from "./modals/ModalEdit";
import ModalDelete from "./modals/ModalDelete";

export default function Register() {
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [isLoading, setIsLoading] = useState(false);

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
	const [selectData, setSelectData] = useState<ClientAssistant | null>(null);
	const [listData, setListData] = useState<ClientAssistant[] | []>([]);

	const getData = async () => {
		try {
			setFeedback(null);
			setIsLoading(true);

			const resp = await attendanceService.getAll();
			if (resp.error) throw resp.error;

			setListData(resp.data);
		} catch (error) {
			console.error("Error No se puede obtener datos", error);

			setFeedback({
				variant: "error",
				title: "No se puede obtener datos",
				message:
					"Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleUpdate = () => {
		closeModalEdit();
		getData();
	};

	const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
		setSearchText(e.target.value);
	};

	const handleSave = async (qrValue: string) => {
		try {
			setFeedback(null);

			const date_to_string = new Date().toISOString();

			const body = {
				qr_token: qrValue,
				check_in_at: date_to_string,
				check_out_at: null,
			};

			const resp = await attendanceService.register(body);
			if (resp.error) throw resp.error;
		} catch (error) {
			console.error("Error No se puede obtener datos", error);

			setFeedback({
				variant: "error",
				title: "No se puede obtener datos",
				message:
					"Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.",
			});
		}
		getData();
	};

	const handleEdit = (client: ClientAssistant) => {
		setSelectData(client);
		openModalEdit();
	};

	const handleDeleteItem = () => {
		closeModalDelete();
		getData();
	};

	const handleDelete = (client: ClientAssistant) => {
		setSelectData(client);
		openModalDelete();
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<PageMeta
				title="App Gym - Administration Asistencias"
				description="Panel de administracion para Asistencias"
			/>
			<PageBreadcrumb pageTitle="Asistencias" />
			<div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/3 xl:px-10 xl:py-12">
				<div className="mx-auto w-full text-center mb-8">
					<h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
						Listado de Asistencias
					</h3>

					<p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
						Se muestran las asistencias registrados del día de hoy.
					</p>

					{feedback && (
						<div className="my-4 text-start">
							<Alert
								variant={feedback?.variant}
								title={feedback?.title}
								message={feedback?.message}
							/>
						</div>
					)}
				</div>

				<div className="mx-auto w-full text-center mb-8">
					<ButtonQr onRegister={handleSave} onRegistered={getData} />
				</div>

				{/* Search */}
				<div className="flex flex-col md:flex-row justify-between md:items-end gap-4 max-sm:px-4 mb-3">
					<div className="space-y-6 flex-1">
						<Label htmlFor="inputTwo">Buscar Cliente</Label>
						<Input
							type="text"
							id="inputTwo"
							placeholder="nombre o apellido"
							value={searchText}
							onChange={handleSearch}
						/>
					</div>

					<Button
						size="sm"
						variant="outline"
						onClick={getData}
						disabled={isLoading}
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
				</div>

				{/* Data Table */}
				<DataTable
					listData={listData}
					searchText={searchText}
					onEdit={handleEdit}
					onDelet={handleDelete}
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
		</div>
	);
}
