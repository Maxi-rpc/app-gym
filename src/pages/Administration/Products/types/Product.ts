export type Product = {
	id: number; // Unique identifier for each product
	name: string; // Product name
	variants: string; // Product variant
	category: "Golosina" | "Bebida" | string; // Category of the product
	cost: string; // Price of the product (as a string with currency symbol)
	price: string; // Price of the product (as a string with currency symbol)
	amount: string; // Product amount
	status: "Activo" | "Inactivo" | string; // Status of the product
	image: string; // URL or path to the product image
	createDate: string; // Date of buy
	updateDate: string; // Date of update
};
