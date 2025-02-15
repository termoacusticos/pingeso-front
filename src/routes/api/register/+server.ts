import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { getDB, validateJWT } from '$lib';
import { saveUsuario } from '$lib/repositories/usuarios';

import type { RequestHandler } from './$types';
import type { Usuario } from '@prisma/client';

export const POST: RequestHandler = async ({ request, platform, cookies }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const userToRegister = await request.json<Usuario>();

	// Hashea la contraseña antes de guardarla
	const hashedPassword = await bcrypt.hash(userToRegister.password, 10);

	// Crea el nuevo usuario en la base de datos
	const saveResult = await saveUsuario(userToRegister, hashedPassword);

	if (saveResult.isErr()) return json({ error: saveResult.error.message }, { status: 400 });

	// Devuelve una respuesta de éxito
	return json({ message: 'Usuario registrado con éxito' });
};
