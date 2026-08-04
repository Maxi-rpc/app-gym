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
	access_granted: boolean;
	access_reason: string;
}

// manual

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
