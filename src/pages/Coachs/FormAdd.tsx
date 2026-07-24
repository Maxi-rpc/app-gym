import React, { useState } from "react";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import Alert from "../../components/ui/alert/Alert";
import { Feedback } from "../../components/ui/alert/types/AlertFeedback";

import { employeeService } from "../../service/employee.service";

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
		salary: 0, // employee
		hire_date: null,
		specialist: "",
		employee_number: "",
		observations: "",
	});

	const handleClose = () => {
		setFeedback(null);
		onSubmit?.();
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

			const resp = await employeeService.update(formData);
			if (resp.error) {
				throw resp.error;
			}

			setFeedback({
				variant: "success",
				title: "Coach creado.",
				message: resp?.data?.message,
			});
		} catch (error) {
			console.error("Error al crear coach:", error);

			setFeedback({
				variant: "error",
				title: "No se puede crear coach",
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
						<Label>Salario</Label>
						<Input
							type="text"
							value={formData.salary}
							name="salary"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Salario</Label>
						<Input
							type="date"
							value={formData?.hire_date || ""}
							name="hire_date"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Especialidad</Label>
						<Input
							type="text"
							value={formData?.specialist}
							name="specialist"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Observación</Label>
						<Input
							type="text"
							value={formData?.observations}
							name="observations"
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
			<div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-2 mt-3">
				{feedback && (
					<div className="col-span-2 text-start">
						<Alert
							variant={feedback?.variant}
							title={feedback?.title}
							message={feedback?.message}
						/>
					</div>
				)}
			</div>
		</form>
	);
}
