import { supabase } from "../utils/supabase";

import {
	CreateUserStatusInput,
	UpdateUserStatusInput,
} from "./types/UserStatus";

async function getAll() {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("user-status", {
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
		method: "GET",
	});

	return { data: data?.data, error: error };
}

async function create(formData: CreateUserStatusInput) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("user-status", {
		body: {
			name: formData.name,
			description: formData.description,
		},
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
		method: "POST",
	});

	return { data: data, error: error };
}

async function update(formData: UpdateUserStatusInput) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("roles", {
		body: {
			id: formData.id || "",
			name: formData.name || "",
			description: formData.description || "",
		},
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
		method: "PUT",
	});

	return { data: data, error: error };
}

export const userStatusService = {
	getAll,
	create,
	update,
};
