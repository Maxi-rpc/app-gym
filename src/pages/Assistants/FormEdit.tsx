import React, { useState } from "react";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { ClientAssistant } from "../../service/types/ClientAssistant";

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
	defaultData: ClientAssistant | null;
};

export default function FormEdit({ onSubmit, onClose, defaultData }: Props) {
	const [formData, setFormData] = useState({
		check_in_at: defaultData?.check_in_at,
		check_out_at: defaultData?.check_out_at,
		access_granted: defaultData?.access_granted,
		access_reason: defaultData?.access_reason,
		user: defaultData?.user,
		membership: defaultData?.membership,
		created_by_profile: defaultData?.created_by_profile,
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
						<Label>Check In</Label>
						<Input
							type="text"
							value={formData.check_in_at}
							name="check_in_at"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Check Out</Label>
						<Input
							type="text"
							value={formData.check_out_at}
							name="check_out_at"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Documento</Label>
						<Input
							type="text"
							value={String(formData.access_granted)}
							name="access_granted"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Razón</Label>
						<Input
							type="text"
							value={formData.access_reason}
							name="access_reason"
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
