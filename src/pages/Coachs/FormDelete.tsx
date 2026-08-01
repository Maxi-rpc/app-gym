import React, { useState } from "react";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import Alert from "../../components/ui/alert/Alert";
import { Feedback } from "../../components/ui/alert/types/AlertFeedback";

import { employeeService } from "../../service/employee.service";

const IconSpinner = () => {
	return (
		<svg
			className="size-5 animate-spin text-white"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				stroke-width="4"
			></circle>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
	);
};

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
	deleteText: string | undefined;
};

export default function FormEdit({ onSubmit, onClose, deleteText }: Props) {
	const [feedback, setFeedback] = useState<Feedback>(null);

	const [formData, setFormData] = useState({ deletetext: "" });
	const [isLoading, setIsLoading] = useState(false);

	const [validText] = useState(deleteText);

	const handleClose = () => {
		onSubmit?.();
		onClose?.();
	};

	const handleSubmit = async () => {
		try {
			setFeedback(null);
			setIsLoading(true);

			if (validateDelete()) {
				const formDelete = {
					id: deleteText || "",
				};
				const resp = await employeeService.remove(formDelete);
				if (resp.error) throw resp.error;

				setFeedback({
					variant: "success",
					title: "Info",
					message: resp.data?.message,
				});
			} else {
				setFeedback({
					variant: "error",
					title: "No es correcto el texto",
					message: "",
				});
			}
		} catch (error) {
			console.error("Error No se puede eliminar datos", error);

			setFeedback({
				variant: "error",
				title: "No se puede realizar acción",
				message:
					"Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validateDelete = () => {
		const isValid =
			validText?.toLocaleLowerCase() ===
			formData?.deletetext?.toLocaleLowerCase();
		return isValid;
	};

	return (
		<form className="flex flex-col">
			<div className="px-2 overflow-y-auto custom-scrollbar">
				<div className="py-2">
					<Alert
						variant="warning"
						title="Advertencia"
						message="Se va a eliminar el registro de forma definitiva."
					/>
				</div>
				<div>
					<Label>
						Ingresar el texto:{" "}
						<span className="font-bold italic">{validText}</span>
					</Label>
					<Input
						type="text"
						value={formData.deletetext}
						name="deletetext"
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="flex items-center gap-3 px-2 mt-6 justify-end">
				<Button size="sm" variant="outline" onClick={handleClose}>
					Cerrar
				</Button>
				<Button size="sm" onClick={handleSubmit} disabled={isLoading}>
					{isLoading && <IconSpinner />}
					Eliminar
				</Button>
			</div>
			{feedback && (
				<div className="my-4 text-start">
					<Alert
						variant={feedback?.variant}
						title={feedback?.title}
						message={feedback?.message}
					/>
				</div>
			)}
		</form>
	);
}
