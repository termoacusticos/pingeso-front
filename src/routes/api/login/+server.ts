import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { JWT_SECRET } from '$env/static/private';

const TOKEN_SECRET = new TextEncoder().encode(JWT_SECRET);

export const POST: RequestHandler = async ({ request, platform }) => {
	const db = platform?.env.DB;

	const { email, password } = await request.json<{ email: string; password: string }>();

	const user = await db
		?.prepare('SELECT * FROM usuarios WHERE usuarios.email LIKE ?;')
		.bind(email)
		.run<Usuario>()
		.then((stmt) => stmt.results[0]);
	if (!user) {
		return json({ error: 'Usuario no encontrado' }, { status: 404 });
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return json({ error: 'Contraseña incorrecta' }, { status: 401 });
	}

	const token = await new SignJWT({ userId: user.id, email: user.email })
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('1h')
		.sign(TOKEN_SECRET);

	return json({token});
};
