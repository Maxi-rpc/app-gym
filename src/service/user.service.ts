import { supabase } from "../utils/supabase";
import { User } from "./types/User";

async function update_password(formData: User) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"change-user-password",
		{
			body: {
				id: formData?.id,
				password: formData?.password,
			},
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
		},
	);

	return { data: data, error: error };
}

export const userService = {
	update_password,
};
