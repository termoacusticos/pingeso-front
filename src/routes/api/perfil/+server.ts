import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDB, validateJWT } from '$lib';
import { getAllPerfiles, savePerfil, updatePerfil, deletePerfil } from '$lib/repositories/perfil';
import type { Perfil } from '@prisma/client';

// GET - Obtener todos los perfiles
export const GET: RequestHandler = async ({ platform, cookies }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const perfiles = await getAllPerfiles();
	if (perfiles.isErr()) {
		return json({ error: 'Error al obtener los perfiles.' }, { status: 500 });
	}

	return json(perfiles.value);
};

// POST - Crear nuevo perfil
export const POST: RequestHandler = async ({ request, platform, cookies }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const { perfilData }: { perfilData: Perfil } = await request.json();
	const result = await savePerfil(perfilData);

	if (result.isErr()) {
		return json({ error: 'Error al crear el perfil.' }, { status: 500 });
	}

	return json(result.value, { status: 201 });
};

// PUT - Actualizar perfil existente
export const PUT: RequestHandler = async ({ request, platform, cookies }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const { id, perfilData } = await request.json<{ id: number; perfilData: Perfil }>();

	const result = await updatePerfil(id, perfilData);

	if (result.isErr()) {
		return json({ error: 'Error al actualizar el perfil.' }, { status: 500 });
	}

	return json({ message: 'Perfil actualizado correctamente.' });
};

// DELETE - Eliminar perfil
export const DELETE: RequestHandler = async ({ request, platform, cookies }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const { id_perfil } = await request.json<{ id_perfil: number }>();

	const result = await deletePerfil(id_perfil);

	if (result.isErr()) {
		return json({ error: 'Error al eliminar el perfil.' }, { status: 500 });
	}

	return json({ message: 'Perfil eliminado correctamente.' });
};
