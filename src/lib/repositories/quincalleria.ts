import { err, ok } from 'neverthrow';

export const getQuincalleriaById = async (db: D1Database, id: number) => {
	const quincalleria = await db
		.prepare('SELECT * FROM quincalleria WHERE quincalleria.id_quincalleria LIKE ?;')
		.bind(id)
		.run<QuincalleriaEntity>()
		.then((stmt) => {
			if (!stmt.results[0]) return err('Quincallería no encontrada');
			return ok(stmt.results[0]);
		});
	return quincalleria;
};

export const getAllQuincallerias = async (db: D1Database) => {
	const quincallerias = await db
		.prepare('SELECT * FROM quincallerias;')
		.run<QuincalleriaEntity>()
		.then((stmt) => stmt.results);
	return quincallerias;
};

export const saveQuincalleria = async (db: D1Database, quincalleria: QuincalleriaEntity) => {
	return await db
		.prepare(
			'INSERT INTO quincalleria (descripcion_quin, formula_quin, precio_unitario) VALUES (?, ?, ?);'
		)
		.bind(quincalleria.descripcion, quincalleria.formula, quincalleria.precio)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};

export const deleteQuincalleria = async (db: D1Database, id: number) => {
	return await db
		.prepare('DELETE FROM quincalleria WHERE id_quincalleria = ?;')
		.bind(id)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};
