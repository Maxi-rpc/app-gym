export interface ProductStatus {
	id: string;
	created_at: string;
	name: string;
	description: string;
	updated_at: string;
}

export interface CreateProductStatusInput {
	name: string;
	description?: string;
}

export interface UpdateProductStatusInput {
	id: string;
	name: string;
	description?: string;
}
