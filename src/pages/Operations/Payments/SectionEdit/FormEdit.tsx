import { useState, useEffect } from "react";

import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import DatePicker from "../../../../components/form/date-picker";
import TextArea from "../../../../components/form/input/TextArea";
import Button from "../../../../components/ui/button/Button";

import { Pay } from "../types/Pay";

type Props = {
	defaultData: Pay | null;
};

export default function FormEdit({ defaultData }: Props) {
	const [formData, setFormData] = useState({
		id: defaultData?.id,
		clientid: defaultData?.clientid,
		email: defaultData?.email,
		createDate: defaultData?.createDate,
		notes: defaultData?.notes,
	});

	const handleSubmit = () => {
		console.log("Updating changes...");
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
		console.log(name, value);
	};

	useEffect(() => {
		setFormData({
			id: defaultData?.id,
			clientid: defaultData?.clientid,
			email: defaultData?.email,
			createDate: defaultData?.createDate,
			notes: defaultData?.notes,
		});
	}, [defaultData]);

	return (
		<form className="flex flex-col">
			<div className="overflow-y-auto custom-scrollbar">
				<div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-2">
					<div>
						<Label>Id</Label>
						<Input
							type="text"
							value={formData.id}
							name="id"
							onChange={handleChange}
							disabled
						/>
					</div>

					<div>
						<Label>Client Id</Label>
						<Input
							type="text"
							value={formData.clientid}
							name="clientid"
							onChange={handleChange}
							disabled
						/>
					</div>

					<div>
						<Label>Email</Label>
						<Input
							type="text"
							value={formData.email}
							name="email"
							onChange={handleChange}
							disabled
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
							defaultDate={formData?.createDate}
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
