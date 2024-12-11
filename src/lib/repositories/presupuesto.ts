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
};

export const getAllPresupuestos = async () => {
	return prisma.presupuesto
		.findMany({ include: { Cliente: true, Opcion: true, Usuario: true } })
		.then((response) => ok(response))
		.catch((error) => err(error));
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
};

export const deletePresupuesto = async (id: number) => {
	return prisma.presupuesto
		.deleteMany()
		.then((response) => ok(response))
		.catch((error) => err(error));
};
