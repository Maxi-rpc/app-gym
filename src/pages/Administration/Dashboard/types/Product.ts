export interface Product {
	id: number; // Unique identifier for each product
	name: string; // Product name
	variants: string; // Product variant
	category: "Golosina" | "Bebida"; // Category of the product
	price: string; // Price of the product (as a string with currency symbol)
	// status: string; // Status of the product
	image: string; // URL or path to the product image
	createDate: string; // Date of sell
}
