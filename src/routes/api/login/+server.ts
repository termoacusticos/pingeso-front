import type { RequestHandler } from './$types';

import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { JWT_SECRET } from '$env/static/private';
import { getUsuario } from '$lib/repositories/usuarios';
import { getDB } from '$lib';

const TOKEN_SECRET = new TextEncoder().encode(JWT_SECRET);

export const POST: RequestHandler = async ({ request, platform }) => {
	const connResult = getDB(platform);
	if (connResult.isErr()) return json({ error: connResult.error }, { status: 400 });

	const db = connResult.value;

	const { email, password } = await request.json<{ email: string; password: string }>();

	const getResult = await getUsuario(db, email);

	if (getResult.isErr()) return json({ error: getResult.error }, { status: 404 });

	const user = getResult.value;

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return json({ error: 'Contraseña incorrecta' }, { status: 401 });
	}

	const token = await new SignJWT({ email: user.email })
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('1h')
		.sign(TOKEN_SECRET);

	return json({ token });
};
