import { useState } from "react";

import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import Alert from "../../../../components/ui/alert/Alert";
import { Feedback } from "../../../../components/ui/alert/types/AlertFeedback";

import { StockMovement } from "../../../../service/types/ProductStock";

import { formatLocalDateTime } from "../../../../utils/date";

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
	defaultData: StockMovement | null;
};

export default function FormEdit({ onSubmit, onClose, defaultData }: Props) {
	const [feedback, setFeedback] = useState<Feedback>(null);

	const [formData] = useState({
		id: defaultData?.id || "",
		name: defaultData?.product?.name || "",
		created_at: defaultData?.created_at,
		updated_at: defaultData?.updated_at,
		movement_type: defaultData?.movement_type,
		quantity: defaultData?.quantity,
		previous_stock: defaultData?.previous_stock,
		new_stock: defaultData?.new_stock,
		reference_id: defaultData?.reference_id || "",
		observation: defaultData?.observation,
		employee:
			defaultData?.employee?.name + "" + defaultData?.employee?.last_name,
	});

	const handleClose = () => {
		setFeedback(null);
		onSubmit?.();
		onClose?.();
	};

	return (
		<form className="flex flex-col">
			<div className="px-2 overflow-y-auto custom-scrollbar">
				<div className="px-2 h-112.5 md:h-auto overflow-y-auto custom-scrollbar">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
						<div className="col-span-2 md:col-span-1">
							<Label>Fecha</Label>
							<Input
								type="text"
								value={formatLocalDateTime(formData.created_at)}
								name="name"
								disabled
							/>
						</div>

						<div className="col-span-2 md:col-span-1">
							<Label>Producto</Label>
							<Input type="text" value={formData.name} name="name" disabled />
						</div>

						<div className="col-span-2 md:col-span-2">
							<Label>Stock Anterior</Label>
							<Input
								type="text"
								value={formData.previous_stock}
								name="name"
								disabled
							/>
						</div>

						<div className="col-span-2 md:col-span-2">
							<Label>Movimiento</Label>
							<Input
								type="text"
								value={formData.movement_type}
								name="name"
								disabled
							/>
						</div>

						<div className="col-span-2 md:col-span-2">
							<Label>Stock Nuevo</Label>
							<Input
								type="text"
								value={formData.new_stock}
								name="name"
								disabled
							/>
						</div>

						<div className="col-span-2 md:col-span-2">
							<Label>Cantidad</Label>
							<Input
								type="text"
								value={formData.quantity}
								name="name"
								disabled
							/>
						</div>

						<div className="col-span-2 md:col-span-2">
							<Label>Cargado por</Label>
							<Input
								type="text"
								value={formData.employee}
								name="name"
								disabled
							/>
						</div>

						<div className="col-span-2 md:col-span-1">
							<Label>Reference id</Label>
							<Input
								type="text"
								value={formData.reference_id}
								name="name"
								disabled
							/>
						</div>

						<div className="col-span-2 md:col-span-1">
							<Label>Obvservación</Label>
							<Input
								type="text"
								value={formData.observation}
								name="name"
								disabled
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-3 px-2 mt-6 justify-end">
				<Button size="sm" variant="outline" onClick={handleClose}>
					Cerrar
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
	);
}
