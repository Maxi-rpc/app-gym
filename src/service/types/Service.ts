export interface Service {
	id: string;
	created_at: string;
	name: string;
	description: string | null;
	price: number;
	duration_days: number;
	active: boolean;
	updated_at: string;
}

export interface CreateServiceInput {
	name: string;
	description: string | null;
	price: number;
	duration_days: number;
}

export interface UpdateServiceInput {
	id: string;
	name: string;
	description: string | null;
	price: number;
	duration_days: number;
	active: boolean;
}
