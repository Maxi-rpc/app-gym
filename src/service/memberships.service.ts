import { supabase } from "../utils/supabase";

async function getByClientId(id: string) {
	// 1) Obtener el token desde la sesión actual (si aplica)
	// Si "session_token" ya lo tienes, puedes usarlo directo en vez de esto.
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"get-memberships-client-by-id",
		{
			body: { id },
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
		},
	);

	if (error) throw error;
	return data?.memberships;
}

async function getAll() {
	console.log("membershipsService.getAll");
}

async function create() {
	console.log("membershipsService.create");
}

async function update() {
	console.log("membershipsService.update");
}

async function remove() {
	console.log("membershipsService.remove");
}

export const membershipsService = {
	getAll, // to do
	getByClientId,
	create, // to do
	update, // to do
	remove, // to do
};
