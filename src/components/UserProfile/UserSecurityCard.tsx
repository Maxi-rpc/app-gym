import { useState } from "react";

import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

import { EyeCloseIcon, EyeIcon } from "../../icons";

import { useAuth } from "../../hooks/useAuth";

export default function UserSecurityCard() {
	const { profile } = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		email: profile?.email,
		password: "",
		newPassword: "",
	});

	const { isOpen, openModal, closeModal } = useModal();

	const handleChange = () => {
		setFormData({
			...formData,
			email: "",
		});
		console.log("editando data");
	};

	const handleSave = () => {
		// Handle save logic here
		if (!formData.password || !formData.newPassword) {
			setError("Por favor completa todos los campos*");
			return;
		}

		if (formData.password == formData.newPassword) {
			setError("Por favor la contraseña debe ser diferente");
			return;
		}

		console.log("Saving changes...");
		closeModal();
	};
	return (
		<>
			<div className="mb-6 rounded-2xl border border-gray-200  p-5 lg:p-6 dark:border-gray-800 ">
				<h4 className="text-lg mb-4 font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
					Seguridad
				</h4>
				<div>
					<div className="flex flex-col justify-between gap-4 border-b border-gray-200 py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-end dark:border-gray-800">
						<div>
							<span className="block text-base mb-1 font-medium text-gray-800 dark:text-white/90">
								Cambiar la contraseña
							</span>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Reciba notificaciones en tiempo real y alertas de equipo.
							</p>
						</div>
						<div>
							<button
								onClick={openModal}
								className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
							>
								<svg
									className="fill-current"
									width="18"
									height="18"
									viewBox="0 0 18 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
										fill=""
									/>
								</svg>
								Cambiar la contraseña
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* modal */}
			<Modal isOpen={isOpen} onClose={closeModal} className="max-w-175 m-4">
				<div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
					<div className="px-2 pr-14">
						<h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
							Editar Contraseña
						</h4>
						<p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
							Actualiza tus datos para mantener tu perfil actualizado.
						</p>
					</div>
					<form className="flex flex-col">
						<div className="px-2 overflow-y-auto custom-scrollbar">
							<div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
								<div className="col-span-2">
									<Label>Email</Label>
									<Input type="text" value={formData.email} disabled />
								</div>
								<div>
									<Label>
										Password Actual <span className="text-error-500">*</span>
									</Label>
									<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											name="password"
											value={formData.password}
											onChange={handleChange}
										/>
										<span
											onClick={() => setShowPassword(!showPassword)}
											className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
										>
											{showPassword ? (
												<EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
											) : (
												<EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
											)}
										</span>
									</div>
								</div>

								<div>
									<Label>
										Password Nueva <span className="text-error-500">*</span>
									</Label>
									<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											name="newPassword"
											value={formData.newPassword}
											onChange={handleChange}
										/>
										<span
											onClick={() => setShowPassword(!showPassword)}
											className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
										>
											{showPassword ? (
												<EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
											) : (
												<EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
											)}
										</span>
									</div>
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
						<div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
							<Button size="sm" variant="outline" onClick={closeModal}>
								Cerrar
							</Button>
							<Button size="sm" onClick={handleSave}>
								Guadar Cambios
							</Button>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
}
