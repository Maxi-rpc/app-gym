import { supabase } from '../utils/supabase';
import {
    CurrentProfileResponse,
    UpdateProfilInput,
} from '../context/types/Profile';

async function getCurrent(): Promise<CurrentProfileResponse> {
    // 1) Obtener el token desde la sesión actual (si aplica)
    // Si "session_token" ya lo tienes, puedes usarlo directo en vez de esto.
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'get-profile-by-id-2',
        {
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
        },
    );

    if (error) throw error;

    if (!data?.profile) {
        throw new Error('La respuesta no contiene un perfil');
    }

    return {
        profile: data.profile,
        membership: data.membership ?? null,
    };
}

async function update(input: UpdateProfilInput) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke('update-profile', {
        body: input,
        headers: {
            Authorization: `Bearer ${session_token}`,
        },
        method: 'POST',
    });

    return { data: data, error: error };
}

export const profileService = {
    getCurrent,
    update,
};
