import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { getDB, validateJWT } from '$lib';
import { getUsuario, saveUsuario } from '$lib/repositories/usuarios';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });
	const db = connection.value;

	const userToRegister = await request.json<UsuarioEntity>();

	// Hashea la contraseña antes de guardarla
	const hashedPassword = await bcrypt.hash(userToRegister.password, 10);

	// Crea el nuevo usuario en la base de datos
	const saveResult = await saveUsuario(db, userToRegister, hashedPassword);

	if (saveResult.isErr()) return json({ error: saveResult.error.message }, { status: 400 });

	// Devuelve una respuesta de éxito
	return json({ message: 'Usuario registrado con éxito' });
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	const token = cookies.get('authToken');

	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });

	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	return json(validationResult.value);
};
