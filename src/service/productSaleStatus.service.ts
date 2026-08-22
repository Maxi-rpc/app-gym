import { supabase } from "../utils/supabase";

import {
	CreateProductSaleStatus,
	UpdateProductSaleStatus,
} from "./types/ProductSaleStatus";

async function getAll() {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"product-sale-status",
		{
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
			method: "GET",
		},
	);

	return { data: data?.data, error: error };
}

async function create(formData: CreateProductSaleStatus) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"product-sale-status",
		{
			body: {
				name: formData.name,
				description: formData.description,
			},
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
			method: "POST",
		},
	);

	return { data: data, error: error };
}

async function update(formData: UpdateProductSaleStatus) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"product-sale-status",
		{
			body: {
				id: formData.id || 0,
				name: formData.name || "",
				description: formData.description || "",
			},
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
			method: "PUT",
		},
	);

	return { data: data, error: error };
}

export const productSaleStatusService = {
	getAll,
	create,
	update,
};
