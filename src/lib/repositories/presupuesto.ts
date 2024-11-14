import { err, ok } from 'neverthrow';

export const getPresupuestoById = async (db: D1Database, id: number) => {
	const presupuesto = await db
		.prepare('SELECT * FROM presupuesto WHERE id_presupuesto = ?;')
		.bind(id)
		.run<PresupuestoEntity>()
		.then((stmt) => {
			if (!stmt.results[0]) return err('Presupuesto no encontrado');
			return ok(stmt.results[0]);
		});
	return presupuesto;
};

export const getAllPresupuestos = async (db: D1Database) => {
	const presupuestos = await db
		.prepare('SELECT * FROM presupuesto;')
		.run<PresupuestoEntity>()
		.then((stmt) => stmt.results);
	return presupuestos;
};

export const savePresupuesto = async (db: D1Database, presupuesto: PresupuestoEntity) => {
	return await db
		.prepare(
			'INSERT INTO presupuesto (rut_usuario, fecha, data_json, nombre_cliente, rut_cliente) VALUES (?, ?, ?, ?, ?);'
		)
		.bind(
			presupuesto.rut_usuario,
			presupuesto.fecha,
			presupuesto.data_json,
			presupuesto.nombre_cliente,
			presupuesto.rut_cliente
		)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};

export const deletePresupuesto = async (db: D1Database, id: number) => {
	return await db
		.prepare('DELETE FROM presupuesto WHERE id_presupuesto = ?;')
		.bind(id)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};
