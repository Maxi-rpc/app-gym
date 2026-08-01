import { supabase } from "../utils/supabase";
import {
	CreateEmployeeInput,
	UpdateEmployeeInput,
} from "../service/types/Employee";

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
	return data?.employee;
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

async function create(formData: CreateEmployeeInput) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("create-employee", {
		body: {
			email: formData?.email,
			name: formData?.name,
			last_name: formData?.last_name,
			document: formData?.document,
			phone: formData?.phone,
			birth_date: formData?.birth_date || null,
			salary: formData?.salary,
			hire_date: formData?.hire_date || null,
			specialist: formData?.specialist,
			employee_number: formData?.employee_number,
			observations: formData?.observations,
		},
		headers: {
			Authorization: `Bearer ${session_token}`,
		},
	});

	return { data: data, error: error };
}

async function update(formData: UpdateEmployeeInput) {
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) throw sessionError;
	if (!sessionData?.session) throw new Error("No hay sesión activa");

	const session_token = sessionData.session.access_token;

	// 2) Invocar la Edge Function
	const { data, error } = await supabase.functions.invoke("update-employee", {
		body: {
			id: formData?.user_id,
			salary: formData?.salary,
			hire_date: formData?.hire_date || null,
			specialist: formData?.specialist,
			employee_number: formData?.employee_number,
			observations: formData?.observations,
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

export const employeeService = {
	getAll,
	getById,
	create, // to do
	update, // to do
	remove, // to do
};
