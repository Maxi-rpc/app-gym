export interface ProductCategories {
	id: string;
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
	id: string;
	name: string;
	description?: string;
}
