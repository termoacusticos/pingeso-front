import { err, ok } from 'neverthrow';
import { getOpcionesById } from './opcion';
import { getVentanasById } from './ventana';

export const getPresupuestoById = async (db: D1Database, id: number) => {
	const presupuestoResult = await db
		.prepare('SELECT * FROM presupuesto WHERE id_presupuesto = ?;')
		.bind(id)
		.run<PresupuestoEntity>()
		.then((stmt) => {
			if (!stmt.results[0]) return err('Presupuesto no encontrado');
			return ok(stmt.results[0]);
		});
	if (presupuestoResult.isErr()) return presupuestoResult;
	const presupuesto = presupuestoResult.value;

	const opcionesResult = await getOpcionesById(db, presupuesto.id);
	if (opcionesResult.isErr()) return opcionesResult;
	const opcionesEntity = opcionesResult.value;

	const opciones: Opcion[] = [];
	opcionesEntity.forEach(async (opcion) => {
		const ventanasResult = await getVentanasById(db, opcion.id);
		const ventanas = ventanasResult.isOk() ? ventanasResult.value : [];
		opciones.push({ id: opcion.id, ventanas });
	});

	return { ...presupuesto, opciones } as Presupuesto;
};

export const getAllPresupuestos = async (db: D1Database) => {
	const presupuestos: Presupuesto[] = [];
	const presupuestosEntity = await db
		.prepare('SELECT * FROM presupuesto;')
		.run<PresupuestoEntity>()
		.then((stmt) => stmt.results);

	presupuestosEntity.forEach(async (presupuesto) => {
		const opcionesResult = await getOpcionesById(db, presupuesto.id);
		if (opcionesResult.isErr()) return opcionesResult;
		const opcionesEntity = opcionesResult.value;

		const opciones: Opcion[] = [];
		opcionesEntity.forEach(async (opcion) => {
			const ventanasResult = await getVentanasById(db, opcion.id);
			const ventanas = ventanasResult.isOk() ? ventanasResult.value : [];
			opciones.push({ id: opcion.id, ventanas });
		});
		presupuestos.push({ ...presupuesto, id: presupuesto.id ?? 0, opciones });
	});
	return presupuestos;
};

export const savePresupuesto = async (db: D1Database, presupuesto: PresupuestoEntity) => {
	return await db
		.prepare(
			'INSERT INTO presupuesto (id_usuario, fecha, data_json, nombre_cliente, rut_cliente) VALUES (?, ?, ?, ?, ?);'
		)
		.bind(
			presupuesto.id_usuario,
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
