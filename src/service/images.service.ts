import { supabase } from '../utils/supabase';

import type {
    CreateImageInput,
    DeleteImageInput,
    Image,
    UpdateImageInput,
} from './types/Images';

interface ImagesListResponse {
    data: Image[];
}

async function getSessionToken() {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData.session) throw new Error('No hay sesión activa');

    return sessionData.session.access_token;
}

function createFormData(input: CreateImageInput | UpdateImageInput) {
    const formData = new FormData();

    formData.append('name', input.name);
    if (input.source) formData.append('source', input.source);
    if (input.file) formData.append('file', input.file);
    if ('id' in input) formData.append('id', input.id);

    return formData;
}

async function getAll() {
    const sessionToken = await getSessionToken();
    const { data, error } = await supabase.functions.invoke<ImagesListResponse>(
        'images',
        {
            headers: { Authorization: `Bearer ${sessionToken}` },
            method: 'GET',
        },
    );

    return { data: data?.data, error };
}

async function create(input: CreateImageInput) {
    const sessionToken = await getSessionToken();
    const { data, error } = await supabase.functions.invoke<Image>('images', {
        body: createFormData(input),
        headers: { Authorization: `Bearer ${sessionToken}` },
        method: 'POST',
    });

    return { data, error };
}

async function update(input: UpdateImageInput) {
    const sessionToken = await getSessionToken();
    const { data, error } = await supabase.functions.invoke<Image>('images', {
        body: createFormData(input),
        headers: { Authorization: `Bearer ${sessionToken}` },
        method: 'PUT',
    });

    return { data, error };
}

async function remove({ id }: DeleteImageInput) {
    const sessionToken = await getSessionToken();
    const { data, error } = await supabase.functions.invoke<void>('images', {
        body: { id },
        headers: { Authorization: `Bearer ${sessionToken}` },
        method: 'DELETE',
    });

    return { data, error };
}

export const imagesService = { getAll, create, update, remove };
