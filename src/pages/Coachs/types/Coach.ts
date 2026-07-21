import { Profile } from "../../../../context/types/Profile";

export interface Coach {
	user_id: string;
	created_at: string;
	salary: string | null;
	hire_date: string;
	specialist: string;
	employee_number: string;
	observations: string;
	updated_at: string;
	profile: Profile;
}

