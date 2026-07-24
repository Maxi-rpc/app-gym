import { supabase } from "../utils/supabase";
import { UpdateClientInput } from "./types/Client";

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

async function getAll() {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("get-client-all", {
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
		method: "GET",
	});

	if (error) throw error;
	return data?.clients;
}

interface FormData {
	name: string;
	last_name: string;
	document: string;
	phone: string;
	birth_date: string;
	email: string;
}

async function create(formData: FormData) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("create-client", {
		body: {
			name: formData?.name,
			last_name: formData?.last_name,
			document: formData?.document,
			phone: formData?.phone,
			birth_date: formData?.birth_date,
			email: formData?.email,
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

async function remove() {
	console.log("clientService.remove");
}

export const clientService = {
	getAll,
	getById,
	create,
	update,
	remove, // to do
};
