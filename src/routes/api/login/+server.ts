import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { JWT_SECRET } from '$env/static/private';
import { getUsuario } from '$lib/repositories/usuarios';
import { getDB } from '$lib';

const TOKEN_SECRET = new TextEncoder().encode(JWT_SECRET);

export const POST: RequestHandler = async ({ request, platform }) => {
	const conn = getDB(platform);
	if (conn.isErr()) return json({ error: conn.error }, { status: 400 });

	const db = conn.value;

	const { email, password } = await request.json<{ email: string; password: string }>();

	const user = await getUsuario(db, email);

	if (!user) return json({ error: 'Usuario no encontrado' }, { status: 404 });

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return json({ error: 'Contraseña incorrecta' }, { status: 401 });
	}

	const token = await new SignJWT({ userId: user.id, email: user.email })
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('1h')
		.sign(TOKEN_SECRET);

	return json({ token });
};
