import { supabase } from '../utils/supabase';
import {
    CreateEmployeeInput,
    UpdateEmployeeInput,
    DeleteEmployeeInput,
    GetEmployeersInput,
} from '../service/types/Employee';
import { UpdateProfilInput } from '../context/types/Profile';

async function getById(id: string) {
    // 1) Obtener el token desde la sesión actual (si aplica)
    // Si "session_token" ya lo tienes, puedes usarlo directo en vez de esto.
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'get-employee-by-id-2',
        {
            body: { id },
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
        },
    );

    if (error) throw error;
    return data?.employee;
}

async function getAll(input: GetEmployeersInput = {}) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'get-employee-all-2',
        {
            body: input,
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
            method: 'POST',
        },
    );

    return {
        data: data?.data?.employeers,
        pagination: data?.data?.pagination,
        error: error,
    };
}

async function create(formData: CreateEmployeeInput) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'create-employee-2',
        {
            body: {
                email: formData?.email,
                name: formData?.name,
                last_name: formData?.last_name,
                document: formData?.document,
                phone: formData?.phone,
                birth_date: formData?.birth_date || null,
                salary: formData?.salary,
                hire_date: formData?.hire_date || null,
                specialist: formData?.specialist,
                employee_number: formData?.employee_number,
                observations: formData?.observations,
            },
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
        },
    );

    return { data: data, error: error };
}

async function update(formData: UpdateEmployeeInput) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'update-employee-2',
        {
            body: {
                user_id: formData?.user_id,
                salary: formData?.salary,
                hire_date: formData?.hire_date || null,
                specialist: formData?.specialist,
                employee_number: formData?.employee_number,
                observations: formData?.observations,
            },
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
        },
    );

    return { data: data, error: error };
}

async function updateProfile(input: UpdateProfilInput) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const { data, error } = await supabase.functions.invoke(
        'update-employee-profile-2',
        {
            body: input,
            headers: {
                Authorization: `Bearer ${sessionData.session.access_token}`,
            },
            method: 'POST',
        },
    );

    return { data, error };
}

async function remove(formData: DeleteEmployeeInput) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'remove-employee-2',
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

export const employeeService = {
    getAll,
    getById,
    create,
    update,
    updateProfile,
    remove,
};
