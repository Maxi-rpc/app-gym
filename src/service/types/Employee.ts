import { Profile } from "../../context/types/Profile";

export interface EmployeeProfile {
	user_id?: string;
	created_at?: string;
	salary?: number | null;
	hire_date?: string | null;
	specialist?: string;
	employee_number?: string;
	observations?: string;
	updated_at?: string;
}

export interface Employee extends EmployeeProfile {
	profile: Profile;
}

export interface CreateEmployeeInput {
	email?: string;
	name?: string;
	last_name?: string;
	document?: string | null;
	phone?: string | null;
	image?: string | null;
	birth_date?: string | null;
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
