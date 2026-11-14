import { supabase } from '../utils/supabase';

import { CreateRoleInput, UpdateRoleInput } from './types/Role';

type RoleMutationResponse = {
    data?: { message?: string };
    error: Error | null;
};

async function getAll() {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    const { data, error } = await supabase.functions.invoke('roles-2', {
        headers: {
            Authorization: `Bearer ${session_token}`,
        },
        method: 'GET',
    });

    return { data: data?.data, error: error };
}

async function create(
    formData: CreateRoleInput,
): Promise<RoleMutationResponse> {
    void formData;
    return {
        data: undefined,
        error: new Error(
            'La administración de roles estará disponible desde la plataforma.',
        ),
    };
}

async function update(
    formData: UpdateRoleInput,
): Promise<RoleMutationResponse> {
    void formData;
    return {
        data: undefined,
        error: new Error(
            'La administración de roles estará disponible desde la plataforma.',
        ),
    };
}

export const rolesService = {
    getAll,
    create,
    update,
};
