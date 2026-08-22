export interface SaleItem {
	id: string;
	product_id: string;
	name: string;
	unit_price: number;
	quantity: number;
	discount: number;
}

export const getItemTotal = (item: SaleItem) =>
	item.unit_price * item.quantity * (1 - item.discount / 100);
