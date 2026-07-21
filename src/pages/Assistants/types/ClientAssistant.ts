export interface User {
	id: string;
	name: string;
	document: string;
	last_name: string;
}

export interface Membership {
	id: string;
	active: boolean;
	end_date: string;
	start_date: string;
}

export interface ClientAssistant {
	id: string;
	check_in_at: string;
	check_out_at: string;
	access_granted: boolean;
	access_reason: string;
	user: User;
	membership: Membership;
	created_by_profile: User;
}
