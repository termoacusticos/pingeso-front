import { err, ok } from 'neverthrow';

export const getOpcionesById = async (db: D1Database, id: number | undefined) => {
	if (!id) return err('Id no entregada');
	const opcion = await db
		.prepare('SELECT * FROM opcion WHERE id_presupuesto = ?;')
		.bind(id)
		.run<OpcionEntity>()
		.then((stmt) => {
			if (stmt.results.length == 0) return err('Opción no encontrada');
			return ok(stmt.results);
		});
	return opcion;
};

export const getAllOpciones = async (db: D1Database) => {
	const opciones = await db
		.prepare('SELECT * FROM opcion;')
		.run<OpcionEntity>()
		.then((stmt) => stmt.results);
	return opciones;
};

export const saveOpcion = async (db: D1Database, opcion: OpcionEntity) => {
	return await db
		.prepare('INSERT INTO opcion (id_presupuesto) VALUES (?);')
		.bind(opcion.id_presupuesto)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};

export const deleteOpcion = async (db: D1Database, id: number) => {
	return await db
		.prepare('DELETE FROM opcion WHERE id_opcion = ?;')
		.bind(id)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};
