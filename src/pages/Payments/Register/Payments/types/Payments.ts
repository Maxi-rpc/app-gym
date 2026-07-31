export interface Service {
	id: string;
	name: string;
}

export interface Membership {
	id: string;
	service: Service;
	client_id: string;
}

export interface Payment_method {
	id: string;
	name: string;
}

export interface Payment_status {
	id: string;
	name: string;
}

export interface Payments {
	id: string;
	created_at: string;
	original_amount: number;
	discount: number;
	amount_paid: number;
	payment_date: string;
	billing_period: string;
	next_due_date: string;
	receipt_number: string;
	observations: string;
	membership: Membership;
	payment_method: Payment_method;
	status: Payment_status;
}
