export type ProductId = number;
export type ProductStatus = "active" | "inactive"; // active: venta válida, aparece en caja y reportes.
export type SaleId = number;
export type SaleItemId = number;
export type SaleStatus = "active" | "cancelled"; // cancelled: venta anulada/eliminada lógicamente, no aparece en el listado principal ni suma en reportes.

export interface Product {
	id: ProductId;
	name: string;
	image: string;

	currentCost: number;
	currentSalePrice: number;

	status: ProductStatus;

	createdAt: string;
	updatedAt: string;
	deletedAt?: string | null; // deletedAt: fecha en la que se anuló o eliminó lógicamente.
}

export interface SaleItem {
	id: SaleItemId;
	saleId: SaleId;
	productId: ProductId;

	productName: string;
	productImage: string;

	quantity: number;

	costUnitAtSale: number;
	priceUnitAtSale: number;

	subtotal: number;
	profitUnit: number;
	profitTotal: number;
}

export interface Sale {
	id: SaleId;
	saleDate: string; // ISO date: "2026-07-09"

	status: SaleStatus;

	totalAmount: number;
	totalCost: number;
	totalProfit: number;

	notes?: string | null;

	items: SaleItem[];

	createdAt: string;
	updatedAt: string;
	deletedAt?: string | null;
}

// Para crear una venta manual
export interface CreateSaleItemInput {
	productId: ProductId;

	productName: string;
	productImage: string;

	quantity: number;

	costUnitAtSale: number;
	priceUnitAtSale: number;
}

export interface CreateSaleInput {
	saleDate: string;
	notes?: string | null;
	items: CreateSaleItemInput[];
}

// Para editar una venta manual
export interface UpdateSaleInput {
	id: SaleId;
	saleDate?: string;
	notes?: string | null;
	items?: UpdateSaleItemInput[];
}

export interface UpdateSaleItemInput {
	id?: SaleItemId;
	productId: ProductId;

	productName: string;
	productImage: string;

	quantity: number;

	costUnitAtSale: number;
	priceUnitAtSale: number;
}

// Para el datatable
export interface SaleProductPreview {
	productId: ProductId;
	productName: string;
	productImage: string;
	quantity: number;
}

export interface SaleTableRow {
	id: SaleId;
	saleDate: string;

	status: SaleStatus;

	productsPreview: SaleProductPreview[];

	itemsCount: number;
	totalQuantity: number;

	totalAmount: number;
	totalCost: number;
	totalProfit: number;

	notes?: string | null;

	createdAt: string;
	deletedAt?: string | null;
}
