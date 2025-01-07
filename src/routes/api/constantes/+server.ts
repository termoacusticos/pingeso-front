import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDB, validateJWT } from '$lib';
import { getAllConstantes } from '$lib/repositories/constantes';

export const GET: RequestHandler = async ({ platform, cookies }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const constantes = await getAllConstantes();

	return json({
		materiales: constantes[0],
		colores: constantes[1],
		cristales: constantes[2],
		tipos: constantes[3],
		perfiles: constantes[4],
		quincallerias: constantes[5]
	});
};
