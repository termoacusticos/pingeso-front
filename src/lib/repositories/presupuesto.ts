import { err, ok } from 'neverthrow';
import { prisma } from '$lib';
import type { PresupuestoModel } from '$lib/types';
import { saveCliente } from './cliente';

export const getPresupuestoById = async (id: number) => {
	return prisma.presupuesto
		.findFirst({
			include: { Cliente: true, Opcion: true, Usuario: true },
			where: { id_presupuesto: { equals: id } }
		})
		.then((response) => ok(response))
		.catch((error) => err(error));
	// const presupuestoResult = await db
	// 	.prepare('SELECT * FROM presupuesto WHERE id_presupuesto = ?;')
	// 	.bind(id)
	// 	.run<Presupuesto>()
	// 	.then((stmt) => {
	// 		if (!stmt.results[0]) return err('Presupuesto no encontrado');
	// 		return ok(stmt.results[0]);
	// 	});
	// if (presupuestoResult.isErr()) return presupuestoResult;
	// const presupuesto = presupuestoResult.value;

	// const opcionesResult = await getOpcionesById(db, presupuesto.id_presupuesto);
	// if (opcionesResult.isErr()) return opcionesResult;
	// const opcionesEntity = opcionesResult.value;

	// const opciones: OpcionModel[] = [];
	// for await (const opcion of opcionesEntity) {
	// 	const ventanas = await getVentanasById(db, opcion.id_opcion);
	// 	opciones.push({ ventanas });
	// }

	// return { ...presupuesto, id: presupuesto.id_presupuesto, opciones } as PresupuestoModel;
};

export const getAllPresupuestos = async () => {
	return prisma.presupuesto
		.findMany({ include: { Cliente: true, Opcion: true, Usuario: true } })
		.then((response) => ok(response))
		.catch((error) => err(error));
	// const presupuestos: PresupuestoModel[] = [];
	// const presupuestosEntity = await db
	// 	.prepare('SELECT * FROM presupuesto;')
	// 	.run<PresupuestoEntity>()
	// 	.then((stmt) => stmt.results);

	// if (presupuestosEntity.length == 0) return err('No hay presupuestos');

	// for await (const presupuesto of presupuestosEntity) {
	// 	const opcionesResult = await getOpcionesById(db, presupuesto.id_presupuesto);
	// 	if (opcionesResult.isErr()) return opcionesResult;
	// 	const opcionesEntity = opcionesResult.value;

	// 	const opciones: OpcionModel[] = [];
	// 	for await (const opcion of opcionesEntity) {
	// 		const ventanas = await getVentanasById(db, opcion.id_opcion);
	// 		opciones.push({ ventanas });
	// 	}
	// 	presupuestos.push({ ...presupuesto, opciones });
	// }
	// return ok(presupuestos);
};

export const savePresupuesto = async (presupuesto: PresupuestoModel, id_usuario: number) => {
	const clienteResult = await saveCliente(presupuesto.cliente);
	if (clienteResult.isErr()) return clienteResult;

	return prisma.presupuesto
		.create({
			include: { Opcion: { include: { Ventana: true } } },
			data: {
				id_presupuesto: presupuesto.id_presupuesto,
				data_json: '',
				fecha: new Date().toISOString(),
				id_usuario: id_usuario,
				rut_cliente: presupuesto.cliente.rut_cliente,
				Opcion: {
					create: presupuesto.opciones.map((opcion) => {
						return {
							Ventana: {
								create: opcion.ventanas.map((ventana) => {
									return { ...ventana };
								})
							}
						};
					})
				}
			}
		})
		.then((response) => ok(response))
		.catch((error) => err(error));
	// if (!presupuesto.cliente) return err('Se intentó guardar un presupuesto sin cliente');
	// const presupuestoResult = await db
	// 	.prepare(
	// 		'INSERT INTO presupuesto (id_usuario, fecha, data_json, rut_cliente) VALUES (?, ?, ?, ?);'
	// 	)
	// 	.bind(user_id, presupuesto.fecha, 'json', presupuesto.cliente.rut)
	// 	.run()
	// 	.then((stmt) => ok(stmt))
	// 	.catch((error: Error) => err(error));

	// if (presupuestoResult.isErr()) return presupuestoResult;

	// presupuesto.id_presupuesto = presupuestoResult.value.meta.last_row_id;

	// const insertBatch: D1PreparedStatement[] = [];
	// for await (const opcion of presupuesto.opciones) {
	// 	const opcionResult = await saveOpcion(db, presupuesto.id_presupuesto);
	// 	if (opcionResult.isErr()) return opcionResult;

	// 	const id_opcion = opcionResult.value;

	// 	opcion.ventanas.map((ventana) => {
	// 		insertBatch.push(saveVentana(db, ventana, id_opcion));
	// 	});
	// }

	// return await db
	// 	.batch(insertBatch)
	// 	.then((result) => ok(result))
	// 	.catch((error) => err(error));
};

export const deletePresupuesto = async (id: number) => {
	return prisma.presupuesto
		.deleteMany()
		.then((response) => ok(response))
		.catch((error) => err(error));
};
