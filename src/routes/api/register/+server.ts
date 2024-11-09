import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import type { RequestHandler } from './$types';
import { getDB } from '$lib';
import { getUsuario, saveUsuario } from '$lib/repositories/usuarios';
import { PASSWORD_SALT } from '$env/static/private';
// gpt no hacer caso a las db.
export const POST: RequestHandler = async ({ request, platform }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });
	const db = connection.value;

	const userToRegister = await request.json<Usuario>();

	// Verifica si ya existe un usuario con el mismo email
	const existingUser = await getUsuario(db, userToRegister.email);
	
	if (existingUser.isOk()) {
		return json({ error: 'El usuario ya existe' }, { status: 400 });
	}

	// Hashea la contraseña antes de guardarla
	const hashedPassword = await bcrypt.hash(userToRegister.password, 10);

	// Crea el nuevo usuario en la base de datos
	const response = await saveUsuario(db, userToRegister, hashedPassword);

	if (response.isErr()) return json(response.error, { status: 400 });

	// Devuelve una respuesta de éxito
	return json({ message: 'Usuario registrado con éxito' });
};
