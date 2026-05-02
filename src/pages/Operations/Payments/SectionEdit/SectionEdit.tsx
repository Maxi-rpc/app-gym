import { useState } from "react";

import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import Alert from "../../../../components/ui/alert/Alert";

import { Lineicons } from "@lineiconshq/react-lineicons";
import { Search1Outlined } from "@lineiconshq/free-icons";

import { Pay } from "../types/Pay";

import FormEdit from "./FormEdit";

export default function SectionEdit() {
	const [formData, setFormData] = useState({ id: "" });
	const [error, setError] = useState({
		isError: false,
		msg: "El campo no puede estar vacío.",
	});

	const [searchData, setSearchData] = useState<Pay | null>(null);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
		console.log(name, value);
	};

	const handleSearch = () => {
		console.log("handleSearch", formData);
		if (!formData.id) {
			setError({
				...error,
				isError: true,
			});
		} else {
			setError({
				...error,
				isError: false,
			});
			setSearchData({
				id: 1,
				clientid: 1,
				email: "pepe@test.com",
				createDate: "11-01-2026",
				endDate: "11-01-2026",
				status: "Activo",
				updateDate: "11-01-2026",
				notes: "Abono con QR",
			});
		}
	};

	return (
		<>
			{/* Search */}
			<div className="flex justify-between items-end gap-4 max-sm:px-4 mb-3">
				<div className="space-y-6 flex-1">
					<Label htmlFor="inputTwo">Buscar Pago</Label>
					<Input
						type="text"
						id="inputTwo"
						placeholder="id*"
						value={formData.id}
						onChange={handleChange}
						name="id"
					/>
				</div>

				<Button
					size="sm"
					variant="outline"
					onClick={handleSearch}
					startIcon={
						<Lineicons icon={Search1Outlined} size={20} color="grey" />
					}
				>
					Buscar
				</Button>
			</div>
			<div>
				{error.isError && (
					<Alert
						variant="warning"
						title="Advertencia"
						message={error.msg}
					/>
				)}
			</div>

			<div className="my-3"></div>

			<FormEdit defaultData={searchData} />
		</>
	);
}
