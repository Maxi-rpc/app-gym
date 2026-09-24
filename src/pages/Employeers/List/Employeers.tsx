import { SetStateAction, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import Form from "../../../components/form/Form";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Alert from "../../../components/ui/alert/Alert";
import { Feedback } from "../../../components/ui/alert/types/AlertFeedback";
import { useModal } from "../../../hooks/useModal";

import { Lineicons } from "@lineiconshq/react-lineicons";
import {
	PlusOutlined,
	RefreshCircle1ClockwiseOutlined,
} from "@lineiconshq/free-icons";

import {
	Employee,
	EmployeePageSize,
	EmployeeSortKey,
} from "../../../service/types/Employee";
import { employeeService } from "../../../service/employee.service";

import DataTable from "./DataTable";
import ModalEdit from "./modals/ModalEdit";
import ModalDelete from "./modals/ModalDelete";

export default function Employeers() {
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
	const [selectData, setSelectData] = useState<Employee | null>(null);
	const [listData, setListData] = useState<Employee[] | []>([]);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState<EmployeePageSize>(10);
	const [total, setTotal] = useState(0);
	const [sortConfig, setSortConfig] = useState<{
		key: EmployeeSortKey;
		direction: "asc" | "desc";
	}>({ key: "user_id", direction: "asc" });
	const navigate = useNavigate();

	type GetDataOptions = {
		page?: number;
		pageSize?: EmployeePageSize;
		search?: string;
		sortBy?: EmployeeSortKey;
		sortDirection?: "asc" | "desc";
	};

	const getData = async (options: GetDataOptions = {}) => {
		const requestedPage = options.page ?? page;
		const requestedPageSize = options.pageSize ?? pageSize;
		const requestedSearch = options.search ?? searchText;
		const requestedSortBy = options.sortBy ?? sortConfig.key;
		const requestedSortDirection =
			options.sortDirection ?? sortConfig.direction;

		try {
			setFeedback(null);
			setIsLoading(true);

			const resp = await employeeService.getAll({
				page: requestedPage,
				pageSize: requestedPageSize,
				search: requestedSearch.trim(),
				sortBy: requestedSortBy,
				sortDirection: requestedSortDirection,
			});

			if (resp.error) {
				throw resp.error;
			}

			setListData(resp.data ?? []);
			setTotal(resp.pagination?.total ?? 0);
		} catch (error) {
			console.error("Error al obtener employee:", error);

			setFeedback({
				variant: "error",
				title: "No se pudieron cargar los employee",
				message:
					"Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleSearchSubmit = () => {
		setPage(1);
		getData({ page: 1 });
	};

	const handlePageChange = (nextPage: number) => {
		setPage(nextPage);
		getData({ page: nextPage });
	};

	const handlePageSizeChange = (nextPageSize: EmployeePageSize) => {
		setPageSize(nextPageSize);
		setPage(1);
		getData({ page: 1, pageSize: nextPageSize });
	};

	const handleSortChange = (nextSort: {
		key: EmployeeSortKey;
		direction: "asc" | "desc";
	}) => {
		setSortConfig(nextSort);
		setPage(1);
		getData({
			page: 1,
			sortBy: nextSort.key,
			sortDirection: nextSort.direction,
		});
	};

	const handleUpdate = () => {
		closeModalEdit();
		getData();
	};

	const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
		setSearchText(e.target.value);
	};

	const handleEdit = (employee: Employee) => {
		setSelectData(employee);
		openModalEdit();
	};

	const handleDeleteItem = () => {
		closeModalDelete();
		getData();
	};

	const handleDelete = (employee: Employee) => {
		setSelectData(employee);
		openModalDelete();
	};

	const handleAdd = () => {
		navigate("/coachs/add");
	};

	const handleDetail = (employee: Employee) => {
		navigate(`/coachs/${employee?.user_id}`);
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

				{/* Search */}
				<Form
					onSubmit={handleSearchSubmit}
					className="flex flex-col md:flex-row justify-between md:items-end gap-4 max-sm:px-4 mb-3"
				>
					<div className="space-y-6 w-full">
						<Label htmlFor="searchText">Buscar Profesor</Label>
						<Input
							type="text"
							id="searchText"
							name="searchText"
							placeholder="nombre o apellido"
							value={searchText}
							onChange={handleSearch}
						/>
					</div>
					<Button type="submit" size="sm" disabled={isLoading}>
						Buscar
					</Button>

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
					<Button
						size="sm"
						onClick={handleAdd}
						startIcon={
							<Lineicons icon={PlusOutlined} size={20} color="white" />
						}
					>
						Agregar
					</Button>
				</Form>

				{/* Data Table */}
				<DataTable
					listData={listData}
					page={page}
					pageSize={pageSize}
					total={total}
					isLoading={isLoading}
					sortConfig={sortConfig}
					onPageChange={handlePageChange}
					onPageSizeChange={handlePageSizeChange}
					onSortChange={handleSortChange}
					onView={handleDetail}
					onEdit={handleEdit}
					onDelet={handleDelete}
				/>
			</div>

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
