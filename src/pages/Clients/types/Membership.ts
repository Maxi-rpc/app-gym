export interface Service {
	id: number;
	name: string;
	price: number;
}

export interface Membership {
	id: string;
	created_at: string;
	start_date: string;
	end_date: string;
	active: boolean;
	next_due_date: string;
	observations: string;
	service: Service;
}
