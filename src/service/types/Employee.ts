import { Profile } from "../../context/types/Profile";

export interface EmployeeProfile {
	user_id?: string;
	created_at?: string;
	salary?: number | null;
	hire_date?: Date | null;
	specialist?: string;
	employee_number?: string;
	observations?: string;
	updated_at?: string;
}

export interface Employee extends EmployeeProfile {
	profile: Profile;
}

export interface CreateEmployeeInput {
	salary?: number | null;
	hire_date?: string | null;
	specialist?: string | null;
	employee_number?: string | null;
	observations?: string | null;
}

export interface UpdateEmployeeInput {
	user_id?: string;
	salary?: number | null;
	hire_date?: string | null;
	specialist?: string | null;
	employee_number?: string | null;
	observations?: string | null;
}
