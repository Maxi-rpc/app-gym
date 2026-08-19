import { useState } from "react";

import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import Alert from "../../../../components/ui/alert/Alert";
import Select from "../../../../components/form/Select";
import { Feedback } from "../../../../components/ui/alert/types/AlertFeedback";
import IconSpinner from "../../../../components/ui/button/IconSpinner";

import { productStockService } from "../../../../service/productsStock.service";
import { Product } from "../../../../service/types/Product";

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
	defaultData: Product | null;
};

export default function FormEdit({ onSubmit, onClose, defaultData }: Props) {
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		id: defaultData?.id || "",
		name: defaultData?.name || "",
		movement_type: "",
		quantity: 0,
		previous_stock: defaultData?.stock || 0,
		new_stock: 0,
		reference_id: null,
		observation: "",
	});
	const [listType] = useState([
		{ value: "Reposición", label: "Reposición" },
		{ value: "Ajuste", label: "Ajuste" },
	]);

	const handleClose = () => {
		setFeedback(null);
		onSubmit?.();
		onClose?.();
	};

	const handleSubmit = async () => {
		try {
			setFeedback(null);
			setIsLoading(true);

			// Validación básica
			if (!formData.name || !formData.movement_type) {
				setFeedback({
					variant: "info",
					title: "Por favor completa todos los campos*",
					message: "",
				});
				return;
			}

			const resp = await productStockService.adjustStock(formData);
			if (resp.error) {
				throw resp.error;
			}

			setFeedback({
				variant: "success",
				title: "Registro guardado.",
				message: resp?.data?.message,
			});
		} catch (error) {
			console.error("Error al guardar registro:", error);

			setFeedback({
				variant: "error",
				title: "No se puede guardar registro",
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

		if (name == "quantity") {
			const newStock = Number(formData.previous_stock) + Number(value);
			setFormData((prev) => ({
				...prev,
				new_stock: newStock,
			}));
		}
	};

	const handleSelectChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			movement_type: value,
		}));
	};

	return (
		<form className="flex flex-col">
			<div className="px-2 overflow-y-auto custom-scrollbar">
				<div className="px-2 h-112.5 md:h-auto overflow-y-auto custom-scrollbar">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
						<div className="col-span-2 md:col-span-1">
							<Label>Producto*</Label>
							<Input type="text" value={formData.name} name="name" disabled />
						</div>

						<div className="col-span-2 md:col-span-1">
							<Label>Tipo*</Label>
							<Select
								options={listType}
								placeholder="Selecionar una opción"
								onChange={handleSelectChange}
								className="dark:bg-dark-900"
							/>
						</div>

						<div className="col-span-2 md:col-span-2">
							<Label>Cantidad</Label>
							<Input
								type="number"
								value={formData.quantity}
								name="quantity"
								onChange={handleChange}
							/>
						</div>

						<div className="col-span-2 md:col-span-2">
							<Label>Stock Actual</Label>
							<Input
								type="number"
								value={formData.previous_stock}
								name="previous_stock"
								disabled
							/>
						</div>

						<div className="col-span-2 md:col-span-2">
							<Label>Nuevo Stock</Label>
							<Input
								type="number"
								value={formData.new_stock}
								name="new_stock"
								success
							/>
						</div>

						<div className="col-span-2 md:col-span-2">
							<Label>Observación</Label>
							<Input
								type="text"
								value={formData.observation}
								name="observation"
								onChange={handleChange}
							/>
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
