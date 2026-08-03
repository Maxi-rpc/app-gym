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

/*
{
  "clients": {
    "total": 185,
    "new_this_month": 12,
    "active": 163,
    "inactive": 22
  },
  "payments": {
    "month": 4850000,
    "year": 39200000,
    "today": 85000
  },
  "attendance": {
    "today": 58,
    "week": 312,
    "month": 1218
  },
  "charts": {
    "payments_by_month": [
      { "month": "Ene", "amount": 3200000 },
      { "month": "Feb", "amount": 3500000 }
    ],
    "attendance_by_hour": [
      { "hour": 7, "count": 12 },
      { "hour": 8, "count": 25 }
    ],
    "attendance_by_day": [
      { "day": "Lun", "count": 180 }
    ]
  }
}
*/