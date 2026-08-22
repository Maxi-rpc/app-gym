import { supabase } from "../utils/supabase";

import { CreateProductSale, UpdateProductSale } from "./types/ProductSale";

async function getAll() {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"register-product-sale",
		{
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
			method: "GET",
		},
	);

	return { data: data?.data, error: error };
}

async function create(formData: CreateProductSale) {
	console.log(formData);

	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"register-product-sale",
		{
			body: {
				original_amount: formData.original_amount,
				discount: formData.discount,
				total_amount: formData.total_amount,
				payment_method_id: formData.payment_method_id,
				status_id: formData.status_id,
				observation: formData.observation,
				sale_items: formData.sale_items,
			},
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
			method: "POST",
		},
	);

	return { data: data, error: error };
}

async function update(formData: UpdateProductSale) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"register-product-sale",
		{
			body: {
				id: formData.id,
				original_amount: formData.original_amount,
				discount: formData.discount,
				total_amount: formData.total_amount,
				payment_method_id: formData.payment_method_id,
				payment_date: formData.payment_date,
				status_id: formData.status_id,
				observation: formData.observation,
				sale_items: formData.sale_items,
			},
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
			method: "PUT",
		},
	);

	return { data: data, error: error };
}

export const productSaleService = {
	getAll,
	create,
	update, // todo
};
