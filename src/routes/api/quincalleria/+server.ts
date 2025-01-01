import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDB, validateJWT } from '$lib';
import {
	getAllQuincallerias,
	saveQuincalleria,
	updateQuincalleria,
	deleteQuincalleria
} from '$lib/repositories/quincalleria';
import type { Quincalleria } from '@prisma/client';

// GET - Obtener todos los quincallerias
export const GET: RequestHandler = async ({ platform, cookies }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const quincallerias = await getAllQuincallerias();
	if (quincallerias.isErr()) {
		return json({ error: 'Error al obtener los quincallerias.' }, { status: 500 });
	}

	return json(quincallerias.value);
};

// POST - Crear nuevo quincalleria
export const POST: RequestHandler = async ({ request, platform, cookies }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const { quincalleriaData }: { quincalleriaData: Quincalleria } = await request.json();
	const result = await saveQuincalleria(quincalleriaData);

	if (result.isErr()) {
		return json({ error: 'Error al crear el quincalleria.' }, { status: 500 });
	}

	return json(result.value, { status: 201 });
};

// PUT - Actualizar quincalleria existente
export const PUT: RequestHandler = async ({ request, platform, cookies }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const { id, quincalleriaData } = await request.json<{
		id: number;
		quincalleriaData: Quincalleria;
	}>();

	const result = await updateQuincalleria(id, quincalleriaData);

	if (result.isErr()) {
		return json({ error: 'Error al actualizar el quincalleria.' }, { status: 500 });
	}

	return json(result.value);
};

// DELETE - Eliminar quincalleria
export const DELETE: RequestHandler = async ({ request, platform, cookies }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const { id_quincalleria } = await request.json<{ id_quincalleria: number }>();

	const result = await deleteQuincalleria(id_quincalleria);

	if (result.isErr()) {
		return json({ error: 'Error al eliminar el quincalleria.' }, { status: 500 });
	}

	return json({ message: 'Quincalleria eliminado correctamente.' });
};
