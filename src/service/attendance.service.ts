import { supabase } from '../utils/supabase';
import {
    GetAttendancesInput,
    RegisterAttendanceInput,
    RegisterAttendanceTerminalInput,
    UpdateAttendanceInput,
    DeleteAttendanceInput,
    GetAttendancesByUserInput,
} from './types/Attendance';

const ARGENTINA_OFFSET = '-03:00';

/**
 * Los valores del formulario son hora local de Argentina sin zona horaria.
 * Los ISO recibidos desde Supabase ya tienen zona, por lo que se conservan.
 */
function toUtcIso(dateTime: string): string {
    const hasTimeZone = /(Z|[+-]\d{2}:\d{2})$/i.test(dateTime);
    const date = new Date(
        hasTimeZone ? dateTime : `${dateTime}${ARGENTINA_OFFSET}`,
    );

    if (Number.isNaN(date.getTime())) {
        throw new RangeError(`Fecha y hora inválida: ${dateTime}`);
    }

    return date.toISOString();
}

async function getByUser(input: GetAttendancesByUserInput) {
    // 1) Obtener el token desde la sesión actual (si aplica)
    // Si "session_token" ya lo tienes, puedes usarlo directo en vez de esto.
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'get-attendance-by-id',
        {
            body: input,
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
        },
    );

    return {
        data: data?.data?.attendances,
        pagination: data?.data?.pagination,
        error,
    };
}

async function getAll(input: GetAttendancesInput = {}) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'get-attendance-all',
        {
            body: input,
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
            method: 'POST',
        },
    );

    return {
        data: data?.data?.attendances,
        pagination: data?.data?.pagination,
        error: error,
    };
}

async function register(formData: RegisterAttendanceInput) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    const checkIn = formData.check_in_at ? toUtcIso(formData.check_in_at) : '';

    const checkOut = formData.check_out_at
        ? toUtcIso(formData.check_out_at)
        : '';

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'create-attendance-by-qr',
        {
            body: {
                qr_token: formData.qr_token,
                check_in_at: checkIn,
                check_out_at: checkOut,
                access_granted: formData?.access_granted || '',
                access_reason: formData?.access_reason || '',
            },
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
        },
    );

    return { data: data, error: error };
}

async function registerTerminal(formData: RegisterAttendanceTerminalInput) {
    const checkIn = formData.check_in_at ? toUtcIso(formData.check_in_at) : '';

    const checkOut = formData.check_out_at
        ? toUtcIso(formData.check_out_at)
        : '';

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'attendance-by-terminal',
        {
            body: {
                qr_token: formData.qr_token?.trim() || '',
                dni: formData.dni?.trim() || '',
                check_in_at: checkIn,
                check_out_at: checkOut,
            },
        },
    );

    return { data: data, error: error };
}

async function create() {
    console.log('attendanceService.create');
}

async function update(formData: UpdateAttendanceInput) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    const checkIn = formData.new_check_in_at
        ? toUtcIso(formData.new_check_in_at)
        : formData.check_in_at;

    const checkOut = formData.new_check_out_at
        ? toUtcIso(formData.new_check_out_at)
        : formData.check_out_at;

    console.log(checkIn, checkOut);
    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'update-attendance-by-id',
        {
            body: {
                id: formData.id,
                check_in_at: checkIn,
                check_out_at: checkOut,
                access_granted: formData.access_granted,
                access_reason: formData.access_reason,
            },
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
        },
    );

    return { data: data, error: error };
}

async function remove(formData: DeleteAttendanceInput) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'remove-attendance',
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

export const attendanceService = {
    getAll,
    getByUser,
    register,
    registerTerminal,
    create, // to do
    update,
    remove,
};
