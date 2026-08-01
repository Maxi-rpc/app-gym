import React, { useState } from "react";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import Alert from "../../components/ui/alert/Alert";
import { Feedback } from "../../components/ui/alert/types/AlertFeedback";

import { Employee } from "../../service/types/Employee";
import { employeeService } from "../../service/employee.service";
import { profileService } from "../../service/profile.service";

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
	defaultData: Employee | null;
};

export default function FormEdit({ onSubmit, onClose, defaultData }: Props) {
	const [feedback, setFeedback] = useState<Feedback>(null);

	const [formProfile, setFormProfile] = useState({
		id: defaultData?.user_id,
		email: defaultData?.profile?.email || "",
		name: defaultData?.profile?.name,
		last_name: defaultData?.profile?.last_name,
		document: defaultData?.profile?.document || "",
		phone: defaultData?.profile?.phone || "",
		birth_date: defaultData?.profile?.birth_date,
	});

	const [formData, setFormData] = useState({
		user_id: defaultData?.user_id,
		salary: defaultData?.salary ?? 0,
		hire_date: defaultData?.hire_date ?? null,
		specialist: defaultData?.specialist,
		employee_number: defaultData?.employee_number,
		observations: defaultData?.observations,
	});
	const handleClose = () => {
		onSubmit?.();
		onClose?.();
	};

	const saveEmployee = async () => {
		try {
			const resp = await employeeService.update(formData);
			if (resp.data) {
				if (!resp?.data?.success) {
					return false;
				}
			}
			if (resp.error) {
				return false;
			}
			return true;
		} catch (error) {
			console.error("Error al guardar datos coach:", error);
			return false;
		}
	};

	const saveProfile = async () => {
		try {
			const resp = await profileService.update(formProfile);
			if (resp.data) {
				if (!resp?.data?.success) {
					return false;
				}
			}
			if (resp.error) {
				return false;
			}
			return true;
		} catch (error) {
			console.error("Error al guardar datos profile:", error);
			return false;
		}
	};

	const handleSubmit = async () => {
		try {
			setFeedback(null);

			// Validación básica
			if (!formProfile.email || !formProfile.name || !formProfile.last_name) {
				setFeedback({
					variant: "info",
					title: "Por favor completa todos los campos*",
					message: "",
				});
				return;
			}

			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formProfile.email)) {
				setFeedback({
					variant: "warning",
					title: "Verificar el campo email.",
					message: "Email inválido.",
				});

				return;
			}

			const resp = await saveEmployee();
			const resp_profile = await saveProfile();

			let msg = "";
			let isOk = resp;
			isOk = resp_profile;

			if (resp && resp_profile) {
				msg = "Se actualizaron datos.";
			} else {
				msg = "Hubo un error al actualizar datos.";
			}

			setFeedback({
				variant: isOk ? "info" : "error",
				title: "Info",
				message: msg,
			});
		} catch (error) {
			console.error("Error al guardar datos:", error);

			setFeedback({
				variant: "error",
				title: "No se puede guardar datos",
				message:
					"Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.",
			});
		}
	};

	const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormProfile({
			...formProfile,
			[name]: value,
		});
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
							value={formProfile.email}
							name="email"
							onChange={handleProfileChange}
						/>
					</div>

					<div>
						<Label>Nombre*</Label>
						<Input
							type="text"
							value={formProfile.name}
							name="name"
							onChange={handleProfileChange}
						/>
					</div>

					<div>
						<Label>Apellido*</Label>
						<Input
							type="text"
							value={formProfile.last_name}
							name="last_name"
							onChange={handleProfileChange}
						/>
					</div>

					<div>
						<Label>Documento</Label>
						<Input
							type="text"
							value={formProfile.document}
							name="document"
							onChange={handleProfileChange}
						/>
					</div>

					<div>
						<Label>Teléfono</Label>
						<Input
							type="text"
							value={formProfile.phone}
							name="phone"
							onChange={handleProfileChange}
						/>
					</div>

					<div>
						<Label>Fecha de Nacimiento</Label>
						<Input
							type="date"
							value={formProfile.birth_date}
							name="birth_date"
							placeholder="YYYY-MM-DD"
							onChange={handleProfileChange}
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
							type="number"
							value={formData?.salary}
							name="salary"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Fecha de Ingreso</Label>
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
