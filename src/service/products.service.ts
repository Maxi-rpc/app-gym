import { supabase } from '../utils/supabase';

import {
    ProductByCode,
    CreateProductInput,
    UpdateProductInput,
} from './types/Product';

async function getAll() {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke('get-products-2', {
        headers: {
            Authorization: `Bearer ${session_token}`,
        },
        method: 'GET',
    });

    return { data: data?.data, error: error };
}

async function getByCode(formData: ProductByCode) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'get-product-by-code-2',
        {
            body: {
                code: formData.code ?? formData.barcode,
            },
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
            method: 'POST',
        },
    );

    return { data: data?.data, error: error };
}

async function create(formData: CreateProductInput) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'create-product-2',
        {
            body: {
                name: formData.name,
                description: formData.description,
                category: formData.category,
                sku: formData.sku,
                barcode: formData.barcode,
                cost_price: formData.cost_price,
                sale_price: formData.sale_price,
                stock: formData.stock,
                minimum_stock: formData.minimum_stock,
                image: formData.image,
            },
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
            method: 'POST',
        },
    );

    return { data: data, error: error };
}

async function update(formData: UpdateProductInput) {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!sessionData?.session) throw new Error('No hay sesión activa');

    const session_token = sessionData.session.access_token;

    // 2) Invocar la Edge Function
    const { data, error } = await supabase.functions.invoke(
        'update-product-2',
        {
            body: {
                id: formData.id || '',
                name: formData.name || '',
                description: formData.description || '',
                category: formData?.category || 0,
                sku: formData?.sku || '',
                barcode: formData?.barcode || '',
                cost_price: formData?.cost_price || 0,
                sale_price: formData?.sale_price || 0,
                minimum_stock: formData.minimum_stock,
                status: formData?.status || 1,
                image: formData?.image || '',
            },
            headers: {
                Authorization: `Bearer ${session_token}`,
            },
            method: 'PUT',
        },
    );

    return { data: data, error: error };
}

export const productService = {
    getAll,
    getByCode,
    create,
    update,
};
