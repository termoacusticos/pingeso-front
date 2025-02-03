import { err, ok } from 'neverthrow';
import { prisma } from '$lib';
import type { PresupuestoModel } from '$lib/types';
import { saveCliente } from './cliente';

export const getPresupuestoById = async (id: number) => {
	return prisma.presupuesto
		.findFirst({
			include: { Cliente: true, Opciones: true, Usuario: true },
			where: { id_presupuesto: { equals: id } }
		})
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const getAllPresupuestos = async () => {
	return prisma.presupuesto
		.findMany({
			include: {
				Cliente: true,
				Opciones: { include: { Ventanas: true } },
				Usuario: { select: { email: true } }
			}
		})
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const savePresupuesto = async (presupuesto: PresupuestoModel, id_usuario: number) => {
	await saveCliente(presupuesto.Cliente);
	return prisma.presupuesto
		.create({
			include: { Cliente: true, Opciones: { include: { Ventanas: true } } },
			data: {
				valor_despacho: presupuesto.valor_despacho,
				valor_instalacion: presupuesto.valor_instalacion,
				texto_libre: presupuesto.texto_libre,
				id_presupuesto: undefined,
				fecha: new Date().toISOString(),
				id_usuario: id_usuario,
				rut_cliente: presupuesto.Cliente.rut_cliente,
				nombre_cliente: presupuesto.nombre_cliente,
				ganancia_global: presupuesto.ganancia_global,
				estado: presupuesto.estado,
				Opciones: {
					create: presupuesto.Opciones.map((opcion) => {
						return {
							Ventanas: {
								create: opcion.Ventanas.map((ventana) => {
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

export const updatePresupuesto = async (id_presupuesto: number, presupuesto: PresupuestoModel) => {
    try {
        // Verificar si el presupuesto existe
        const existingPresupuesto = await prisma.presupuesto.findUnique({
            where: { id_presupuesto },
            include: { Cliente: true, Opciones: { include: { Ventanas: true } } }
        });

        if (!existingPresupuesto) {
            return err(`No se encontró el presupuesto con ID ${id_presupuesto}`);
        }

        // Actualizar el cliente asociado
        await saveCliente(presupuesto.Cliente);

        // Actualizar el presupuesto
        const updatedPresupuesto = await prisma.presupuesto.update({
            where: { id_presupuesto },
            data: {
                valor_despacho: presupuesto.valor_despacho,
                valor_instalacion: presupuesto.valor_instalacion,
                texto_libre: presupuesto.texto_libre,
                fecha: new Date().toISOString(),
                id_usuario: presupuesto.id_usuario,
                rut_cliente: presupuesto.Cliente.rut_cliente,
                nombre_cliente: presupuesto.nombre_cliente,
                ganancia_global: presupuesto.ganancia_global,
                estado: presupuesto.estado,

                // Actualizar Opciones y Ventanas
                Opciones: {
					deleteMany: { id_opcion: { not: undefined } }, // Elimina todas las opciones previas
					create: presupuesto.Opciones.map((opcion) => ({
						Ventanas: {
							create: opcion.Ventanas.map((ventana) => ({ ...ventana }))
						}
					}))
				}				
            },
            include: { Cliente: true, Opciones: { include: { Ventanas: true } } }
        });

        return ok(updatedPresupuesto);
    } catch (error) {
        return err(error);
    }
};


export const deletePresupuesto = async (id: number) => {
	return prisma.presupuesto
		.delete({ where: { id_presupuesto: id } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};
