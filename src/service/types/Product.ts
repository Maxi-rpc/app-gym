import { ProductCategories } from "./ProductCategories";
import { ProductStatus } from "./ProductStatus";

export interface Product {
	id: string;
	created_at: string;
	updated_at: string;
	name: string;
	description: string | null;
	category: ProductCategories;
	sku: string;
	barcode: string;
	cost_price: number;
	sale_price: number;
	stock: number;
	minimum_stock: number;
	status: ProductStatus;
	image?: string;
}

export interface CreateProductInput {
	name: string;
	description?: string | null;
	category: number;
	sku?: string;
	barcode?: string;
	cost_price: number;
	sale_price: number;
	stock: number;
	minimum_stock: number;
	image?: string;
}

export interface UpdateProductInput {
	id: string;
	name: string;
	description?: string | null;
	category: number;
	sku?: string;
	barcode?: string;
	cost_price: number;
	sale_price: number;
	stock?: number;
	minimum_stock?: number;
	status: number;
	image?: string;
}

/*

  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone null,
  name text not null,
  description text null,
  category_id bigint not null,
  sku text not null,
  barcode text not null,
  cost_price numeric not null default '0'::numeric,
  sale_price numeric not null default '0'::numeric,
  stock bigint not null default '0'::bigint,
  minimum_stock bigint not null default '0'::bigint,
  status_id bigint not null,

*/
