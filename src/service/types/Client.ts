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
