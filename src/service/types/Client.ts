import { Profile } from "../../context/types/Profile";

export interface Client {
	user_id: string;
	created_at: string;
	height: number;
	weight: number;
	emergency_contact: string;
	medical_notes: string;
	updated_at: string;
	profile: Profile;
}
