import React, { useState } from "react";

import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Select from "../../../../components/form/Select";
import Button from "../../../../components/ui/button/Button";
import Alert from "../../../../components/ui/alert/Alert";
import { Feedback } from "../../../../components/ui/alert/types/AlertFeedback";
import IconSpinner from "../../../../components/ui/button/IconSpinner";

import { Membership_payment } from "../../../../service/types/Payments";
import { paymentsService } from "../../../../service/payments.service";

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
	defaultData: Membership_payment | null;
};

const optionsPaymentsMethods = [
	{ value: "1", label: "Efectivo" },
	{ value: "2", label: "Transferencia" },
];

const optionsPaymentsStatus = [
	{ value: "1", label: "Pagado" },
	{ value: "2", label: "Pendiente" },
	{ value: "3", label: "Cancelado" },
	{ value: "4", label: "Reembolsado" },
];

export default function FormEdit({ onSubmit, onClose, defaultData }: Props) {
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		id: defaultData?.id || "",
		original_amount: defaultData?.original_amount || 0,
		discount: defaultData?.discount || 0,
		amount_paid: defaultData?.amount_paid || 0,
		payment_method_id: defaultData?.payment_method_id || 0,
		payment_date: defaultData?.payment_date || null,
		billing_period: defaultData?.billing_period || "",
		next_due_date: defaultData?.next_due_date || null,
		status_id: defaultData?.status_id || 0, // payment status
		receipt_number: defaultData?.receipt_number || "",
		observations: defaultData?.observations || "",
	});

	const handleClose = () => {
		setFeedback(null);
		onSubmit?.();
		onClose?.();
	};

	const handleSubmit = async () => {
		try {
			setFeedback(null);
			setIsLoading(true);

			const resp = await paymentsService.update(formData);

			if (resp.error) {
				throw resp.error;
			}

			setFeedback({
				variant: "success",
				title: "Pago registrado.",
				message: resp?.data?.message,
			});
		} catch (error) {
			console.error("Error al registrar pago:", error);

			setFeedback({
				variant: "error",
				title: "No se puede registrar pago",
				message:
					"Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSelectChangePaymentMethod = (value: string) => {
		setFormData((prev) => ({
			...prev,
			payment_method_id: Number(value),
		}));
	};

	const handleSelectChangePaymentStatus = (value: string) => {
		setFormData((prev) => ({
			...prev,
			status_id: Number(value),
		}));
	};

	return (
		<form className="flex flex-col">
			<div className="px-2 overflow-y-auto custom-scrollbar">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
					{/* <div className="col-span-2 md:col-span-1">
						<Label>ID</Label>
						<Input
							type="text"
							value={formData.id}
							name="id"
							onChange={handleChange}
							disabled
						/>
					</div> */}

					<div className="col-span-2 md:col-span-1">
						<Label>Monto original*</Label>
						<Input
							type="number"
							value={formData.original_amount}
							name="original_amount"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Descuento</Label>
						<Input
							type="number"
							value={formData.discount}
							name="discount"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Total*</Label>
						<Input
							type="number"
							value={formData.amount_paid}
							name="amount_paid"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Período*</Label>
						<Input
							type="date"
							value={formData.billing_period}
							name="billing_period"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Método de Pago Actual</Label>
						<Input
							type="text"
							value={defaultData?.payment_method.name}
							disabled
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Método de Pago*</Label>
						<Select
							options={optionsPaymentsMethods}
							placeholder="Seleccionar"
							onChange={handleSelectChangePaymentMethod}
							className="dark:bg-dark-900"
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Estado del Pago Actual</Label>
						<Input
							type="text"
							value={defaultData?.payment_status.name}
							disabled
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Estado del Pago*</Label>
						<Select
							options={optionsPaymentsStatus}
							placeholder="Seleccionar"
							onChange={handleSelectChangePaymentStatus}
							className="dark:bg-dark-900"
						/>
					</div>

					<div className="col-span-2">
						<p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
							Campos opcionales.
						</p>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Número de Recibo</Label>
						<Input
							type="number"
							value={formData.receipt_number}
							name="receipt_number"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Observación</Label>
						<Input
							type="text"
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
