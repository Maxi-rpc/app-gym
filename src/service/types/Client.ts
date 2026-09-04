import { Profile } from "../../context/types/Profile";

export interface ClientProfile {
	user_id: string;
	created_at: string;
	height: number | null;
	weight: number | null;
	emergency_contact: string | null;
	medical_notes: string | null;
	updated_at: string;
}

export interface Client extends ClientProfile {
	profile: Profile;
}

export interface CreateClientInput {
	email?: string;
	name?: string;
	last_name?: string;
	document?: string | null;
	phone?: string | null;
	image?: string | null;
	birth_date?: string | null;
	height: number | null;
	weight: number | null;
	emergency_contact: string | null;
	medical_notes: string | null;
}

export interface UpdateClientInput {
	user_id?: string;
	height: number | null;
	weight: number | null;
	emergency_contact: string | null;
	medical_notes: string | null;
}

export interface DeleteClientInput {
	id: string;
}

export type ClientPageSize = 5 | 10 | 15 | 20;

export type ClientSortKey =
	| "user_id"
	| "name"
	| "last_name"
	| "created_at"
	| "status"
	| "updated_at";

export interface GetClientsInput {
	page?: number;
	pageSize?: ClientPageSize;
	search?: string;
	sortBy?: ClientSortKey;
	sortDirection?: "asc" | "desc";
}

export interface ClientsPagination {
	page: number;
	pageSize: ClientPageSize;
	total: number;
	totalPages: number;
}
