import { ProductSaleItem } from "./ProductSaleItem";

export interface ProductSale {
	id?: string;
	created_at?: string;
	updated_at?: string;
	employee_id?: string;
	client_id?: string;
	original_amount?: number;
	discount?: number;
	total_amount?: number;
	payment_method_id?: number; // PaymentMethods.id
	payment_date?: string;
	status_id?: number; // ProductSaleStatus.id
	observation?: string;
}

export interface CreateProductSale {
	client_id?: string;
	original_amount?: number;
	discount?: number;
	total_amount?: number;
	payment_method_id?: number; // PaymentMethods.id
	status_id?: number; // ProductSaleStatus.id
	observation?: string;
	sale_items?: ProductSaleItem[];
}

export interface UpdateProductSale {
	id?: string;
	client_id?: string;
	original_amount?: number;
	discount?: number;
	total_amount?: number;
	payment_method_id?: number; // PaymentMethods.id
	payment_date?: string;
	status_id?: number; // ProductSaleStatus.id
	observation?: string;
	sale_items?: ProductSaleItem[];
}
