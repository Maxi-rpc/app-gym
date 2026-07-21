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
	return data;
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
	create,
	update,
	remove,
};

// get client all
// {
//   "clients": [
//     {
//       "user_id": "2e5b7dce-1230-4bc3-9e1d-3610509e9a86",
//       "created_at": "2026-07-21T16:20:29+00:00",
//       "height": 1.83,
//       "weight": 100,
//       "emergency_contact": null,
//       "medical_notes": null,
//       "updated_at": "2026-07-21T16:20:32+00:00",
//       "profile": {
//         "id": "2e5b7dce-1230-4bc3-9e1d-3610509e9a86",
//         "name": "Maximiliano",
//         "email": "maxirpc2607@gmail.com",
//         "image": null,
//         "phone": null,
//         "status": {
//           "id": 1,
//           "name": "Active",
//           "created_at": "2026-07-11T18:02:46+00:00",
//           "updated_at": "2026-07-11T18:02:55+00:00",
//           "description": ""
//         },
//         "document": null,
//         "qr_token": "1e97d954-67b4-47c9-a414-ebc6f27acc38",
//         "last_name": "Miranda",
//         "status_id": 1,
//         "birth_date": "1992-07-26",
//         "created_at": "2026-07-11T22:20:47+00:00",
//         "updated_at": "2026-07-11T22:22:47+00:00",
//         "user_roles": [
//           {
//             "role": {
//               "id": 1,
//               "name": "Admin",
//               "created_at": "2026-07-11T17:50:13+00:00",
//               "updated_at": "2026-07-11T17:56:57.680852+00:00",
//               "description": "Administrador de la plataforma."
//             },
//             "role_id": 1,
//             "user_id": "2e5b7dce-1230-4bc3-9e1d-3610509e9a86",
//             "created_at": "2026-07-11T22:26:44+00:00"
//           }
//         ]
//       }
//     }
//   ]
// }
