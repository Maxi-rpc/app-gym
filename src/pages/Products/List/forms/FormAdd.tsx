import { useState, useEffect } from "react";

import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import Alert from "../../../../components/ui/alert/Alert";
import Select from "../../../../components/form/Select";
import { Feedback } from "../../../../components/ui/alert/types/AlertFeedback";
import IconSpinner from "../../../../components/ui/button/IconSpinner";

import { productService } from "../../../../service/products.service";
import { productCategoriesService } from "../../../../service/productCategories.service";
import { ProductCategories } from "../../../../service/types/ProductCategories";

type Props = {
	onSubmit?: () => void;
	onClose?: () => void;
};

export default function FormAdd({ onSubmit, onClose }: Props) {
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		category: 0,
		sku: "",
		barcode: "",
		cost_price: 0,
		sale_price: 0,
		stock: 0,
		minimum_stock: 0,
		image: "",
	});
	const [listCategories, setListCategories] = useState([
		{ value: "SIN DATOS", label: "SIN DATOS" },
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
			if (!formData.name) {
				setFeedback({
					variant: "info",
					title: "Por favor completa todos los campos*",
					message: "",
				});
				return;
			}

			const resp = await productService.create(formData);
			if (resp.error) {
				throw resp.error;
			}

			setFeedback({
				variant: "success",
				title: "Registro creado.",
				message: resp?.data?.message,
			});
		} catch (error) {
			console.error("Error al crear registro:", error);

			setFeedback({
				variant: "error",
				title: "No se puede crear registro",
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

	const handleSelectChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			category: Number(value),
		}));
	};

	const getData = async () => {
		try {
			const resp = await productCategoriesService.getAll();
			if (resp.error) {
				throw resp.error;
			}

			const categories = resp?.data?.map((item: ProductCategories) => {
				return { value: String(item?.id), label: item?.name };
			});

			setListCategories(categories ?? []);
		} catch (error) {
			console.error("Error al obtener datos:", error);

			setFeedback({
				variant: "error",
				title: "No se puede cargar datos",
				message:
					"Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.",
			});
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<form className="flex flex-col">
			<div className="px-2 h-112.5 overflow-y-auto custom-scrollbar">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
					<div className="col-span-2 md:col-span-1">
						<Label>Nombre*</Label>
						<Input
							type="text"
							value={formData.name}
							name="name"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Descripción</Label>
						<Input
							type="text"
							value={formData.description}
							name="description"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Categoría*</Label>
						<Select
							options={listCategories}
							placeholder="Selecionar una opción"
							onChange={handleSelectChange}
							className="dark:bg-dark-900"
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>SKU</Label>
						<Input
							type="text"
							value={formData.sku}
							name="sku"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Barcode</Label>
						<Input
							type="text"
							value={formData.barcode}
							name="barcode"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Precio de Costo*</Label>
						<Input
							type="number"
							value={formData.cost_price}
							name="cost_price"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Precio de Venta*</Label>
						<Input
							type="number"
							value={formData.sale_price}
							name="sale_price"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Stock*</Label>
						<Input
							type="number"
							value={formData.stock}
							name="stock"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Min Stock*</Label>
						<Input
							type="number"
							value={formData.minimum_stock}
							name="minimum_stock"
							onChange={handleChange}
						/>
					</div>

					<div className="col-span-2 md:col-span-1">
						<Label>Imagen - URL</Label>
						<Input
							type="text"
							value={formData.image}
							name="image"
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
