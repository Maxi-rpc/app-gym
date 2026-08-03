import { supabase } from "../utils/supabase";
import {
	CreateMembershipPaymentInput,
	UpdateMembershipPaymentsInput,
	DeleteMembershipPaymentInput,
} from "./types/Payments";

async function getByClient(id: string) {
	// 1) Obtener el token desde la sesión actual (si aplica)
	// Si "session_token" ya lo tienes, puedes usarlo directo en vez de esto.
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"get-membership-payments-by-id",
		{
			body: { id },
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
		},
	);

	return { data: data?.membership_payments, error: error };
}

async function getAll() {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"get-membership-payments-all",
		{
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
			method: "GET",
		},
	);

	return { data: data?.membership_payments, error: error };
}

async function create(formData: CreateMembershipPaymentInput) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"register-membership-payment",
		{
			body: {
				client_id: formData?.client_id,
				service_id: formData?.service_id,
				start_date: formData?.start_date || null,
				end_date: formData?.end_date || null,
				observations: formData?.observations,
				original_amount: formData?.original_amount, // payment
				discount: formData?.discount,
				amount_paid: formData?.amount_paid,
				payment_method_id: formData?.payment_method_id, // payment method
				billing_period: formData?.billing_period || null,
				status_id: formData?.status_id, // payment status
				receipt_number: formData?.receipt_number,
			},
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
		},
	);

	return { data: data, error: error };
}

async function update(formData: UpdateMembershipPaymentsInput) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"update-membership-payment",
		{
			body: {
				id: formData?.id,
				original_amount: formData?.original_amount || 0, // payment
				discount: formData?.discount || 0,
				amount_paid: formData?.amount_paid || 0,
				payment_method_id: formData?.payment_method_id, // payment method
				payment_date: formData?.payment_date,
				billing_period: formData?.billing_period || null,
				next_due_date: formData?.next_due_date || null,
				status_id: formData?.status_id, // payment status
				receipt_number: formData?.receipt_number || "",
				observations: formData?.observations,
			},
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
		},
	);

	return { data: data, error: error };
}

async function remove(formData: DeleteMembershipPaymentInput) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"remove-membership-payment",
		{
			body: {
				id: formData.id,
			},
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
			method: "DELETE",
		},
	);

	return { data: data, error: error };
}

export const paymentsService = {
	getAll,
	getByClient,
	create,
	update,
	remove,
};
