import { getItemTotal, SaleItem } from "./sale.types";

import { Lineicons } from "@lineiconshq/react-lineicons";
import { Trash3Outlined } from "@lineiconshq/free-icons";

type Props = { items: SaleItem[]; onRemove: (itemId: string) => void };

const formatCurrency = (amount: number) =>
	new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(
		amount,
	);

export default function SaleItemsTable({ items, onRemove }: Props) {
	return (
		<div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
			<div className="custom-scrollbar overflow-x-auto">
				<table className="min-w-full text-left text-sm text-gray-700 dark:border-gray-800">
					<thead className="bg-gray-50 dark:bg-gray-900">
						<tr className="border-b border-gray-100 whitespace-nowrap dark:border-gray-800">
							<th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
								#
							</th>
							<th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
								Producto
							</th>
							<th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
								Cantidad
							</th>
							<th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
								Precio unitario
							</th>
							<th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
								Descuento
							</th>
							<th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
								Total
							</th>
							<th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
								Acción
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-white/3">
						{items.length === 0 ? (
							<tr>
								<td
									colSpan={7}
									className="px-5 py-8 text-center text-gray-500 dark:text-gray-400"
								>
									Todavía no agregaste productos a la venta.
								</td>
							</tr>
						) : (
							items.map((item, index) => (
								<tr key={item.id}>
									<td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
										{index + 1}
									</td>
									<td className="px-5 py-4 font-medium text-gray-800 dark:text-white/90">
										{item.name}
									</td>
									<td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
										{item.quantity}
									</td>
									<td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
										{formatCurrency(item.unit_price)}
									</td>
									<td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
										{item.discount}%
									</td>
									<td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
										{formatCurrency(getItemTotal(item))}
									</td>
									<td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
										<button
											type="button"
											onClick={() => onRemove(item.id)}
											className="text-error-500 hover:text-error-600"
											aria-label={`Eliminar ${item.name}`}
										>
											<Lineicons icon={Trash3Outlined} size={20} />
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
