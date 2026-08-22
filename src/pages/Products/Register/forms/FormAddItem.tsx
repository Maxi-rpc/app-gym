import { useEffect, useState } from "react";
import { Product } from "../../../../service/types/Product";
import { SaleItem } from "./sale.types";

import Form from "../../../../components/form/Form";
import Label from "../../../../components/form/Label";
import InputField from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import Select from "../../../../components/form/Select";

type Props = {
	product: Product | null;
	onSubmit: (item: Omit<SaleItem, "id">) => void;
};

const options = [
	{ value: "0", label: "0%" },
	{ value: "10", label: "10%" },
	{ value: "20", label: "20%" },
	{ value: "50", label: "50%" },
];

export default function FormAddItem({ product, onSubmit }: Props) {
	const [quantity, setQuantity] = useState(1);
	const [discount, setDiscount] = useState(0);
	useEffect(() => {
		setQuantity(1);
		setDiscount(0);
	}, [product?.id]);

	const handleSubmit = () => {
		if (!product || quantity < 1) return;
		onSubmit({
			product_id: product.id,
			name: product.name,
			unit_price: Number(product.sale_price),
			quantity,
			discount,
		});
		setQuantity(1);
		setDiscount(0);
	};

	return (
		<div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
			<Form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-12">
					<div className="w-full lg:col-span-3">
						<Label>Producto</Label>
						<InputField
							readOnly
							placeholder="Buscá un producto primero"
							value={product?.name ?? ""}
						/>
					</div>
					<div className="w-full lg:col-span-3">
						<Label>Precio</Label>
						<InputField
							value={product ? Number(product.sale_price).toFixed(2) : ""}
						/>
					</div>
					<div className="w-full lg:col-span-2">
						<Label htmlFor="quantity">Cantidad</Label>
						<InputField
							id="quantity"
							type="number"
							min="1"
							disabled={!product}
							value={quantity}
							onChange={(event) =>
								setQuantity(Math.max(1, Number(event.target.value) || 1))
							}
						/>
					</div>
					<div className="w-full lg:col-span-2">
						<Label htmlFor="discount">Descuento</Label>
						<Select
							options={options}
							placeholder="Seleccionar"
							disabled={!product}
							defaultValue={String(discount)}
							onChange={(value) => setDiscount(Number(value))}
							className="dark:bg-dark-900"
						/>
					</div>
					<div className="flex w-full items-end lg:col-span-2">
						<Button type="submit" disabled={!product}>
							Agregar producto
						</Button>
					</div>
				</div>
			</Form>
		</div>
	);
}
