import { err, ok } from 'neverthrow';
// acá se revisa si falló o no adentro, porque es un select y si no encuentra nada, el result es un null
export const getUsuario = async (db: D1Database, email: string) => {
	const user = await db
		.prepare('SELECT * FROM usuario WHERE usuario.email LIKE ?;')
		.bind(email)
		.run<Usuario>()
		.then((stmt) => {
			if (!stmt.results[0]) return err('Usuario no encontrado');

			return ok(stmt.results[0]);
		});
	return user;
};

export const getAllUsuarios = async (db: D1Database) => {
	const users = await db
		.prepare('SELECT * FROM usuario;')
		.run<Usuario>()
		.then((stmt) => stmt.results);
	return users;
};

// acá se revisa si falló o no afuera, porque es un insert y si no puede realizar la operación, throwea un error
export const saveUsuario = async (db: D1Database, user: Usuario, hashedPassword: string) => {
	return await db
		.prepare('INSERT INTO usuario (email, password, rol_id) VALUES (?, ?, ?);')
		.bind(user.email, hashedPassword, user.rol_id)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};

export const deleteUsuario = async (db: D1Database, email: string) => {
	return await db
		.prepare('DELETE FROM usuario WHERE email = ?;')
		.bind(email)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};
