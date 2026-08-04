import React, { useState } from "react";

import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import Select from "../../../../components/form/Select";
import DatePicker from "../../../../components/form/date-picker";
import Alert from "../../../../components/ui/alert/Alert";
import { Feedback } from "../../../../components/ui/alert/types/AlertFeedback";
import IconSpinner from "../../../../components/ui/button/IconSpinner";

import { TimeIcon } from "../../../../icons";

import { formatLocalDateTime } from "../../../../utils/date";

import { UpdateAttendanceInput } from "../../../../service/types/Attendance";
import { attendanceService } from "../../../../service/attendance.service";

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

	const [checkIn, setCheckIn] = useState({
		date: "",
		time: "",
	});

	const [checkOut, setCheckOut] = useState({
		date: "",
		time: "",
	});

	const handleClose = () => {
		onSubmit?.();
		onClose?.();
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
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

			const hasPartialCheckIn = Boolean(checkIn.date) !== Boolean(checkIn.time);
			const hasPartialCheckOut =
				Boolean(checkOut.date) !== Boolean(checkOut.time);

			if (hasPartialCheckIn || hasPartialCheckOut) {
				throw new Error(
					"Para modificar un horario debés indicar la fecha y la hora.",
				);
			}

			const newCheckInAt =
				checkIn.date && checkIn.time
					? `${checkIn.date}T${checkIn.time}`
					: null;
			const newCheckOutAt =
				checkOut.date && checkOut.time
					? `${checkOut.date}T${checkOut.time}`
					: null;

			const formCreate = {
				id: formData.id,
				check_in_at: formData.check_in_at,
				new_check_in_at: newCheckInAt,
				check_out_at: formData.check_out_at || null,
				new_check_out_at: newCheckOutAt,
				access_granted: formData.access_granted,
				access_reason: formData.access_reason,
			};

			console.log(formCreate);

			const resp = await attendanceService.update(formCreate);
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
			<div className="custom-scrollbar h-112.5 overflow-y-auto px-2 pb-3">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
					<div className="col-span-2">
						<Label>Id</Label>
						<Input type="text" value={formData?.id} name="id" disabled />
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Acceso Actual</Label>
						<Input
							type="text"
							value={formData?.access_granted == true ? "Si" : "No"}
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

					<div className="col-span-2 md:col-span-1">
						<Label>Razón Actual</Label>
						<Input type="text" value={formData.access_reason} disabled />
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Razón</Label>
						<Input
							type="text"
							value={formData.access_reason}
							name="access_reason"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2">
						<Label>Check In - Actual</Label>
						<Input
							type="text"
							value={formatLocalDateTime(formData.check_in_at)}
							disabled
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<DatePicker
							id="date-picker-in"
							label="Check In - Fecha"
							placeholder="Seleccionar"
							onChange={(dates, currentDateString) => {
								// Handle your logic
								console.log({ dates, currentDateString });
								setCheckIn((prev) => ({
									...prev,
									date: currentDateString,
								}));
							}}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label htmlFor="tm">Check In - Hora</Label>
						<div className="relative">
							<Input
								type="time"
								id="tm-in"
								name="tm"
								onChange={(e) => {
									console.log(e.target.value);
									setCheckIn((prev) => ({
										...prev,
										time: e.target.value,
									}));
								}}
							/>
							<span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
								<TimeIcon className="size-6" />
							</span>
						</div>
					</div>

					<div className="col-span-2">
						<Label>Check Out - Actual</Label>
						<Input
							type="text"
							value={formatLocalDateTime(formData.check_out_at)}
							disabled
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<DatePicker
							id="date-picker-out"
							label="Check Out - Fecha"
							placeholder="Seleccionar"
							onChange={(dates, currentDateString) => {
								// Handle your logic
								console.log({ dates, currentDateString });
								setCheckOut((prev) => ({
									...prev,
									date: currentDateString,
								}));
							}}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label htmlFor="tm">Check Out - Hora</Label>
						<div className="relative">
							<Input
								type="time"
								id="tm-out"
								name="tm"
								onChange={(e) =>
									setCheckOut((prev) => ({
										...prev,
										time: e.target.value,
									}))
								}
							/>
							<span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
								<TimeIcon className="size-6" />
							</span>
						</div>
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
