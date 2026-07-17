export interface Status {
	id: number;
	name: string;
	description: string;
}

export interface Role {
	id: number;
	name: string;
	description: string;
}

export interface UserRole {
	role: Role;
}

export interface Profile {
	id: string;
	created_at: string;
	email: string;
	name: string;
	last_name: string;
	document: string | null;
	phone: string | null;
	image: string | null;
	status_id: number;
	updated_at: string;
	qr_token: string;
	status: Status;
	user_roles: UserRole[];
}

export interface ProfileResponse {
	profile: Profile;
}
