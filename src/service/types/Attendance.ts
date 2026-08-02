export interface User {
	id: string;
	name: string;
	document: string;
	last_name: string;
}

export interface Membership {
	id: string;
	end_date: string;
	start_date: string;
}

export interface Created_by_profile {
	id: string;
	name: string;
	last_name: string;
}

export interface Attendance {
	id: string;
	check_in_at: string;
	check_out_at: string;
	access_granted: boolean;
	access_reason: string;
	user: User;
	membership: Membership;
	created_by_profile: Created_by_profile;
}

// automatico
export interface RegisterAttendanceInput {
	qr_token: string;
	check_in_at: string;
	check_out_at: string | null;
}

// manual
export interface CreateAttendanceInput {
	qr_token: string;
	check_in_at: string;
	check_out_at: string;
	access_granted: boolean;
	access_reason: string;
	user: User;
	created_by: Created_by_profile;
}

// update
export interface UpdateAttendanceInput {
	id: string;
	check_in_at: string;
	check_out_at: string | null;
	access_granted: boolean;
	access_reason: string;
}

export interface DeleteAttendanceInput {
	id: string;
}

/*
{
	"id": "01caa657-04ac-4584-8db8-c34c851d905c",
	"check_in_at": "2026-07-28T23:04:48.633+00:00",
	"check_out_at": null,
	"access_granted": true,
	"access_reason": "Puede ingresar",
	"user": {
		"id": "2e5b7dce-1230-4bc3-9e1d-3610509e9a86",
		"name": "Maximiliano",
		"document": "",
		"last_name": "Miranda"
	},
	"membership": {
		"id": "bcad6f23-a396-46b5-84fb-1c1c99aab291",
		"end_date": null,
		"start_date": "2026-07-02",
		"membership_status": {
			"id": 1,
			"name": "Active",
			"description": "Puede ingresar"
		}
	},
	"created_by_profile": {
		"id": "2e5b7dce-1230-4bc3-9e1d-3610509e9a86",
		"name": "Maximiliano",
		"last_name": "Miranda"
	}
}
*/
