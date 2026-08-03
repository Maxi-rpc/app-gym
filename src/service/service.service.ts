import { supabase } from "../utils/supabase";

import { CreateServiceInput, UpdateServiceInput } from "./types/Service";

async function getAll() {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("services", {
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
		method: "GET",
	});

	return { data: data?.data, error: error };
}

async function create(formData: CreateServiceInput) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("services", {
		body: {
			name: formData.name,
			description: formData.description,
			price: formData.price,
			duration_days: formData.duration_days,
			active: true,
		},
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
		method: "POST",
	});

	return { data: data, error: error };
}

async function update(formData: UpdateServiceInput) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("services", {
		body: {
			id: formData.id || "",
			name: formData.name || "",
			description: formData.description || "",
			price: formData.price || 0,
			duration_days: formData.duration_days || 0,
			active: formData.active || true,
		},
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
		method: "PUT",
	});

	return { data: data, error: error };
}

export const serviceService = {
	getAll,
	create,
	update,
};
