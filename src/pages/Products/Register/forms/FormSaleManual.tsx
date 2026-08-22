import { useState, useEffect } from "react";

import Label from "../../../../components/form/Label";
import InputField from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import Select from "../../../../components/form/Select";
import Alert from "../../../../components/ui/alert/Alert";
import { Feedback } from "../../../../components/ui/alert/types/AlertFeedback";

import { productService } from "../../../../service/products.service";
import { Product } from "../../../../service/types/Product";
import { CreateProductSale } from "../../../../service/types/ProductSale";
import { productSaleStatusService } from "../../../../service/productSaleStatus.service";
import { ProductSaleStatus } from "../../../../service/types/ProductSaleStatus";
import { paymentMethodsService } from "../../../../service/paymentMethods.service";
import { PaymentMethods } from "../../../../service/types/PaymentMethods";
import { productSaleService } from "../../../../service/productSale.service";

import FormAddItem from "./FormAddItem";
import FormSearch from "./FormSearch";
import SaleItemsTable from "./SaleItemsTable";
import SaleSummary from "./SaleSummary";

import { SaleItem, getItemTotal } from "./sale.types";

export default function FormSaleManual() {
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [isSearching, setIsSearching] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [items, setItems] = useState<SaleItem[]>([]);
	const [formData, setFormData] = useState<CreateProductSale | null>(null);
	const [listSaleStatus, setListSaleStatus] = useState([
		{ value: "SIN DATOS", label: "SIN DATOS" },
	]);
	const [listPaymentMethods, setListPaymentMethods] = useState([
		{ value: "SIN DATOS", label: "SIN DATOS" },
	]);
	const [paymentMethod, setPaymentMethod] = useState(0);
	const [paymentStatus, setPaymentStatus] = useState(0);

	const handleSearch = async (barcode: string) => {
		try {
			setFeedback(null);
			setIsSearching(true);
			const response = await productService.getByCode({ barcode });
			if (response.error) throw response.error;
			if (!response.data) {
				setSelectedProduct(null);
				setFeedback({
					variant: "error",
					title: "Producto no encontrado",
					message: "No encontramos un producto con ese código.",
				});
				return;
			}
			setSelectedProduct(response.data as Product);
		} catch (error) {
			console.error("Error al buscar producto:", error);
			setSelectedProduct(null);
			setFeedback({
				variant: "error",
				title: "No se puede buscar producto",
				message: "Verificá tu conexión e intentá nuevamente.",
			});
		} finally {
			setIsSearching(false);
		}
	};

	const handleAddItem = (newItem: Omit<SaleItem, "id">) => {
		setItems((currentItems) => {
			const existingItem = currentItems.find(
				(item) =>
					item.product_id === newItem.product_id &&
					item.unit_price === newItem.unit_price &&
					item.discount === newItem.discount,
			);
			if (existingItem)
				return currentItems.map((item) =>
					item.id === existingItem.id
						? { ...item, quantity: item.quantity + newItem.quantity }
						: item,
				);
			return [...currentItems, { ...newItem, id: crypto.randomUUID() }];
		});
		setSelectedProduct(null);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCancel = () => {
		setPaymentMethod(0);
		setPaymentStatus(0);
		setFormData((prev) => ({
			...prev,
			observation: "",
		}));
		setSelectedProduct(null);
		setItems([]);
	};

	const getData = async () => {
		try {
			const resp = await productSaleStatusService.getAll();
			if (resp.error) {
				throw resp.error;
			}

			const resp_payment = await paymentMethodsService.getAll();
			if (resp_payment.error) {
				throw resp.error;
			}

			const sale_status = resp?.data?.map((item: ProductSaleStatus) => {
				return { value: String(item?.id), label: item?.name };
			});

			const payment_methods = resp_payment?.data?.map(
				(item: PaymentMethods) => {
					return { value: String(item?.id), label: item?.name };
				},
			);

			setListSaleStatus(sale_status ?? []);
			setListPaymentMethods(payment_methods ?? []);
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

	const handleSave = async () => {
		try {
			if (paymentMethod === 0 || paymentStatus === 0 || items.length === 0) {
				setFeedback({
					variant: "warning",
					title: "Completar los campos *",
					message: "La lista de productos no puede estar vacía.",
				});
				return;
			}
			const subtotal = items.reduce(
				(total, item) => total + item.unit_price * item.quantity,
				0,
			);
			const totalDiscount = items.reduce(
				(total, item) =>
					total + item.unit_price * item.quantity - getItemTotal(item),
				0,
			);

			const total = subtotal - totalDiscount;

			const formSale = {
				original_amount: total,
				discount: totalDiscount,
				total_amount: total,
				payment_method_id: paymentMethod,
				status_id: paymentStatus,
				observation: formData?.observation,
				sale_items: items,
			};

			const resp = await productSaleService.create(formSale);

			if (resp.error) throw resp.error;
			if (!resp.data) {
				setFeedback({
					variant: "error",
					title: "Producto no encontrado",
					message: "No encontramos un producto con ese código.",
				});
				return;
			}

			setFeedback({
				variant: "success",
				title: "Venta registrada",
				message: resp.data?.message || "Registrado correctamente.",
			});
			handleCancel();
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
		<div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
			<div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
				<h2 className="text-xl font-medium text-gray-800 dark:text-white">
					Registrar venta manual
				</h2>
			</div>
			<div className="border-b border-gray-200 p-4 sm:p-8 dark:border-gray-800">
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					{feedback && (
						<div className="col-span-2">
							<Alert
								variant={feedback?.variant}
								title={feedback?.title}
								message={feedback?.message}
							/>
						</div>
					)}
					{/* <div>
						<Label>Número de factura (Opcional)</Label>
						<InputField
							placeholder="Ej. FV-0001"
							name=""
							onChange={handleChange}
						/>
					</div>
					<div>
						<Label>Cliente (Opcional)</Label>
						<InputField
							placeholder="Nombre del cliente"
							name=""
							onChange={handleChange}
						/>
					</div> */}
					<div>
						<Label>Cliente (Opcional)</Label>
						<InputField
							placeholder="Nombre del cliente"
							name="client"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Observación (Opcional)</Label>
						<InputField
							name="observation"
							value={formData?.observation}
							onChange={handleChange}
						/>
					</div>

					<div>
						<Label>Método de Pago*</Label>
						<Select
							options={listPaymentMethods}
							placeholder="Selecionar una opción"
							onChange={(value) => setPaymentMethod(Number(value))}
							className="dark:bg-dark-900"
						/>
					</div>

					<div>
						<Label>Estado de Pago*</Label>
						<Select
							options={listSaleStatus}
							placeholder="Selecionar una opción"
							onChange={(value) => setPaymentStatus(Number(value))}
							className="dark:bg-dark-900"
						/>
					</div>
				</div>
			</div>
			<div className="p-4 sm:p-8">
				<div className="space-y-6">
					<FormSearch onSubmit={handleSearch} isLoading={isSearching} />

					<FormAddItem product={selectedProduct} onSubmit={handleAddItem} />
					<SaleItemsTable
						items={items}
						onRemove={(itemId) =>
							setItems((currentItems) =>
								currentItems.filter((item) => item.id !== itemId),
							)
						}
					/>
					<SaleSummary items={items} />
					<div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
						<Button
							variant="outline"
							type="button"
							disabled={items.length === 0}
							onClick={handleCancel}
						>
							Cancelar
						</Button>
						<Button
							type="button"
							disabled={items.length === 0}
							onClick={handleSave}
						>
							Guardar venta
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
