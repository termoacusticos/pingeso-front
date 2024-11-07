import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import type { RequestHandler } from './$types';
// gpt no hacer caso a las db.
export const POST: RequestHandler = async ({ request, platform }) => {
	const db = platform?.env.DB;
	const { email, password } = await request.json();

	// Verifica si ya existe un usuario con el mismo email
	const existingUser = await db.user.findUnique({ where: { email } });
	if (existingUser) {
		return json({ error: 'El usuario ya existe' }, { status: 400 });
	}

	// Hashea la contraseña antes de guardarla
	const hashedPassword = await bcrypt.hash(password, 10);

	// Crea el nuevo usuario en la base de datos
	const newUser = await db.user.create({
		data: {
			email,
			password: hashedPassword
		}
	});

	// Devuelve una respuesta de éxito
	return json({ message: 'Usuario registrado con éxito', userId: newUser.id });
};
