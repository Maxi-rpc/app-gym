import { supabase } from "../utils/supabase";
import {
	CreateClientInput,
	UpdateClientInput,
	DeleteClientInput,
	GetClientsInput,
} from "./types/Client";

async function getById(id: string) {
	// 1) Obtener el token desde la sesión actual (si aplica)
	// Si "session_token" ya lo tienes, puedes usarlo directo en vez de esto.
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("get-client-by-id", {
		body: { id },
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
	});

	if (error) throw error;
	return data?.client;
}

async function getByCustomId(search: string) {
	// search = name, lastname, email, dni
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"get-client-by-custom-search",
		{
			body: { search: search },
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
		},
	);

	return { data: data?.clients, error: error };
}

async function getAll(input: GetClientsInput = {}) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("get-client-all", {
		body: input,
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
		method: "POST",
	});

	return {
		data: data?.data?.clients,
		pagination: data?.data?.pagination,
		error: error,
	};
}

async function create(formData: CreateClientInput) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("create-client", {
		body: {
			email: formData?.email,
			name: formData?.name,
			last_name: formData?.last_name,
			document: formData?.document,
			phone: formData?.phone,
			image: formData?.image,
			birth_date: formData?.birth_date || null,
			height: formData?.height, // client
			weight: formData?.weight,
			emergency_contact: formData?.emergency_contact,
			medical_notes: formData?.medical_notes,
		},
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
	});

	return { data: data, error: error };
}

async function update(formData: UpdateClientInput) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("update-client", {
		body: {
			id: formData?.user_id,
			height: formData?.height,
			weight: formData?.weight,
			emergency_contact: formData?.emergency_contact,
			medical_notes: formData?.medical_notes,
		},
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
	});

	return { data: data, error: error };
}

async function remove(formData: DeleteClientInput) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("remove-user", {
		body: {
			id: formData.id,
		},
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
		method: "DELETE",
	});

	return { data: data, error: error };
}

export const clientService = {
	getAll,
	getById,
	getByCustomId,
	create,
	update,
	remove,
};
