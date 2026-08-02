import React, { useState } from "react";

import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Select from "../../../components/form/Select";
import Alert from "../../../components/ui/alert/Alert";
import { Feedback } from "../../../components/ui/alert/types/AlertFeedback";
import IconSpinner from "../../../components/ui/button/IconSpinner";

import { UpdateAttendanceInput } from "../../../service/types/Attendance";
import { attendanceService } from "../../../service/attendance.service";

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
	defaultData: UpdateAttendanceInput | null;
};

const options = [
	{ value: "true", label: "Si" },
	{ value: "false", label: "No" },
];

export default function FormEdit({ onSubmit, onClose, defaultData }: Props) {
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		id: defaultData?.id || "",
		check_in_at: defaultData?.check_in_at || "",
		check_out_at: defaultData?.check_out_at || null,
		access_granted: defaultData?.access_granted || false,
		access_reason: defaultData?.access_reason || "",
	});
	const handleClose = () => {
		onSubmit?.();
		onClose?.();
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSelectChange = (value: string) => {
		let newValue = false;
		if (value === "true") {
			newValue = true;
		}
		setFormData((prev) => ({
			...prev,
			access_granted: newValue,
		}));
	};

	const handleSubmit = async () => {
		try {
			setFeedback(null);
			setIsLoading(true);

			const resp = await attendanceService.update(formData);
			if (resp.error) throw resp.error;

			setFeedback({
				variant: "success",
				title: "Info",
				message: resp.data?.message,
			});
		} catch (error) {
			console.error("Error No se puede obtener datos", error);

			setFeedback({
				variant: "error",
				title: "No se puede obtener datos",
				message:
					"Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form className="flex flex-col">
			<div className="px-2 overflow-y-auto custom-scrollbar">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
					<div className="col-span-2 md:col-span-1">
						<Label>Id</Label>
						<Input type="text" value={formData?.id} name="id" disabled />
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Check In</Label>
						<Input
							type="text"
							value={formData.check_in_at}
							name="check_in_at"
							onChange={handleChange}
							disabled
						/>
					</div>

					{/* <div className="col-span-2 md:col-span-1">
						<Label>Check Out</Label>
						<Input
							type="text"
							value={formatLocalDateTime(formData.check_out_at)}
							name="check_out_at"
							onChange={handleChange}
							disabled
						/>
					</div> */}

					<div className="col-span-2 md:col-span-1">
						<Label>Acceso actual</Label>
						<Input
							type="text"
							value={formData?.access_granted == true ? "Si" : "No"}
							name="prevAccess"
							disabled
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Puede Acceder?</Label>
						<Select
							className="dark:bg-dark-900"
							options={options}
							placeholder="Seleccionar una opción"
							onChange={handleSelectChange}
						/>
					</div>

					<div className="col-span-2">
						<Label>Razón</Label>
						<Input
							type="text"
							value={formData.access_reason}
							name="access_reason"
							onChange={handleChange}
							min="2"
							max="2"
						/>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-3 px-2 mt-6 justify-end">
				<Button size="sm" variant="outline" onClick={handleClose}>
					Cerrar
				</Button>
				<Button size="sm" onClick={handleSubmit} disabled={isLoading}>
					{isLoading && <IconSpinner />}
					Guardar
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
