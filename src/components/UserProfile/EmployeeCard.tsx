import { useState, useEffect } from "react";

import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Alert from "../../components/ui/alert/Alert";
import { Feedback } from "../../components/ui/alert/types/AlertFeedback";

import { Lineicons } from "@lineiconshq/react-lineicons";
import { Pencil1Outlined } from "@lineiconshq/free-icons";

import { employeeService } from "../../service/employee.service";
import { UpdateEmployeeInput } from "../../service/types/Employee";
import { useAuth } from "../../hooks/useAuth";

export default function EmployeeCard() {
	const { profile } = useAuth();
	const [employee, setEmployee] = useState<UpdateEmployeeInput | null>(null);
	const { isOpen, openModal, closeModal } = useModal();
	const [formData, setFormData] = useState({
		user_id: "",
		salary: 0,
		hire_date: null,
		specialist: "",
		employee_number: "",
		observations: "",
	});
	const [feedback, setFeedback] = useState<Feedback>(null);

	const handleCloseModal = () => {
		setFeedback(null);
		closeModal();
	};

	const handleSave = async () => {
		try {
			setFeedback(null);
			// Validación básica

			const resp = await employeeService.update(formData);
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
			await loadEmployee(formData.user_id);
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

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const loadEmployee = async (userId: string) => {
		try {
			const employeeData = await employeeService.getById(userId);
			setEmployee(employeeData);
			setFormData((prev) => ({
				...prev,
				user_id: userId,
				salary: employeeData.salary ?? 0,
				hire_date: employeeData.hire_date ?? null,
				specialist: employeeData.specialist ?? "",
				employee_number: employeeData.employee_number ?? "",
				observations: employeeData.observations ?? "",
			}));
		} catch (err) {
			console.error("Error cargando employee", err);
			setEmployee(null);
		}
	};

	useEffect(() => {
		const getData = async () => {
			if (profile?.id) {
				await loadEmployee(profile?.id);
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
							Empleado
						</h4>

						<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Fecha de Ingreso
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{employee?.hire_date}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Especialidad
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{employee?.specialist}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Observación
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{employee?.observations}
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
									<Label>Fecha de Ingreso</Label>
									<Input
										type="date"
										value={formData?.hire_date || ""}
										name="hire_date"
										onChange={handleChange}
									/>
								</div>

								<div className="col-span-2 lg:col-span-1">
									<Label>Especialidad</Label>
									<Input
										type="text"
										value={formData?.specialist}
										name="specialist"
										onChange={handleChange}
									/>
								</div>

								<div className="col-span-2 lg:col-span-1">
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
						<div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
							<Button size="sm" variant="outline" onClick={handleCloseModal}>
								Cerrar
							</Button>
							<Button size="sm" onClick={handleSave}>
								Guadar Cambios
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
