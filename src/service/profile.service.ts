import { supabase } from "../utils/supabase";
import { ProfileBase } from "../context/types/Profile";

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

async function update(formData: ProfileBase) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("update-profile", {
		body: {
			id: formData?.id,
			email: formData?.email,
			name: formData?.name,
			last_name: formData?.last_name,
			document: formData?.document,
			phone: formData?.phone,
			birth_date: formData?.birth_date,
		},
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
	});

	console.log("data", data);
	console.log("error", error);

	return { data: data, error: error };
}

export const profileService = {
	getById,
	update,
};
