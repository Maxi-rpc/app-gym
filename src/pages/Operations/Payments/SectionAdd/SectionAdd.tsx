import { useState } from "react";

import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import DatePicker from "../../../../components/form/date-picker";
import TextArea from "../../../../components/form/input/TextArea";
import Button from "../../../../components/ui/button/Button";

export default function SectionEdit() {
	const [formData, setFormData] = useState({
		clientid: "",
		email: "",
		createDate: "",
		notes: "",
	});

	const [formError, setFormError] = useState({
		clientid: false,
		email: false,
		createDate: false,
	});

	const handleSubmit = () => {
		const errors: { [key: string]: boolean } = {};

		Object.entries(formData).forEach(([key, value]) => {
			// Excluir 'notes' e 'id' de la validación obligatoria
			if (key !== "notes" && key !== "id") {
				errors[key] = !value || value === "";
			}
		});

		setFormError(errors);

		// Solo continuar si no hay errores
		if (Object.values(errors).some((err) => err)) {
			console.log("Hay errores de validación");
			return;
		}
		console.log("handleSubmit Modal");
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
			<div className="px-2 custom-scrollbar">
				<div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-2">
					<div>
						<Label>Client Id*</Label>
						<Input
							type="text"
							value={formData.clientid}
							name="name"
							onChange={handleChange}
							error={formError.clientid}
							hint={formError.clientid ? "Completar campo" : ""}
						/>
					</div>

					<div>
						<Label>Email*</Label>
						<Input
							type="text"
							value={formData.email}
							name="lastname"
                            onChange={handleChange}
                            error={formError.email}
							hint={formError.email ? "Completar campo" : ""}
						/>
					</div>

					<div>
						<DatePicker
							id="date-picker"
							label="Fecha de Pago*"
							placeholder="Seleccionar Fecha"
							onChange={(dates, currentDateString) => {
								// Handle your logic
								setFormData({
									...formData,
									createDate: currentDateString,
								});
								console.log({ dates, currentDateString });
							}}
						/>
					</div>

					<div className="col-span-2">
						<Label>Nota</Label>
						<TextArea
							placeholder="Ingresar nota (opcional)"
							value={formData.notes}
							onChange={(value) =>
								setFormData({
									...formData,
									notes: value,
								})
							}
							rows={3}
						/>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-3 px-2 mt-6 justify-end">
				<Button size="sm" onClick={handleSubmit}>
					Guardar
				</Button>
			</div>
		</form>
	);
}
