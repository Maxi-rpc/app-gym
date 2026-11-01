import { supabase } from '../utils/supabase';

import { CreateStockInput } from './types/ProductStock';

async function getAll() {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'get-stock-movements-2',
        {
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
            method: 'GET',
        },
    );

    return { data: data?.data, error: error };
}

async function adjustStock(formData: CreateStockInput) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'adjust-product-stock-2',
        {
            body: {
                product_id: formData.product_id,
                movement_type: formData.movement_type,
                quantity: formData.quantity,
                observation: formData.observation,
            },
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
            method: 'POST',
        },
    );

    return { data: data, error: error };
}

export const productStockService = {
    getAll,
    adjustStock,
};
