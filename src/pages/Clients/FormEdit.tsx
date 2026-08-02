import React, { useState } from "react";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import Alert from "../../components/ui/alert/Alert";
import { Feedback } from "../../components/ui/alert/types/AlertFeedback";
import IconSpinner from "../../components/ui/button/IconSpinner";

import { Client } from "../../service/types/Client";
import { clientService } from "../../service/client.service";
import { profileService } from "../../service/profile.service";

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
	defaultData: Client | null;
};

export default function FormEdit({ onSubmit, onClose, defaultData }: Props) {
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [isLoading, setIsLoading] = useState(false);

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
		height: defaultData?.height || 0,
		weight: defaultData?.weight || 0,
		emergency_contact: defaultData?.emergency_contact || "",
		medical_notes: defaultData?.medical_notes || "",
	});

	const handleClose = () => {
		setFeedback(null);
		onSubmit?.();
		onClose?.();
	};

	const saveClient = async () => {
		try {
			const resp = await clientService.update(formData);
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
			console.error("Error al guardar datos client:", error);
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
			setIsLoading(true);

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

			const resp = await saveClient();
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
		} finally {
			setIsLoading(false);
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
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
					<div className="col-span-2">
						<p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
							Completar los campos para el perfil.
						</p>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Email*</Label>
						<Input
							type="text"
							value={formProfile.email}
							name="email"
							onChange={handleProfileChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Nombre*</Label>
						<Input
							type="text"
							value={formProfile.name}
							name="name"
							onChange={handleProfileChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Apellido*</Label>
						<Input
							type="text"
							value={formProfile.last_name}
							name="last_name"
							onChange={handleProfileChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Documento</Label>
						<Input
							type="text"
							value={formProfile.document}
							name="document"
							onChange={handleProfileChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Teléfono</Label>
						<Input
							type="text"
							value={formProfile.phone}
							name="phone"
							onChange={handleProfileChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
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

					<div className="col-span-2 md:col-span-1">
						<Label>Altura (cm)</Label>
						<Input
							type="number"
							value={formData?.height}
							name="height"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Peso (kg)</Label>
						<Input
							type="number"
							value={formData?.weight}
							name="weight"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Contacto de Emergencia</Label>
						<Input
							type="text"
							value={formData?.emergency_contact}
							name="emergency_contact"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Notas Médicas</Label>
						<Input
							type="text"
							value={formData?.medical_notes}
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
				<Button size="sm" onClick={handleSubmit} disabled={isLoading}>
					{isLoading && <IconSpinner />}
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
