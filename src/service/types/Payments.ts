export interface Profile {
    id: string;
    name: string;
    last_name: string;
}

export interface Membership {
    id: string;
    active: boolean;
    user_id: string;
    client: {
        profile: Profile;
    };
    end_date: string;
    start_date: string;
    next_due_date: string;
}

export interface Employee {
    user_id: string;
    profile: Profile;
}

export interface Payment_method {
    id: number;
    name: string;
    description: string;
}

export interface Payment_status {
    id: number;
    name: string;
    description: string;
}

export interface Membership_payment {
    id: string;
    created_at: string;
    client_membership_id: string;
    employee_id: string;
    original_amount: number;
    discount: number;
    amount_paid: number;
    payment_method_id: number;
    payment_date: string;
    billing_period: string;
    next_due_date: string;
    status_id: number;
    receipt_number: string;
    observations: string;
    updated_at: string;
    membership: Membership;
    employee: Employee;
    payment_method: Payment_method;
    payment_status: Payment_status;
}

export interface CreateMembershipPaymentInput {
    client_id: string;
    service_id: number;
    observations?: string;
    discount_percentage: number;
    amount_paid: number;
    payment_method_id: number;
    receipt_number?: string;
}

export interface UpdateMembershipPaymentsInput {
    id: string;
    payment_date: string;
    update_period_dates: boolean;
}

export interface DeleteMembershipPaymentInput {
    id: string;
}

export type MembershipPaymentPageSize = 5 | 10 | 15 | 20;

export type MembershipPaymentSortKey =
    'id' | 'name' | 'last_name' | 'payment_date' | 'status' | 'updated_at';

export interface GetMembershipPaymentsInput {
    page?: number;
    pageSize?: MembershipPaymentPageSize;
    search?: string;
    sortBy?: MembershipPaymentSortKey;
    sortDirection?: 'asc' | 'desc';
    paymentDateFrom?: string;
    paymentDateBefore?: string;
}

export interface MembershipPaymentPagination {
    page: number;
    pageSize: MembershipPaymentPageSize;
    total: number;
    totalPages: number;
}
