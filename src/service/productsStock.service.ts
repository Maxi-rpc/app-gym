import { supabase } from "../utils/supabase";

import { CreateStocktInput } from "./types/ProductStock";

async function getAll() {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"get-stock-movements",
		{
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
			method: "GET",
		},
	);

	return { data: data?.data, error: error };
}

async function adjustStock(formData: CreateStocktInput) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("adjust-stock", {
		body: {
			id: formData.id,
			name: formData.name,
			movement_type: formData.movement_type,
			quantity: formData.quantity,
			previous_stock: formData.previous_stock,
			new_stock: formData.new_stock,
			reference_id: formData.reference_id,
			observation: formData.observation,
		},
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
		method: "POST",
	});

	return { data: data, error: error };
}

export const productStockService = {
	getAll,
	adjustStock,
};
