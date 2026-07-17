// asumiendo que ya tienes:
// const supabase = createClient(supabaseUrl, supabaseKey);
import { supabase } from "../utils/supabase";

export default async function getProfile(id: string) {
	// 1) Obtener el token desde la sesión actual (si aplica)
	// Si "session_token" ya lo tienes, puedes usarlo directo en vez de esto.
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"get-profile-with-status",
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

// uso:
// const result = await getProfileWithStatus("UUID_O_CUALQUIER_ID");
// console.log(result);
