import { getDB, prisma } from '$lib';
import type { Usuario } from '@prisma/client';
import { err, ok } from 'neverthrow';
// acá se revisa si falló o no adentro, porque es un select y si no encuentra nada, el result es un null
export const getUsuario = async (email: string) => {
	return prisma.usuario
		.findFirst({ where: { email: { equals: email } } })
		.then((response) => {
			if (response) return ok(response);
			return err('Usuario no encontrado');
		})
		.catch((error) => err(error));

	// .prepare('SELECT * FROM usuario WHERE usuario.email LIKE ?;')
	// .bind(email)
	// .run<UsuarioEntity>()
	// .then((stmt) => {
	// 	if (!stmt.results[0]) return err('Usuario no encontrado');

	// 	return ok(stmt.results[0]);
	// });
};

export const getAllUsuarios = async () => {
	return prisma.usuario
		.findMany()
		.then((response) => ok(response))
		.catch((error) => err(error));
};

// acá se revisa si falló o no afuera, porque es un insert y si no puede realizar la operación, throwea un error
export const saveUsuario = async (user: Usuario, hashedPassword: string) => {
	return prisma.usuario
		.create({ data: { ...user, password: hashedPassword } })
		.then((response) => ok(response))
		.catch((error) => err(error));
	// return await db
	// 	.prepare('INSERT INTO usuario (email, password, is_admin) VALUES (?, ?, ?);')
	// 	.bind(user.email, hashedPassword, user.is_admin)
	// 	.run()
	// 	.then(() => ok(true))
	// 	.catch((error: Error) => err(error));
};

export const deleteUsuario = async (db: D1Database, email: string) => {
	return prisma.usuario
		.delete({ where: { email: email } })
		.then((response) => ok(response))
		.catch((error) => err(error));
	// return await db
	// 	.prepare('DELETE FROM usuario WHERE email = ?;')
	// 	.bind(email)
	// 	.run()
	// 	.then(() => ok(true))
	// 	.catch((error: Error) => err(error));
};
