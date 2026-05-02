import { SetStateAction, useState, useEffect } from "react";

import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import { useModal } from "../../../../hooks/useModal";

import { Lineicons } from "@lineiconshq/react-lineicons";
import { RefreshCircle1ClockwiseOutlined } from "@lineiconshq/free-icons";

import { Pay } from "../types/Pay";

import DataTable from "./DataTable";
import ModalDelete from "./ModalDelete";

const mockData: Pay[] = [
	{
		id: 1,
		clientid: 1,
		email: "pepe@test.com",
		createDate: "11-01-2026",
		endDate: "11-01-2026",
		status: "Activo",
		updateDate: "11-01-2026",
		notes: "Abono con QR",
	},
	{
		id: 2,
		clientid: 2,
		email: "pepe2@test.com",
		createDate: "11-01-2026",
		endDate: "11-01-2026",
		status: "Activo",
		updateDate: "11-01-2026",
		notes: "Abono con Transferencia",
	},
	{
		id: 3,
		clientid: 3,
		email: "pepe3@test.com",
		createDate: "11-01-2026",
		endDate: "11-01-2026",
		status: "Activo",
		updateDate: "11-01-2026",
		notes: "Abono con Efectivo",
	},
];

export default function SectionList() {
	const {
		isOpen: isOpenDelete,
		openModal: openModalDelete,
		closeModal: closeModalDelete,
	} = useModal();

	const [searchText, setSearchText] = useState("");
	const [selectData, setSelectData] = useState<Pay | null>(null);
	const [listData, setListData] = useState<Pay[] | []>([]);

	const getData = () => {
		console.log("getData");
		setListData(mockData);
	};

	const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
		setSearchText(e.target.value);
		console.log("handleSearch", searchText);
	};

	const handleDeleteItem = () => {
		// Handle save logic here
		console.log("Delete item...");
		closeModalDelete();
		getData();
	};

	const handleDelete = (Pay: Pay) => {
		setSelectData(Pay);
		openModalDelete();
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			{/* Search */}
			<div className="flex justify-between items-end gap-4 max-sm:px-4 mb-3">
				<div className="space-y-6 flex-1">
					<Label htmlFor="inputTwo">Buscar Pago</Label>
					<Input
						type="text"
						id="inputTwo"
						placeholder="email"
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
			</div>

			{/* Data Table */}
			<DataTable
				listData={listData}
				searchText={searchText}
				onDelet={handleDelete}
			/>

			{/* Modal Delete */}
			<ModalDelete
				isOpen={isOpenDelete}
				onClose={closeModalDelete}
				onSubmit={handleDeleteItem}
				defaultData={selectData}
			/>
		</>
	);
}
