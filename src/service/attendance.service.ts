import { supabase } from "../utils/supabase";
import {
	RegisterAttendanceInput,
	UpdateAttendanceInput,
} from "./types/Attendance";

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
		"get-attendance-by-id",
		{
			body: { id },
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
		},
	);

	return { data: data?.attendances, error: error };
}

async function getAll() {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"get-attendance-all",
		{
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
			method: "GET",
		},
	);

	return { data: data?.attendances, error: error };
}

async function register(formData: RegisterAttendanceInput) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"create-attendance-by-qr",
		{
			body: {
				qr_token: formData.qr_token,
				check_in_at: formData.check_in_at,
				check_out_at: formData.check_out_at,
			},
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
		},
	);

	return { data: data, error: error };
}

async function create() {
	console.log("attendanceService.create");
}

async function update(formData: UpdateAttendanceInput) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke(
		"update-attendance-by-id",
		{
			body: {
				id: formData.id,
				check_in_at: formData.check_in_at,
				check_out_at: formData.check_out_at,
				access_granted: formData.access_granted,
				access_reason: formData.access_reason,
			},
			headers: {
				Authorization: `Bearer ${session_token}`,
			},
		},
	);

	return { data: data, error: error };
}

interface formDelete {
	id: string;
}

async function remove(formData: formDelete) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("remove-attendance", {
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

export const attendanceService = {
	getAll,
	getById,
	register,
	create, // to do
	update, // to do
	remove,
};
