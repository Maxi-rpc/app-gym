export interface ProductStatus {
	id: number;
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
	id: number;
	name: string;
	description?: string;
}
