import { prisma } from '$lib';
import type { Cliente } from '@prisma/client';
import { err, ok } from 'neverthrow';

export const getClienteByRut = async (db: D1Database, rut: string) => {
	const cliente = await db
		.prepare('SELECT * FROM cliente WHERE cliente.rut LIKE ?;')
		.bind(rut)
		.run<ClienteEntity>()
		.then((stmt) => {
			if (!stmt.results[0]) return err('Cliente no encontrado');
			return ok(stmt.results[0]);
		});
	return cliente;
};

export const getAllClientes = async (db: D1Database) => {
	const clientes = await db
		.prepare('SELECT * FROM cliente;')
		.run<ClienteEntity>()
		.then((stmt) => stmt.results);
	return clientes;
};

export const saveCliente = async (cliente: Cliente) => {
	return prisma.cliente
		.findUnique({
			where: { rut_cliente: cliente.rut_cliente }
		})
		.then(async (response) => {
			if (response) return ok('Ya existe, omitiendo');
			return prisma.cliente
				.create({
					data: cliente
				})
				.then((response) => ok(response));
		})
		.catch((error) => err(error));

	// return await db
	// 	.prepare(
	// 		'INSERT INTO cliente (rut_cliente, nombre, direccion, email, telefono) VALUES (?, ?, ?, ?, ?);'
	// 	)
	// 	.bind(cliente.rut, cliente.nombre, cliente.direccion, cliente.email, cliente.telefono)
	// 	.run()
	// 	.then(() => ok(true))
	// 	.catch((error: Error) => err(error));
};

export const deleteCliente = async (db: D1Database, rut: string) => {
	return await db
		.prepare('DELETE FROM cliente WHERE rut_cliente = ?;')
		.bind(rut)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};
