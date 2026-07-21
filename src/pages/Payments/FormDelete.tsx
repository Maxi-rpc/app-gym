import React, { useState } from "react";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import Alert from "../../components/ui/alert/Alert";

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
	deleteText: string | undefined;
};

export default function FormEdit({ onSubmit, onClose, deleteText }: Props) {
	const [formData, setFormData] = useState({ deletetext: "" });

	const [validText] = useState(deleteText);

	const handleClose = () => {
		console.log("handleClose Modal");
		onClose?.();
	};

	const handleSubmit = () => {
		console.log("handleSubmit Modal");
		if (validateDelete()) {
			console.log("ok");
			onSubmit?.();
		} else {
			console.log("error");
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
		console.log(name, value);
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
				<Button size="sm" onClick={handleSubmit}>
					Eliminar
				</Button>
			</div>
		</form>
	);
}
