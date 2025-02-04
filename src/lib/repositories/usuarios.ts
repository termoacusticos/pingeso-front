import { prisma } from '$lib';
import type { Usuario } from '@prisma/client';
import { err, ok } from 'neverthrow';
// acá se revisa si falló o no adentro, porque es un select y si no encuentra nada, el result es un null
export const getUsuario = async (email: string) => {
	return prisma.usuario
		.findFirst({ where: { email } })
		.then((response) => {
			if (response) return ok(response);
			return err('Usuario no encontrado');
		})
		.catch((error) => err(error));
};

export const getAllUsuarios = async () => {
	return prisma.usuario
		.findMany()
		.then((response) => ok(response))
		.catch((error) => err(error));
};

// acá se revisa si falló o no afuera, porque es un insert y si no puede realizar la operación, throwea un error
export const saveUsuario = async (user: Usuario, hashedPassword: string) => {
	return prisma.usuario
		.create({ data: { email: user.email, is_admin: user.is_admin, password: hashedPassword } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const deleteUsuario = async (email: string) => {
	return prisma.usuario
		.delete({ where: { email } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};
