import React, { useState } from "react";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import Alert from "../../components/ui/alert/Alert";
import { Feedback } from "../../components/ui/alert/types/AlertFeedback";

import { clientService } from "../../service/client.service";

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
};

export default function FormAdd({ onSubmit, onClose }: Props) {
	const [feedback, setFeedback] = useState<Feedback>(null);

	const [formData, setFormData] = useState({
		email: "",
		name: "",
		last_name: "",
		document: "",
		phone: "",
		image: "",
		birth_date: "",
		height: 0, // client
		weight: 0,
		emergency_contact: "",
		medical_notes: "",
	});

	const handleClose = () => {
		setFeedback(null);
		onClose?.();
	};

	const handleSubmit = async () => {
		try {
			setFeedback(null);
			// Validación básica
			if (!formData.email || !formData.name || !formData.last_name) {
				setFeedback({
					variant: "info",
					title: "Por favor completa todos los campos*",
					message: "",
				});
				return;
			}

			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
				setFeedback({
					variant: "warning",
					title: "Verificar el campo email.",
					message: "Email inválido.",
				});
				return;
			}

			const resp = await clientService.create(formData);
			if (resp.error) {
				throw resp.error;
			}

			setFeedback({
				variant: "success",
				title: "Cliente creado.",
				message: resp?.data?.message,
			});

			onSubmit?.();
		} catch (error) {
			console.error("Error al crear cliente:", error);

			setFeedback({
				variant: "error",
				title: "No se puede crear cliente",
				message:
					"Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.",
			});
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<form className="flex flex-col">
			<div className="px-2 overflow-y-auto custom-scrollbar">
				<div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-2">
					{feedback && (
						<div className="col-span-2 text-start">
							<Alert
								variant={feedback?.variant}
								title={feedback?.title}
								message={feedback?.message}
							/>
						</div>
					)}
					<div className="col-span-2">
						<p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
							Completar los campos para el perfil.
						</p>
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
						<Label>Teléfono</Label>
						<Input
							type="text"
							value={formData.phone}
							name="phone"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Fecha de Nacimiento</Label>
						<Input
							type="date"
							value={formData.birth_date}
							name="birth_date"
							placeholder="YYYY-MM-DD"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2">
						<p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
							Campos opcionales.
						</p>
					</div>

					<div>
						<Label>Altura (cm)</Label>
						<Input
							type="number"
							value={formData.height}
							name="height"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Peso (kg)</Label>
						<Input
							type="number"
							value={formData.weight}
							name="weight"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Contacto de Emergencia</Label>
						<Input
							type="text"
							value={formData.emergency_contact}
							name="emergency_contact"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Notas Médicas</Label>
						<Input
							type="text"
							value={formData.medical_notes}
							name="medical_notes"
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
