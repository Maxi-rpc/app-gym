import React, { useState } from "react";

import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import Button from "../../../components/ui/button/Button";

type Props = {
	onSubmit?: (qrValue: string) => Promise<void>;
	onClose?: () => void;
};

export default function FormAdd({ onSubmit, onClose }: Props) {
	const [formData, setFormData] = useState({
		name: "",
		lastname: "",
		document: "",
		birthDate: "",
		phoneNumber: "",
		email: "",
		status: "",
		qrValue: "",
	});

	const handleClose = () => {
		onClose?.();
	};

	const handleSubmit = async () => {
		onSubmit?.(formData.qrValue);
	};

	const options = [
		{ value: "activo", label: "Activo" },
		{ value: "inactivo", label: "Inactivo" },
	];

	const handleSelectChange = (value: string) => {
		console.log("Selected value:", value);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<form className="flex flex-col">
			<div className="custom-scrollbar overflow-y-auto px-2 pb-3">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
					<div className="col-span-2 md:col-span-1">
						<Label>QR</Label>
						<Input
							type="text"
							value={formData.qrValue}
							name="qrValue"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Nombre</Label>
						<Input
							type="text"
							value={formData.name}
							name="name"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Apellido</Label>
						<Input
							type="text"
							value={formData.lastname}
							name="lastname"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Documento</Label>
						<Input
							type="text"
							value={formData.document}
							name="document"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Fecha de Nacimiento</Label>
						<Input
							type="text"
							value={formData.birthDate}
							name="birthDate"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Teléfono</Label>
						<Input
							type="text"
							value={formData.phoneNumber}
							name="phoneNumber"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Email</Label>
						<Input
							type="text"
							value={formData.email}
							name="email"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Estado</Label>
						<Select
							options={options}
							placeholder="Seleccionar Estado"
							onChange={handleSelectChange}
							className="dark:bg-dark-900"
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
