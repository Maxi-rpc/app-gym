import React, { useState } from "react";

import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import Alert from "../../../../components/ui/alert/Alert";
import { Feedback } from "../../../../components/ui/alert/types/AlertFeedback";
import IconSpinner from "../../../../components/ui/button/IconSpinner";

import { clientService } from "../../../../service/client.service";

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
	deleteText: string | undefined;
};

export default function FormEdit({ onSubmit, onClose, deleteText }: Props) {
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({ deletetext: "" });

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
				const resp = await clientService.remove(formDelete);
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
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const validateDelete = () => {
		console.log("validateDelete", validText, formData?.deletetext);
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
