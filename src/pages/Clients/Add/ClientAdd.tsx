import { useState } from "react";

import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import Form from "../../../components/form/Form";
import Label from "../../../components/form/Label";
import InputField from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Alert from "../../../components/ui/alert/Alert";
import { Feedback } from "../../../components/ui/alert/types/AlertFeedback";
import IconSpinner from "../../../components/ui/button/IconSpinner";

import { clientService } from "../../../service/client.service";

export default function ClientAdd() {
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		email: "",
		name: "",
		last_name: "",
		document: "",
		phone: "",
		image: "",
		birth_date: null,
		height: 0, // client
		weight: 0,
		emergency_contact: "",
		medical_notes: "",
	});

	const handleClose = () => {
		setFeedback(null);
	};

	const handleSubmit = async () => {
		try {
			setFeedback(null);
			setIsLoading(true);

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
		} catch (error) {
			console.error("Error al crear cliente:", error);

			setFeedback({
				variant: "error",
				title: "No se puede crear cliente",
				message:
					"Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div>
			<PageMeta
				title="App Gym - Administration Client"
				description="Panel de administracion para clientes"
			/>
			<PageBreadcrumb pageTitle="Clients" />
			<div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
				<div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
					<h2 className="text-xl font-medium text-gray-800 dark:text-white">
						Registrar
					</h2>
				</div>
				<div className="border-gray-200 p-4 sm:p-8 dark:border-gray-800">
					<Form onSubmit={handleSubmit}>
						<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
							{feedback && (
								<div className="col-span-2">
									<Alert
										variant={feedback?.variant}
										title={feedback?.title}
										message={feedback?.message}
									/>
								</div>
							)}

							<div className="col-span-2 md:col-span-1">
								<Label htmlFor="email">Email*</Label>
								<InputField
									type="text"
									value={formData.email}
									name="email"
									id="email"
									onChange={handleChange}
									hint="Error"
									error={false}
								/>
							</div>

							<div className="col-span-2 md:col-span-1">
								<Label htmlFor="name">Nombre*</Label>
								<InputField
									type="text"
									value={formData.name}
									name="name"
									id="name"
									onChange={handleChange}
								/>
							</div>

							<div className="col-span-2 md:col-span-1">
								<Label htmlFor="last_name">Apellido*</Label>
								<InputField
									type="text"
									value={formData.last_name}
									name="last_name"
									id="last_name"
									onChange={handleChange}
								/>
							</div>

							<div className="col-span-2 md:col-span-1">
								<Label htmlFor="document">Documento</Label>
								<InputField
									type="text"
									value={formData.document}
									name="document"
									id="document"
									onChange={handleChange}
								/>
							</div>

							<div className="col-span-2 md:col-span-1">
								<Label htmlFor="phone">Teléfono</Label>
								<InputField
									type="text"
									value={formData.phone}
									name="phone"
									id="phone"
									onChange={handleChange}
								/>
							</div>

							<div className="col-span-2 md:col-span-1">
								<Label>Fecha de Nacimiento</Label>
								<InputField
									type="date"
									value={formData?.birth_date || ""}
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

							<div className="col-span-2 md:col-span-1">
								<Label htmlFor="height">Altura (cm)</Label>
								<InputField
									type="number"
									value={formData.height}
									name="height"
									id="height"
									onChange={handleChange}
								/>
							</div>

							<div className="col-span-2 md:col-span-1">
								<Label htmlFor="weight">Peso (kg)</Label>
								<InputField
									type="number"
									value={formData.weight}
									name="weight"
									id="weight"
									onChange={handleChange}
								/>
							</div>

							<div className="col-span-2 md:col-span-1">
								<Label htmlFor="emergency_contact">
									Contacto de Emergencia
								</Label>
								<InputField
									type="text"
									value={formData.emergency_contact}
									name="emergency_contact"
									id="emergency_contact"
									onChange={handleChange}
								/>
							</div>

							<div className="col-span-2 md:col-span-1">
								<Label htmlFor="medical_notes">Notas Médicas</Label>
								<InputField
									type="text"
									value={formData.medical_notes}
									name="medical_notes"
									id="medical_notes"
									onChange={handleChange}
								/>
							</div>

							<div className="col-span-2">
								<div className="flex items-center gap-3 px-2 mt-6 justify-end">
									<Button size="sm" variant="outline" onClick={handleClose}>
										Cerrar
									</Button>
									<Button size="sm" type="submit" disabled={isLoading}>
										{isLoading && <IconSpinner />}
										Guardar
									</Button>
								</div>
							</div>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}
