export interface Employee {
	user_id: string;
	created_at: string;
	salary: number | null;
	hire_date: string | null;
	specialist: string | null;
	employee_number: string | null;
	observations: string;
	updated_at: string;
}

export interface EmployeeResponse {
	employee: Employee;
}
