export interface Profile {
	id: string;
	name: string;
	last_name: string;
}

export interface Membership {
	id: string;
	active: boolean;
	user_id: string;
	client: {
		profile: Profile;
	};
	end_date: string;
	start_date: string;
	next_due_date: string;
}

export interface Employee {
	user_id: string;
	profile: Profile;
}

export interface Payment_method {
	id: number;
	name: string;
	description: string;
}

export interface Payment_status {
	id: number;
	name: string;
	description: string;
}

export interface Membership_payment {
	id: string;
	created_at: string;
	client_membership_id: string;
	employee_id: string;
	original_amount: number;
	discount: number;
	amount_paid: number;
	payment_method_id: number;
	payment_date: string;
	billing_period: string;
	next_due_date: string;
	status_id: number;
	receipt_number: number;
	observations: string;
	updated_at: string;
	membership: Membership;
	employee: Employee;
	payment_method: Payment_method;
	payment_status: Payment_status;
}
