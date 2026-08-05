import { useState } from "react";

// import { publicAsset } from "../../utils/publicAsset";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Badge from "../ui/badge/Badge";
import Alert from "../../components/ui/alert/Alert";
import { Feedback } from "../../components/ui/alert/types/AlertFeedback";
import IconSpinner from "../../components/ui/button/IconSpinner";
import QRCard from "../../components/ui/qr/QRCard";

import { Lineicons } from "@lineiconshq/react-lineicons";
import { Pencil1Outlined } from "@lineiconshq/free-icons";

import { useAuth } from "../../hooks/useAuth";

import { profileService } from "../../service/profile.service";

export default function UserDataCard() {
	const { isOpen, openModal, closeModal } = useModal();
	const { profile } = useAuth();
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		id: profile?.id,
		email: profile?.email,
		name: profile?.name,
		last_name: profile?.last_name,
		document: profile?.document,
		phone: profile?.phone,
		image: profile?.image,
		birth_date: profile?.birth_date,
	});

	const roleNames =
		profile?.user_roles
			?.map((ur) => ur.role?.name)
			.filter(Boolean)
			.join(", ") ?? "";

	const handleCloseModal = () => {
		setFeedback(null);
		closeModal();
	};

	const handleSubmit = async () => {
		try {
			setFeedback(null);
			setIsLoading(true);

			const resp = await profileService.update(formData);
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

	return (
		<>
			<div className="mb-6 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
				<div className="flex flex-col gap-5 sm:flex-row xl:gap-10">
					<div className="flex-1">
						<div className="mb-6 flex flex-col gap-5 sm:flex-row xl:items-center xl:justify-between">
							<div className="flex w-full flex-col items-start gap-6 sm:flex-row sm:items-center">
								<QRCard value={profile?.qr_token} />
								{/* <div className="border-gray-20 overflow-hidden rounded-full border dark:border-gray-800">
									<img
										className="size-20"
										alt="user"
										src={publicAsset("images/user/owner.jpg")}
									/>
								</div> */}
								<div className="mr-3 overflow-hidden rounded-full h-20 w-20 bg-brand-400 inline-flex items-center justify-center text-5xl font-medium text-white">
									{profile?.name[0]}
								</div>

								<div className="text-left">
									<h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
										{profile?.name} {profile?.last_name}{" "}
										<Badge color="success">{profile?.status?.name}</Badge>
									</h4>
									<div className="flex items-center gap-1 sm:gap-3">
										<p className="text-sm text-gray-500 dark:text-gray-400">
											{roleNames}
										</p>
										<div className="hidden h-3.5 w-px bg-gray-300 sm:block dark:bg-gray-700"></div>
										{/* <p className="text-sm text-gray-500 dark:text-gray-400">
											Buenos Aires, Argentina.
										</p> */}
									</div>
								</div>
							</div>
						</div>
						<div className="relative grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-11 xl:gap-y-7">
							<div className="w-full">
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Nombre
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{profile?.name}
								</p>
							</div>
							<div className="w-full">
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Apellido
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{profile?.last_name}
								</p>
							</div>
							<div className="w-full">
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Email
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{profile?.email}
								</p>
							</div>
							<div className="hidden xl:block"></div>
							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Cumpleaños
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{profile?.birth_date}
								</p>
							</div>
							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Teléfono
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{profile?.phone}
								</p>
							</div>
							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Role
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{roleNames}
								</p>
							</div>
						</div>
					</div>
					<div>
						<button
							onClick={openModal}
							className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
						>
							<Lineicons icon={Pencil1Outlined} size={20} />
							Editar
						</button>
					</div>
				</div>
			</div>
			{/* modal */}
			<Modal
				isOpen={isOpen}
				onClose={handleCloseModal}
				className="max-w-175 m-4"
			>
				<div className="no-scrollbar relative w-full max-w-175 overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
					<div className="px-2 pr-14">
						<h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
							Editar información personal
						</h4>
						<p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
							Actualiza tus datos para mantener tu perfil al día.
						</p>
					</div>
					<form className="flex flex-col">
						<div className="custom-scrollbar h-112.5 md:h-auto overflow-y-auto px-2 pb-3">
							<div className="mt-7">
								<h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
									Información personal
								</h5>

								<div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
									<div className="col-span-2 lg:col-span-1">
										<Label>Nombre</Label>
										<Input
											type="text"
											value={formData?.name}
											name="name"
											onChange={handleChange}
										/>
									</div>

									<div className="col-span-2 lg:col-span-1">
										<Label>Apellido</Label>
										<Input
											type="text"
											value={formData?.last_name}
											name="last_name"
											onChange={handleChange}
										/>
									</div>

									<div className="col-span-2 lg:col-span-1">
										<Label>Email</Label>
										<Input
											type="text"
											value={formData?.email}
											name="email"
											onChange={handleChange}
										/>
									</div>

									<div className="col-span-2 lg:col-span-1">
										<Label>Documento</Label>
										<Input
											type="text"
											value={formData?.document || ""}
											name="document"
											onChange={handleChange}
										/>
									</div>

									<div className="col-span-2 lg:col-span-1">
										<Label>Teléfono</Label>
										<Input
											type="text"
											value={formData?.phone || ""}
											name="phone"
											onChange={handleChange}
										/>
									</div>

									<div className="col-span-2 lg:col-span-1">
										<Label>Fecha de Cumpleaños</Label>
										<Input
											type="date"
											placeholder="AAAA-MM-DD"
											value={formData?.birth_date}
											name="birth_date"
											onChange={handleChange}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
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
