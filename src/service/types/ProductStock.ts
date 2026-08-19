export interface Product {
	id: string;
	name: string;
}

export interface Employee {
	id: string;
	name: string;
	last_name: string;
}

export interface StockMovement {
	id: string;
	created_at?: string;
	updated_at?: string;
	name?: string;
	movement_type: string;
	quantity: number;
	previous_stock: number;
	new_stock: number;
	reference_id?: string | null;
	observation?: string;
	product: Product;
	employee: Employee;
}

export interface CreateStocktInput {
	id: string;
	name?: string;
	movement_type: string;
	quantity: number;
	previous_stock: number;
	new_stock: number;
	reference_id?: string | null;
	observation?: string;
}

/*
{
	"id": "c26cc087-6348-43bc-9960-ab9adc59dfdb",
	"created_at": "2026-08-19T01:16:18.532641+00:00",
	"updated_at": null,
	"movement_type": "Reposición",
	"quantity": 10,
	"previous_stock": 0,
	"new_stock": 10,
	"reference_id": null,
	"observation": "0",
	"product": {
		"id": "7029b0c6-6027-47a4-9a85-07c1f7463d20",
		"name": "Chicle Top Line"
	},
	"employee": {
		"id": "2e5b7dce-1230-4bc3-9e1d-3610509e9a86",
		"name": "Maximiliano",
		"last_name": "Miranda"
	}
}
*/
