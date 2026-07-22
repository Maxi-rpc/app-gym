import React, { useState } from "react";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";

import { Client } from "../../service/types/Client";

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
	defaultData: Client | null;
};

export default function FormEdit({ onSubmit, onClose, defaultData }: Props) {
	console.log(defaultData);
	const [formData, setFormData] = useState({
		name: defaultData?.profile?.name,
		last_name: defaultData?.profile?.last_name,
		document: defaultData?.profile?.document,
		phone: defaultData?.profile?.phone,
		birth_date: defaultData?.profile?.birth_date,
		email: defaultData?.profile?.email,
		height: defaultData?.height,
		weight: defaultData?.weight,
		emergency_contact: defaultData?.emergency_contact,
		medical_notes: defaultData?.medical_notes,
	});
	const handleClose = () => {
		console.log("handleClose Modal");
		onClose?.();
	};

	const handleSubmit = () => {
		console.log("handleSubmit Modal");
		onSubmit?.();
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
					<div>
						<Label>Nombre</Label>
						<Input
							type="text"
							value={formData.name}
							name="name"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Apellido</Label>
						<Input
							type="text"
							value={formData.last_name}
							name="last_name"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Documento</Label>
						<Input
							type="text"
							value={formData.document}
							name="document"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Fecha de Nacimiento</Label>
						<Input
							type="text"
							value={formData.birth_date}
							name="birth_date"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Teléfono</Label>
						<Input
							type="text"
							value={formData.phone}
							name="phone"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Email</Label>
						<Input
							type="text"
							value={formData.email}
							name="email"
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
		</form>
	);
}
