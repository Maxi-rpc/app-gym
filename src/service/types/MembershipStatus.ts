export interface MembershipStatus {
	id: string;
	created_at: string;
	name: string;
	description: string;
	updated_at: string;
}

export interface CreateMembershipStatusInput {
	name: string;
	description: string;
}

export interface UpdateMembershipStatusInput {
	id: string;
	name: string;
	description: string;
}
