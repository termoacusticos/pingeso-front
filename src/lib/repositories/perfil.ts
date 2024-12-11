import { prisma } from '$lib';
import type { Perfil } from '@prisma/client';
import { err, ok } from 'neverthrow';

export const getPerfilById = async (id: number) => {
	return prisma.perfil
		.findFirst({ where: { codigo_per: id } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const getAllPerfiles = async () => {
	return prisma.perfil
		.findMany()
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const savePerfil = async (perfil: Perfil) => {
	return prisma.perfil
		.create({ data: perfil })
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const deletePerfil = async (id: number) => {
	return prisma.perfil
		.delete({ where: { codigo_per: id } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};
