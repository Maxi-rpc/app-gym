import React, { useState } from "react";

import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import Button from "../../../components/ui/button/Button";

type Props = {
	onSubmit?: () => void;
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
						<Label>Nombre</Label>
						<Input
							type="text"
							value={formData.name}
							name="name"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Apellido</Label>
						<Input
							type="text"
							value={formData.lastname}
							name="lastname"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Documento</Label>
						<Input
							type="text"
							value={formData.document}
							name="document"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Fecha de Nacimiento</Label>
						<Input
							type="text"
							value={formData.birthDate}
							name="birthDate"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Teléfono</Label>
						<Input
							type="text"
							value={formData.phoneNumber}
							name="phoneNumber"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Email</Label>
						<Input
							type="text"
							value={formData.email}
							name="email"
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
