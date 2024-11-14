import { err, ok } from 'neverthrow';

export const getPerfilById = async (db: D1Database, id: number) => {
	const perfil = await db
		.prepare('SELECT * FROM perfil WHERE id_perfil = ?;')
		.bind(id)
		.run<PerfilEntity>()
		.then((stmt) => {
			if (!stmt.results[0]) return err('Perfil no encontrado');
			return ok(stmt.results[0]);
		});
	return perfil;
};

export const getAllPerfiles = async (db: D1Database) => {
	const perfiles = await db
		.prepare('SELECT * FROM perfil;')
		.run<PerfilEntity>()
		.then((stmt) => stmt.results);
	return perfiles;
};

export const savePerfil = async (db: D1Database, perfil: PerfilEntity) => {
	return await db
		.prepare(
			'INSERT INTO perfil (codigo_per, formula_per, cantidad, kg_ml_per) VALUES (?, ?, ?, ?);'
		)
		.bind(perfil.codigo, perfil.formula, perfil.cantidad, perfil.kg_ml)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};

export const deletePerfil = async (db: D1Database, id: number) => {
	return await db
		.prepare('DELETE FROM perfil WHERE id_perfil = ?;')
		.bind(id)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};
