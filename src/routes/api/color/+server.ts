import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDB, validateJWT } from '$lib';
import { saveColor, updateColor } from '$lib/repositories/color';
import type { Color } from '@prisma/client';

export const POST: RequestHandler = async ({ request, platform, cookies }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const { colorData }: { colorData: Color } = await request.json();
	const result = await saveColor(colorData);

	if (result.isErr()) {
		return json({ error: 'Error al crear el color.' }, { status: 500 });
	}

	return json(result.value, { status: 201 });
};

export const PUT: RequestHandler = async ({ request, platform, cookies }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const { id, colorData } = await request.json<{ id: number; colorData: Color }>();

	const result = await updateColor(id, colorData);

	if (result.isErr()) {
		return json({ error: 'Error al actualizar el color.' }, { status: 500 });
	}

	return json(result.value);
};
