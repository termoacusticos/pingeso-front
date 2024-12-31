import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDB, validateJWT } from '$lib';
import { deleteMaterial } from '$lib/repositories/material';

export const DELETE: RequestHandler = async ({ request, platform, cookies }) => {
    const connection = getDB(platform);
    if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

    const token = cookies.get('authToken');
    if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
    const validationResult = await validateJWT(token);
    if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

    const { id_material } = await request.json<{ id_material: number }>();

    const result = await deleteMaterial(id_material);
    
    if (result.isErr()) {
        return json({ error: 'Error al eliminar el material.' }, { status: 500 });
    }

    return json({ message: 'Material eliminado correctamente.' });
};