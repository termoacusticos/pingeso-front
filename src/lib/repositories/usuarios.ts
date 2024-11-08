export const getUsuario = async (db: D1Database, email: string) => {
	const user = await db
		.prepare('SELECT * FROM usuarios WHERE usuarios.email LIKE ?;')
		.bind(email)
		.run<Usuario | undefined>()
		.then((stmt) => stmt.results[0]);
	return user;
};
