import React, { useState } from "react";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";

import { clientService} from "../../service/client.service";

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
};

export default function FormAdd({ onSubmit, onClose }: Props) {
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		last_name: "",
		document: "",
		phone: "",
		birth_date: "",
		email: "",
	});

	const handleClose = () => {
		console.log("handleClose Modal");
		onClose?.();
	};

	const handleSubmit = async () => {
		setError("");

		// Validación básica
		if (!formData.email || !formData.name || !formData.last_name) {
			setError("Por favor completa todos los campos*");
			return;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			setError("Email inválido");
			return;
		}

		console.log("handleSubmit Modal");
		const resp = await clientService.create(formData);

		console.log("handleSave", resp);
		onSubmit?.();
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
						<Label>Nombre*</Label>
						<Input
							type="text"
							value={formData.name}
							name="name"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Apellido*</Label>
						<Input
							type="text"
							value={formData.last_name}
							name="last_name"
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
							value={formData.birth_date}
							name="birth_date"
							placeholder="YYYY-MM-DD"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Teléfono</Label>
						<Input
							type="text"
							value={formData.phone}
							name="phone"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Email*</Label>
						<Input
							type="text"
							value={formData.email}
							name="email"
							onChange={handleChange}
						/>
					</div>

					{error && (
						<div className="col-span-2 p-4 rounded-lg bg-error-50 dark:bg-error-500/10 border border-error-200 dark:border-error-500/20">
							<p className="text-sm text-error-600 dark:text-error-400">
								{error}
							</p>
						</div>
					)}
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
