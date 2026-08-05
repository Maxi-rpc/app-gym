import { supabase } from "../utils/supabase";

async function getAll() {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("dashboard", {
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
		method: "GET",
	});

	return { data: data?.data, error: error };
}

export const dashboardService = {
	getAll,
};
