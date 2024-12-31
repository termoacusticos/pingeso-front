import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDB, validateJWT } from '$lib';
import { getAllCristales, saveCristal, updateCristal, deleteCristal } from '$lib/repositories/cristal';
import type { Cristal } from '@prisma/client';

// GET - Obtener todos los cristales
export const GET: RequestHandler = async ({ platform, cookies }) => {
    const connection = getDB(platform);
    if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

    const token = cookies.get('authToken');
    if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
    const validationResult = await validateJWT(token);
    if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

    const cristales = await getAllCristales();
    if (cristales.isErr()) {
        return json({ error: 'Error al obtener los cristales.' }, { status: 500 });
    }

    return json(cristales.value);
};

// POST - Crear nuevo cristal
export const POST: RequestHandler = async ({ request, platform, cookies }) => {
    const connection = getDB(platform);
    if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

    const token = cookies.get('authToken');
    if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
    const validationResult = await validateJWT(token);
    if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

    const { cristalData }: {cristalData: Cristal} = await request.json();
    const result = await saveCristal(cristalData);
    
    if (result.isErr()) {
        return json({ error: 'Error al crear el cristal.' }, { status: 500 });
    }

    return json(result.value, { status: 201 });
};

// PUT - Actualizar cristal existente
export const PUT: RequestHandler = async ({ request, platform, cookies }) => {
    const connection = getDB(platform);
    if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

    const token = cookies.get('authToken');
    if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
    const validationResult = await validateJWT(token);
    if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

    const { id, cristalData } = await request.json<{ id: number; cristalData: Cristal}>();
    
    const result = await updateCristal(id, cristalData);
    
    if (result.isErr()) {
        return json({ error: 'Error al actualizar el cristal.' }, { status: 500 });
    }

    return json(result.value);
};

// DELETE - Eliminar cristal
export const DELETE: RequestHandler = async ({ request, platform, cookies }) => {
    const connection = getDB(platform);
    if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

    const token = cookies.get('authToken');
    if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
    const validationResult = await validateJWT(token);
    if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

    const { id_cristal } = await request.json<{ id_cristal: number }>();

    const result = await deleteCristal(id_cristal);
    
    if (result.isErr()) {
        return json({ error: 'Error al eliminar el cristal.' }, { status: 500 });
    }

    return json({ message: 'Cristal eliminado correctamente.' });
};