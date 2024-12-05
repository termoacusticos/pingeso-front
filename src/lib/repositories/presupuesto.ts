import { err, ok } from 'neverthrow';
import { getOpcionesById, saveOpcion } from './opcion';
import { getVentanasById, saveVentana } from './ventana';

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

	const opcionesResult = await getOpcionesById(db, presupuesto.id_presupuesto);
	if (opcionesResult.isErr()) return opcionesResult;
	const opcionesEntity = opcionesResult.value;

	const opciones: OpcionModel[] = [];
	for await (const opcion of opcionesEntity) {
		const ventanasResult = await getVentanasById(db, opcion.id_opcion);
		// ventanaEntity -> ventanaModel
		const ventanas: VentanaModel[] = ventanasResult.isOk()
			? ventanasResult.value.map((ventana) => {
					return {
						alto: ventana.alto,
						ancho: ventana.ancho,
						cantidad: ventana.cantidad,
						color: ventana.color,
						item: ventana.item,
						material: ventana.material,
						precio_total: ventana.precio_total,
						precio_unitario: ventana.precio_unitario,
						tipo_id: ventana.id_tipo
					};
				})
			: [];

		opciones.push({ ventanas });
	}

	return { ...presupuesto, id: presupuesto.id_presupuesto, opciones } as PresupuestoModel;
};

export const getAllPresupuestos = async (db: D1Database) => {
	const presupuestos: PresupuestoModel[] = [];
	const presupuestosEntity = await db
		.prepare('SELECT * FROM presupuesto;')
		.run<PresupuestoEntity>()
		.then((stmt) => stmt.results);

	if (presupuestosEntity.length == 0) return err('No hay presupuestos');

	for await (const presupuesto of presupuestosEntity) {
		const opcionesResult = await getOpcionesById(db, presupuesto.id_presupuesto);
		if (opcionesResult.isErr()) return opcionesResult;
		const opcionesEntity = opcionesResult.value;

		const opciones: OpcionModel[] = [];
		for await (const opcion of opcionesEntity) {
			const ventanasResult = await getVentanasById(db, opcion.id_opcion);

			const ventanas = ventanasResult.isOk()
				? ventanasResult.value.map((ventana) => {
						return {
							alto: ventana.alto,
							ancho: ventana.ancho,
							cantidad: ventana.cantidad,
							color: ventana.color,
							item: ventana.item,
							material: ventana.material,
							precio_total: ventana.precio_total,
							precio_unitario: ventana.precio_unitario,
							tipo_id: ventana.id_tipo
						};
					})
				: [];
			opciones.push({ ventanas });
		}
		presupuestos.push({ ...presupuesto, opciones });
	}
	return ok(presupuestos);
};

export const savePresupuesto = async (
	db: D1Database,
	presupuesto: PresupuestoModel,
	user_id: number
) => {
	if (!presupuesto.cliente) return err('Se intentó guardar un presupuesto sin cliente');
	const presupuestoResult = await db
		.prepare(
			'INSERT INTO presupuesto (id_usuario, fecha, data_json, rut_cliente) VALUES (?, ?, ?, ?);'
		)
		.bind(user_id, presupuesto.fecha, 'json', presupuesto.cliente.rut)
		.run()
		.then((stmt) => ok(stmt))
		.catch((error: Error) => err(error));

	if (presupuestoResult.isErr()) return presupuestoResult;

	presupuesto.id_presupuesto = presupuestoResult.value.meta.last_row_id;

	const insertBatch: D1PreparedStatement[] = [];
	for await (const opcion of presupuesto.opciones) {
		const opcionResult = await saveOpcion(db, presupuesto.id_presupuesto);
		if (opcionResult.isErr()) return opcionResult;

		const id_opcion = opcionResult.value;

		opcion.ventanas.map((ventana) => {
			insertBatch.push(saveVentana(db, ventana, id_opcion));
		});
	}

	return await db
		.batch(insertBatch)
		.then((result) => ok(result))
		.catch((error) => err(error));
};

export const deletePresupuesto = async (db: D1Database, id: number) => {
	return await db
		.prepare('DELETE FROM presupuesto WHERE id_presupuesto = ?;')
		.bind(id)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};
