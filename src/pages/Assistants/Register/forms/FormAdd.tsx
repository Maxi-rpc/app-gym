import { useState, useEffect } from "react";

import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Select from "../../../../components/form/Select";
import Button from "../../../../components/ui/button/Button";
import DatePicker from "../../../../components/form/date-picker";
import Alert from "../../../../components/ui/alert/Alert";
import { Feedback } from "../../../../components/ui/alert/types/AlertFeedback";
import IconSpinner from "../../../../components/ui/button/IconSpinner";

import { TimeIcon } from "../../../../icons";

import { Profile } from "../../../../context/types/Profile";
import { attendanceService } from "../../../../service/attendance.service";

type Props = {
	data: Profile | null;
};

const options = [
	{ value: "true", label: "Si" },
	{ value: "false", label: "No" },
];

export default function FormAdd({ data }: Props) {
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		qr_token: "",
		check_in_at: "",
		check_out_at: "",
		access_granted: true,
		access_reason: "",
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
		console.log("first");
	};

	const handleSubmit = async () => {
		try {
			setFeedback(null);
			setIsLoading(true);
			const CheckInfromString = checkIn.date
				? `${checkIn.date}T${checkIn.time}`
				: formData.check_in_at;
			const CheckOutfromString = checkOut.date
				? `${checkOut.date}T${checkOut.time}`
				: formData.check_out_at;

			const formCreate = {
				qr_token: formData.qr_token,
				check_in_at: CheckInfromString || "",
				check_out_at: CheckOutfromString || "",
				access_granted: formData.access_granted,
				access_reason: formData.access_reason,
			};

			console.log(formCreate);
			//return;

			const resp = await attendanceService.register(formCreate);
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

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	useEffect(() => {
		if (data) {
			setFormData((prev) => ({
				...prev,
				qr_token: data?.qr_token || "",
			}));
		}
	}, [data]);

	return (
		<form className="flex flex-col">
			<div className="px-2 pb-3">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
					<div className="col-span-2">
						<Label>QR</Label>
						<Input
							type="text"
							value={formData?.qr_token}
							name="qr_token"
							disabled
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Acceso?</Label>
						<Select
							options={options}
							placeholder="Seleccionar"
							onChange={handleSelectChange}
							className="dark:bg-dark-900"
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Razón</Label>
						<Input
							type="text"
							value={formData?.access_reason}
							name="access_reason"
							onChange={handleChange}
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
