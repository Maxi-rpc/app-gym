export interface UserStatus {
	id: string;
	created_at: string;
	name: string;
	description: string;
	updated_at: string;
}

export interface CreateUserStatusInput {
	name: string;
	description: string;
}

export interface UpdateUserStatusInput {
	id: string;
	name: string;
	description: string;
}
