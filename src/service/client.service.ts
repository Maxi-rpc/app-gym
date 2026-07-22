import { supabase } from "../utils/supabase";

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

async function create() {
	console.log("clientService.create");
}

async function update() {
	console.log("clientService.update");
}

async function remove() {
	console.log("clientService.remove");
}

export const clientService = {
	getAll,
	getById,
	create, // to do
	update, // to do
	remove, // to do
};
