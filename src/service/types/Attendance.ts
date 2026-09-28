import { Membership_status } from './Membership';

export interface User {
    id: string;
    name: string;
    document: string;
    last_name: string;
}

export interface Membership {
    id: string;
    end_date: string;
    start_date: string;
    membership_status: Membership_status;
}

export interface Created_by_profile {
    id: string;
    name: string;
    last_name: string;
}

export interface Attendance {
    id: string;
    check_in_at: string;
    check_out_at: string;
    access_granted: boolean;
    access_reason: string;
    user: User;
    membership: Membership;
    created_by_profile: Created_by_profile;
}

// automatico
export interface RegisterAttendanceInput {
    qr_token: string;
    check_in_at: string;
    check_out_at?: string | null;
    access_granted?: boolean;
    access_reason?: string;
}

export interface RegisterAttendanceTerminalInput {
    qr_token?: string;
    dni?: string;
    check_in_at?: string;
    check_out_at?: string;
}

// manual

// update
export interface UpdateAttendanceInput {
    id: string;
    check_in_at: string;
    new_check_in_at?: string | null;
    check_out_at: string | null;
    new_check_out_at?: string | null;
    access_granted: boolean;
    access_reason: string;
}

export interface DeleteAttendanceInput {
    id: string;
}

export type AttendancePageSize = 5 | 10 | 15 | 20;

export type AttendanceSortKey =
    | 'id'
    | 'name'
    | 'last_name'
    | 'check_in_at'
    | 'access_granted'
    | 'membership_status'
    | 'created_by_profile';

export interface GetAttendancesInput {
    page?: number;
    pageSize?: AttendancePageSize;
    search?: string;
    sortBy?: AttendanceSortKey;
    sortDirection?: 'asc' | 'desc';
}

export interface AttendancersPagination {
    page: number;
    pageSize: AttendancePageSize;
    total: number;
    totalPages: number;
}
