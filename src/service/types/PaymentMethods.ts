export interface PaymentMethods {
	id: string;
	created_at: string;
	name: string;
	description: string;
	updated_at: string;
}

export interface CreatePaymentMethodsInput {
	name: string;
	description: string;
}

export interface UpdatePaymentMethodsInput {
	id: string;
	name: string;
	description: string;
}
