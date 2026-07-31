import { useState, useEffect } from "react";

import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import Alert from "../../../../components/ui/alert/Alert";
import { Feedback } from "../../../../components/ui/alert/types/AlertFeedback";

import { Profile } from "../../../../context/types/Profile";
import { paymentsService } from "../../../../service/payments.service";

interface Props {
	data: Profile | null;
}

export default function FormRegister({ data }: Props) {
	const [feedback, setFeedback] = useState<Feedback>(null);

	const [profile, setProfile] = useState<Profile | null>(null);

	const [formData, setFormData] = useState({
		client_id: "",
		service_id: "",
		start_date: "",
		end_date: "",
		observations: "",
		original_amount: 0,
		discount: 0,
		amount_paid: 0,
		payment_method_id: "",
		billing_period: "",
		status_id: "",
		receipt_number: "",
	});

	const handleClose = () => {
		setFeedback(null);
	};

	const handleSubmit = async () => {
		try {
			setFeedback(null);
			// Validación básica

			const resp = await paymentsService.create();
			console.log(resp, profile);
			// if (resp.error) {
			// 	throw resp.error;
			// }

			// setFeedback({
			// 	variant: "success",
			// 	title: "Cliente creado.",
			// 	message: resp?.data?.message,
			// });
		} catch (error) {
			console.error("Error al crear cliente:", error);

			setFeedback({
				variant: "error",
				title: "No se puede crear cliente",
				message:
					"Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.",
			});
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	useEffect(() => {
		setProfile(data);
	}, [data]);

	return (
		<>
			<div className="my-6 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
				<form className="flex flex-col">
					<div className="px-2 overflow-y-auto custom-scrollbar">
						<div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-2">
							<div className="col-span-2">
								<p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
									Completar los campos para registrar el pago.
								</p>
							</div>

							<div>
								<Label>Monto original*</Label>
								<Input
									type="number"
									value={formData.original_amount}
									name="original_amount"
									onChange={handleChange}
								/>
							</div>

							<div>
								<Label>Descuento*</Label>
								<Input
									type="number"
									value={formData.discount}
									name="discount"
									onChange={handleChange}
								/>
							</div>

							<div>
								<Label>Total*</Label>
								<Input
									type="number"
									value={formData.amount_paid}
									name="amount_paid"
									onChange={handleChange}
								/>
							</div>

							<div>
								<Label>Método de Pago</Label>
								<Input
									type="text"
									value={formData.payment_method_id}
									name="payment_method_id"
									onChange={handleChange}
								/>
							</div>

							<div>
								<Label>Período</Label>
								<Input
									type="text"
									value={formData.billing_period}
									name="billing_period"
									onChange={handleChange}
								/>
							</div>

							<div>
								<Label>Estado del Pago</Label>
								<Input
									type="text"
									value={formData.status_id}
									name="status_id"
									onChange={handleChange}
								/>
							</div>

							<div className="col-span-2">
								<p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
									Campos opcionales.
								</p>
							</div>

							<div>
								<Label>Número de Recibo</Label>
								<Input
									type="number"
									value={formData.receipt_number}
									name="receipt_number"
									onChange={handleChange}
								/>
							</div>

							<div>
								<Label>Observación</Label>
								<Input
									type="number"
									value={formData.observations}
									name="observations"
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
					<div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-2 mt-3">
						{feedback && (
							<div className="col-span-2 text-start">
								<Alert
									variant={feedback?.variant}
									title={feedback?.title}
									message={feedback?.message}
								/>
							</div>
						)}
					</div>
				</form>
			</div>
		</>
	);
}
