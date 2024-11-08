export const getUsuario = async (db: D1Database, email: string) => {
	const user = await db
		.prepare('SELECT * FROM usuario WHERE usuario.email LIKE ?;')
		.bind(email)
		.run<Usuario | undefined>()
		.then((stmt) => stmt.results[0]);
	return user;
};

export const getAllUsuarios = async (db: D1Database) => {
	const users = await db
	.prepare('SELECT * FROM usuarios;')
	.run<Usuario | undefined>()
	.then((stmt) => stmt.results);
	return users;
};
