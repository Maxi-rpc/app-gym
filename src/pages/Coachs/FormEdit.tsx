import React, { useState } from "react";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { Employee } from "../../service/types/Employee";

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
	defaultData: Employee | null;
};

export default function FormEdit({ onSubmit, onClose, defaultData }: Props) {
	const [formData, setFormData] = useState({
		salary: defaultData?.salary,
		hire_date: defaultData?.hire_date,
		specialist: defaultData?.specialist,
		employee_number: defaultData?.employee_number,
		observations: defaultData?.observations,
		profile: defaultData?.profile,
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
		console.log(name, value);
	};

	return (
		<form className="flex flex-col">
			<div className="px-2 overflow-y-auto custom-scrollbar">
				<div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-2">
					{/* <div>
						<Label>Nombre</Label>
						<Input
							type="text"
							value={formData.salary}
							name="name"
							onChange={handleChange}
						/>
					</div> */}

					<div>
						<Label>Apellido</Label>
						<Input
							type="text"
							value={formData.hire_date}
							name="lastname"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Documento</Label>
						<Input
							type="text"
							value={formData.specialist}
							name="document"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Fecha de Nacimiento</Label>
						<Input
							type="text"
							value={formData.employee_number}
							name="birthDate"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Teléfono</Label>
						<Input
							type="text"
							value={formData.observations}
							name="phoneNumber"
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
