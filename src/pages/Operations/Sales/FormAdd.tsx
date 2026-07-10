import React, { useState } from "react";

import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Select from "../../../components/form/Select";
import Button from "../../../components/ui/button/Button";

import { Product, Sale, SaleTableRow } from "./types/Product";

const productsExample: Product[] = [
	{
		id: 1,
		name: "Agua 500ml",
		image:
			"https://static.cotodigital3.com.ar/sitios/fotos/mini/00623200/00623215.jpgg",

		currentCost: 600,
		currentSalePrice: 900,

		status: "active",

		createdAt: "2026-07-09T10:00:00.000Z",
		updatedAt: "2026-07-10T09:00:00.000Z",
	},
	{
		id: 2,
		name: "Agua 1500ml",
		image:
			"https://static.cotodigital3.com.ar/sitios/fotos/large/00582600/00582627.jpg",

		currentCost: 1000,
		currentSalePrice: 1300,

		status: "active",

		createdAt: "2026-07-09T10:10:00.000Z",
		updatedAt: "2026-07-09T10:10:00.000Z",
	},
	{
		id: 3,
		name: "Chicle Topline",
		image:
			"https://static.cotodigital3.com.ar/sitios/fotos/mini/00243600/00243610.jpg",

		currentCost: 100,
		currentSalePrice: 200,

		status: "active",

		createdAt: "2026-07-09T10:10:00.000Z",
		updatedAt: "2026-07-09T10:10:00.000Z",
	},
];

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
};

export default function FormAdd({ onSubmit, onClose }: Props) {
	const [formData, setFormData] = useState({
		saleDate: "",
		notes: "",
		items: [],
	});
	const handleClose = () => {
		console.log("handleClose Modal");
		onClose?.();
	};

	const handleSubmit = () => {
		console.log("handleSubmit Modal");
		onSubmit?.();
	};

	const options = [
		{ value: "1", label: "Agua 500ml" },
		{ value: "2", label: "Agua 1500ml" },
		{ value: "3", label: "Chicle Topline" },
	];

	const handleSelectChange = (value: string) => {
		console.log("Selected value:", value);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
		console.log(name, value);
	};

	return (
		<form className="flex flex-col">
			<div className="px-2 overflow-y-auto custom-scrollbar">
				<div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-2">
					<div>
						<Label>Fecha</Label>
						<Input
							type="text"
							value={formData.saleDate}
							name="name"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Nota</Label>
						<TextArea
							value={formData.notes}
							placeholder="Ingresar Nota"
							onChange={(value) =>
								setFormData({
									...formData,
									notes: value,
								})
							}
							rows={6}
						/>
					</div>

					<div>
						<Label>Seleccionar Items</Label>
						<Select
							options={options}
							placeholder="Seleccionar Item"
							onChange={handleSelectChange}
							className="dark:bg-dark-900"
						/>
					</div>

					<div>
						<Label>Cantidad</Label>
						<Input
							type="text"
							value={formData.document}
							name="document"
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-3 px-2 mt-6 justify-end">
				<Button size="sm" variant="outline" onClick={handleClose}>
					Cerrar
				</Button>
				<Button size="sm" onClick={handleSubmit}>
					Guardar
				</Button>
			</div>
		</form>
	);
}
