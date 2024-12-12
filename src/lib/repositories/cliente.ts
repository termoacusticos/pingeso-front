import { prisma } from '$lib';
import type { Cliente } from '@prisma/client';
import { err, ok } from 'neverthrow';

export const getClienteByRut = async (rut: string) => {
	return prisma.cliente
		.findFirst({ where: { rut_cliente: rut } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const getAllClientes = async () => {
	return prisma.cliente
		.findMany()
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const saveCliente = async (cliente: Cliente) => {
	return prisma.cliente.upsert({
		where: { rut_cliente: cliente.rut_cliente },
		create: cliente,
		update: {}
	});
};

export const deleteCliente = async (rut: string) => {
	return prisma.cliente
		.delete({ where: { rut_cliente: rut } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};
