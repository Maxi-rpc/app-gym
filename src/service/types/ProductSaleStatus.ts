export interface ProductSaleStatus {
	id?: string;
	created_at?: string;
	name?: string;
	description?: string;
	updated_at?: string;
}

export interface CreateProductSaleStatus {
	name?: string;
	description?: string;
}

export interface UpdateProductSaleStatus {
	id?: string;
	name?: string;
	description?: string;
}
