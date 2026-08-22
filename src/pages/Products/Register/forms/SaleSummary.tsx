import { getItemTotal, SaleItem } from "./sale.types";

import { formatLocalMoney } from "../../../../utils/number";

type Props = { items: SaleItem[] };

export default function SaleSummary({ items }: Props) {
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
	return (
		<div className="ml-auto w-full space-y-2 sm:w-64">
			<p className="mb-4 text-sm font-medium text-gray-800 dark:text-white/90">
				Resumen de la venta
			</p>
			<div className="flex justify-between gap-5 text-sm">
				<span className="text-sm text-gray-500 dark:text-gray-400">
					Subtotal
				</span>
				<span className="text-sm text-gray-500 dark:text-gray-400">
					{formatLocalMoney(subtotal)}
				</span>
			</div>
			<div className="flex justify-between gap-5 text-sm">
				<span className="text-sm text-gray-500 dark:text-gray-400">
					Descuentos
				</span>
				<span className="text-sm text-gray-500 dark:text-gray-400">
					-{formatLocalMoney(totalDiscount)}
				</span>
			</div>
			<div className="flex justify-between gap-5 border-t border-gray-200 pt-2 font-semibold dark:border-gray-700">
				<span className="font-medium text-gray-700 dark:text-gray-400">
					Total
				</span>
				<span className="text-lg font-semibold text-gray-800 dark:text-white/90">
					{formatLocalMoney(total)}
				</span>
			</div>
		</div>
	);
}
