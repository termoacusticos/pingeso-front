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

export const DELETE: RequestHandler = async ({ request }) => {
	const token = request.headers.get('Authorization') ?? '';
	const jwtResult = await validateJWT(token);
	if (jwtResult.isErr()) return json({ message: jwtResult.error }, { status: 400 });

	return json(jwtResult.value);
};
