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
	const { data, error } = await supabase.functions.invoke(
		"get-employee-by-id",
		{
			body: { id },
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
		},
	);

	if (error) throw error;
	return data;
}

async function getAll() {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("get-employee-all", {
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
		method: "GET",
	});

	if (error) throw error;
	return data?.employeers;
}

export interface FormData {
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
	const { data, error } = await supabase.functions.invoke("create-employee", {
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

async function update() {
	console.log("clientService.update");
}

async function remove() {
	console.log("clientService.remove");
}

export const employeeService = {
	getAll,
	getById,
	create, // to do
	update, // to do
	remove, // to do
};
