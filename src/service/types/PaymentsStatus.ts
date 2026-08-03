export interface PaymentStatus {
	id: string;
	created_at: string;
	name: string;
	description: string;
	updated_at: string;
}

export interface CreatePaymentStatusInput {
	name: string;
	description: string;
}

export interface UpdatePaymentStatusInput {
	id: string;
	name: string;
	description: string;
}
