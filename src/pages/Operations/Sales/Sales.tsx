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

import { Product, Sale, SaleTableRow } from "./types/Product";

import DataTable from "./DataTable";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import ModalDetail from "./ModalDetail";

// mock
const salesExample: Sale[] = [
	{
		id: 1,
		saleDate: "2026-07-09",

		status: "active",

		totalAmount: 1600,
		totalCost: 1000,
		totalProfit: 600,

		notes: "Venta manual de caja",

		items: [
			{
				id: 1,
				saleId: 1,
				productId: 1,

				productName: "Agua 500ml",
				productImage: "/images/products/agua-500ml.png",

				quantity: 2,

				costUnitAtSale: 500,
				priceUnitAtSale: 800,

				subtotal: 1600,
				profitUnit: 300,
				profitTotal: 600,
			},
		],

		createdAt: "2026-07-09T11:30:00.000Z",
		updatedAt: "2026-07-09T11:30:00.000Z",
	},
	{
		id: 2,
		saleDate: "2026-07-10",

		status: "active",

		totalAmount: 2900,
		totalCost: 1900,
		totalProfit: 1000,

		notes: "Venta manual con varios productos",

		items: [
			{
				id: 2,
				saleId: 2,
				productId: 1,

				productName: "Agua 500ml",
				productImage: "/images/products/agua-500ml.png",

				quantity: 3,

				costUnitAtSale: 600,
				priceUnitAtSale: 900,

				subtotal: 2700,
				profitUnit: 300,
				profitTotal: 900,
			},
			{
				id: 3,
				saleId: 2,
				productId: 2,

				productName: "Chicle",
				productImage: "/images/products/chicle.png",

				quantity: 1,

				costUnitAtSale: 100,
				priceUnitAtSale: 200,

				subtotal: 200,
				profitUnit: 100,
				profitTotal: 100,
			},
		],

		createdAt: "2026-07-10T12:15:00.000Z",
		updatedAt: "2026-07-10T12:15:00.000Z",
	},
];

const saleTableRowsExample: SaleTableRow[] = [
	{
		id: 1,
		saleDate: "2026-07-09",

		status: "active",

		productsPreview: [
			{
				productId: 1,
				productName: "Agua 500ml",
				productImage: "/images/products/agua-500ml.png",
				quantity: 2,
			},
		],

		itemsCount: 1,
		totalQuantity: 2,

		totalAmount: 1600,
		totalCost: 1000,
		totalProfit: 600,

		notes: "Venta manual de caja",

		createdAt: "2026-07-09T11:30:00.000Z",
	},
	{
		id: 2,
		saleDate: "2026-07-10",

		status: "active",

		productsPreview: [
			{
				productId: 1,
				productName: "Agua 500ml",
				productImage: "/images/products/agua-500ml.png",
				quantity: 3,
			},
			{
				productId: 2,
				productName: "Chicle",
				productImage: "/images/products/chicle.png",
				quantity: 1,
			},
		],

		itemsCount: 2,
		totalQuantity: 4,

		totalAmount: 2900,
		totalCost: 1900,
		totalProfit: 1000,

		notes: "Venta manual con varios productos",

		createdAt: "2026-07-10T12:15:00.000Z",
	},
];

export default function Sales() {
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

	const {
		isOpen: isOpenDetail,
		openModal: openModalDetail,
		closeModal: closeModalDetail,
	} = useModal();

	const [searchText, setSearchText] = useState("");
	const [selectData, setSelectData] = useState<SaleTableRow | null>(null);
	const [listData, setListData] = useState<SaleTableRow[] | []>([]);

	const getData = () => {
		console.log("Sales - getData");
		setListData(saleTableRowsExample);
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

	const handleEdit = (item: SaleTableRow) => {
		setSelectData(item);
		openModalEdit();
	};

	const handleDeleteItem = () => {
		// Handle save logic here
		console.log("Delete item...");
		closeModalDelete();
		getData();
	};

	const handleDelete = (item: SaleTableRow) => {
		setSelectData(item);
		openModalDelete();
	};

	const handleDetail = (item: SaleTableRow) => {
		setSelectData(item);
		openModalDetail();
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<PageMeta
				title="App Gym - Administration Productos"
				description="Panel de administracion para Productos"
			/>
			<PageBreadcrumb pageTitle="Productos" />
			<div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/3 xl:px-10 xl:py-12">
				<div className="mx-auto w-full text-center mb-8">
					<h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
						Listado de Productos Vendidos.
					</h3>

					<p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
						Se muestran los productos registrados del día de hoy.
					</p>
				</div>

				{/* Search */}
				<div className="flex justify-between items-end gap-4 max-sm:px-4 mb-3">
					<div className="space-y-6 flex-1">
						<Label htmlFor="inputTwo">Buscar Producto</Label>
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

			{/* Modal Delete */}
			<ModalDetail
				isOpen={isOpenDetail}
				onClose={closeModalDetail}
				onSubmit={handleUpdate}
				defaultData={selectData}
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
