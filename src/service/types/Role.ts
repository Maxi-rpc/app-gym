export interface Role {
	id: string;
	created_at: string;
	name: string;
	description: string;
	updated_at: string;
}

export interface CreateRoleInput {
	name: string;
	description: string;
}

export interface UpdateRoleInput {
	id: string;
	name: string;
	description: string;
}
