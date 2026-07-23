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
	const { data, error } = await supabase.functions.invoke("get-profile-by-id", {
		body: { id },
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
	});

	if (error) throw error;
	return data?.profile;
}

export const profileService = {
	getById,
};
