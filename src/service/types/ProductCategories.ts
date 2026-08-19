export interface ProductCategories {
	id: number;
	created_at: string;
	name: string;
	description: string;
	updated_at: string;
}

export interface CreateProductCategoriesInput {
	name: string;
	description?: string;
}

export interface UpdateProductCategoriesInput {
	id: number;
	name: string;
	description?: string;
}
