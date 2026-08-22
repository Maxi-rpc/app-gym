export interface ProductSaleItem {
	id?: string;
	created_at?: string;
	updated_at?: string;
	sale_id?: string; // ProductSale.id
	product_id?: string; // Product.id
	quantity?: number;
	unit_price?: number;
	subtotal?: number;
}

export interface CreateProductSaleItem {
	product_id?: string; // Product.id
	quantity?: number;
	unit_price?: number;
	subtotal?: number;
}

export interface UpdateProductSaleItem {
	id?: string;
	sale_id?: string; // ProductSale.id
	product_id?: string; // Product.id
	quantity?: number;
	unit_price?: number;
	subtotal?: number;
}
