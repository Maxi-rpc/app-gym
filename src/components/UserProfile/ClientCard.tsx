import { useState, useEffect } from "react";

import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import Label from "../form/Label";
import Alert from "../../components/ui/alert/Alert";
import { Feedback } from "../../components/ui/alert/types/AlertFeedback";
import IconSpinner from "../../components/ui/button/IconSpinner";

import { Lineicons } from "@lineiconshq/react-lineicons";
import { Pencil1Outlined } from "@lineiconshq/free-icons";

import { clientService } from "../../service/client.service";
import { UpdateClientInput } from "../../service/types/Client";
import { useAuth } from "../../hooks/useAuth";

export default function ClientCard() {
	const { profile } = useAuth();
	const [client, setClient] = useState<UpdateClientInput | null>(null);
	const { isOpen, openModal, closeModal } = useModal();
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		user_id: "",
		height: 0,
		weight: 0,
		emergency_contact: "",
		medical_notes: "",
	});

	const handleCloseModal = () => {
		setFeedback(null);
		closeModal();
	};

	const handleSubmit = async () => {
		try {
			setFeedback(null);
			setIsLoading(true);

			const resp = await clientService.update(formData);
			if (resp.data) {
				if (resp?.data?.success) {
					setFeedback({
						variant: "success",
						title: "Info.",
						message: resp?.data?.message,
					});
				} else {
					setFeedback({
						variant: "warning",
						title: "Info.",
						message: resp?.data?.message,
					});
				}
			}

			if (resp.error) {
				throw resp.error;
			}

			await loadClient(formData.user_id);
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

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const loadClient = async (userId: string) => {
		try {
			const clientData = await clientService.getById(userId);
			setClient(clientData);
			setFormData((prev) => ({
				...prev,
				user_id: userId,
				height: clientData?.height ?? 0,
				weight: clientData?.weight ?? 0,
				emergency_contact: clientData?.emergency_contact ?? "",
				medical_notes: clientData?.medical_notes ?? "",
			}));
		} catch (err) {
			console.error("Error cargando client", err);

			setClient(null);
		}
	};

	useEffect(() => {
		const getData = async () => {
			if (profile?.id) {
				await loadClient(profile?.id);
			}
		};
		getData();
	}, []);

	return (
		<>
			<div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
					<div>
						<h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
							Datos Opcionales
						</h4>

						<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Altura (cm)
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{client?.height}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Peso (kg)
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{client?.weight}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Contacto de Emergencia
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{client?.emergency_contact}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Notas Médicas
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{client?.medical_notes}
								</p>
							</div>
						</div>
					</div>

					<button
						onClick={openModal}
						className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
					>
						<Lineicons icon={Pencil1Outlined} size={20} />
						Editar
					</button>
				</div>
			</div>
			{/* modal */}
			<Modal
				isOpen={isOpen}
				onClose={handleCloseModal}
				className="max-w-175 m-4"
			>
				<div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
					<div className="px-2 pr-14">
						<h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
							Editar Datos
						</h4>
						<p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
							Actualiza tus datos para mantener tu perfil actualizado.
						</p>
					</div>
					<form className="flex flex-col">
						<div className="px-2 overflow-y-auto custom-scrollbar">
							<div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
								<div className="col-span-2 lg:col-span-1">
									<Label htmlFor="height">Altura (cm)</Label>
									<Input
										type="number"
										value={formData?.height}
										name="height"
										onChange={handleChange}
									/>
								</div>

								<div className="col-span-2 lg:col-span-1">
									<Label htmlFor="height">Peso (kg)</Label>
									<Input
										type="number"
										value={formData?.weight}
										name="height"
										onChange={handleChange}
									/>
								</div>

								<div className="col-span-2 lg:col-span-1">
									<Label htmlFor="emergency_contact">
										Contacto de Emergencia
									</Label>
									<Input
										type="text"
										value={formData?.emergency_contact}
										name="emergency_contact"
										onChange={handleChange}
									/>
								</div>

								<div className="col-span-2 lg:col-span-1">
									<Label htmlFor="medical_notes">Notas Médicas</Label>
									<TextArea
										value={formData?.medical_notes}
										onChange={(value) =>
											setFormData((prev) => ({
												...prev,
												medical_notes: value,
											}))
										}
										rows={3}
									/>
								</div>
							</div>
						</div>
						<div className="flex items-center gap-3 px-2 mt-6 justify-end">
							<Button size="sm" variant="outline" onClick={handleCloseModal}>
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
				</div>
			</Modal>
		</>
	);
}
