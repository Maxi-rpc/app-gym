import { supabase } from '../utils/supabase';
import {
    CreateMembershipPaymentInput,
    UpdateMembershipPaymentsInput,
    DeleteMembershipPaymentInput,
    GetMembershipPaymentsInput,
} from './types/Payments';

async function getByClient(id: string) {
    // 1) Obtener el token desde la sesión actual (si aplica)
    // Si "session_token" ya lo tienes, puedes usarlo directo en vez de esto.
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'get-membership-payments-by-id',
        {
            body: { id },
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
        },
    );

    return { data: data?.membership_payments, error: error };
}

async function getAll(input: GetMembershipPaymentsInput = {}) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'get-membership-payments-all',
        {
            body: input,
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
            method: 'POST',
        },
    );

    return {
        data: data?.data?.membership_payments,
        pagination: data?.data?.pagination,
        error: error,
    };
}

async function create(formData: CreateMembershipPaymentInput) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'register-membership-payment',
        {
            body: {
                client_id: formData.client_id,
                service_id: formData.service_id,
                billing_period_id: formData.billing_period_id,
                discount_percentage: formData.discount_percentage,
                amount_paid: formData.amount_paid,
                payment_method_id: formData.payment_method_id,
                receipt_number: formData.receipt_number,
                observations: formData.observations,
            },
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
        },
    );

    return { data: data, error: error };
}

async function update(formData: UpdateMembershipPaymentsInput) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'update-membership-payment',
        {
            body: {
                id: formData.id,
                payment_date: formData.payment_date,
                update_period_dates: formData.update_period_dates,
            },
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
        },
    );

    return { data: data, error: error };
}

async function remove(formData: DeleteMembershipPaymentInput) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'remove-membership-payment',
        {
            body: {
                id: formData.id,
            },
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
            method: 'DELETE',
        },
    );

    return { data: data, error: error };
}

export const paymentsService = {
    getAll,
    getByClient,
    create,
    update,
    remove,
};
