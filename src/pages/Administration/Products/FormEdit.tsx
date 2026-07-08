import React, { useState } from "react";

import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import Button from "../../../components/ui/button/Button";

import { Product } from "./types/Product";

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
	defaultData: Product | null;
};

export default function FormEdit({ onSubmit, onClose, defaultData }: Props) {
	const [formData, setFormData] = useState({
		id: defaultData?.id,
		name: defaultData?.name,
		variants: defaultData?.variants,
		category: defaultData?.category,
		cost: defaultData?.cost,
		price: defaultData?.price,
		amount: defaultData?.amount,
		status: defaultData?.status,
		image: defaultData?.image,
		createDate: defaultData?.createDate,
		updateDate: defaultData?.updateDate,
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
		{ value: "activo", label: "Activo" },
		{ value: "inactivo", label: "Inactivo" },
	];

	const optionsCategory = [
		{ value: "golosina", label: "Golosina" },
		{ value: "bebida", label: "Bebida" },
	];

	const handleSelectChange = (value: string) => {
		console.log("Selected value:", value);
		setFormData({
			...formData,
			status: value,
		});
	};

	const handleSelectCategoryChange = (value: string) => {
		console.log("Category Selected value:", value);
		setFormData({
			...formData,
			category: value,
		});
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
						<Label>Nombre</Label>
						<Input
							type="text"
							value={formData.name}
							name="name"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Variante</Label>
						<Input
							type="text"
							value={formData.variants}
							name="lastname"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Categoría</Label>
						<Select
							options={optionsCategory}
							placeholder="Seleccionar Categoría"
							onChange={handleSelectCategoryChange}
							className="dark:bg-dark-900"
							defaultValue={formData.category}
						/>
					</div>

					<div>
						<Label>Costo</Label>
						<Input
							type="text"
							value={formData.cost}
							name="cost"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Precio de Venta</Label>
						<Input
							type="text"
							value={formData.price}
							name="price"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Cantidad</Label>
						<Input
							type="text"
							value={formData.amount}
							name="amount"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Estado</Label>
						<Select
							options={options}
							placeholder="Seleccionar Estado"
							onChange={handleSelectChange}
							className="dark:bg-dark-900"
							defaultValue={formData.status}
						/>
					</div>

					<div>
						<Label>Imagen</Label>
						<Input
							type="text"
							value={formData.image}
							name="image"
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
