import { supabase } from '../utils/supabase';

import { CreateProductSale } from './types/ProductSale';

async function getAll() {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'get-product-sales-2',
        {
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
            method: 'GET',
        },
    );

    return { data: data?.data, error: error };
}

async function create(formData: CreateProductSale) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'register-product-sale-2',
        {
            body: {
                client_id: formData.client_id,
                discount: formData.discount,
                payment_method_id: formData.payment_method_id,
                status_id: formData.status_id,
                observation: formData.observation,
                sale_items: formData.sale_items,
            },
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
            method: 'POST',
        },
    );

    return { data: data, error: error };
}

export const productSaleService = {
    getAll,
    create,
};
