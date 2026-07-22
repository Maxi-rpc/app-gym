export interface Client {
	user_id: string;
	created_at: string;
	height: number | null;
	weight: number | null;
	emergency_contact: string | null;
	medical_notes: string | null;
	updated_at: string;
}
