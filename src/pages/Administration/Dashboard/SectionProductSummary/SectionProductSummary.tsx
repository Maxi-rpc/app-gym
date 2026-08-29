import CardSummary from "../Cards/CardSummary";

import { ProductSummary } from "../../../../service/types/Dashboard";

type Props = {
	product: ProductSummary | null;
};

export default function SectionProductSummary({ product }: Props) {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
			<div className="col-span-1 md:col-span-2 xl:col-span-4">
				<h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
					Productos
				</h3>
			</div>

			<CardSummary title="Ventas hoy" total={product?.sales_today} />

			<CardSummary title="Facturación" total={product?.revenue_month} />

			<CardSummary title="Unidades" total={product?.units_sold_month} />

			<CardSummary
				title={"Más vendido" + " " + product?.top_product_name}
				total={product?.top_product_quantity}
			/>
		</div>
	);
}
