import { prisma } from '$lib';
import type { Quincalleria } from '@prisma/client';
import { err, ok } from 'neverthrow';

export const getQuincalleriaById = async (id: number) => {
	return prisma.quincalleria
		.findFirst({ where: { id_quincalleria: id } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const getAllQuincallerias = async () => {
	return prisma.quincalleria
		.findMany()
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const saveQuincalleria = async (quincalleria: Quincalleria) => {
	return prisma.quincalleria
		.create({ data: { ...quincalleria, id_quincalleria: undefined } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const updateQuincalleria = async (id: number, quincalleria: Quincalleria) => {
	return prisma.quincalleria
		.update({ where: { id_quincalleria: id }, data: { ...quincalleria, id_quincalleria: id } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const deleteQuincalleria = async (id: number) => {
	return prisma.quincalleria
		.delete({ where: { id_quincalleria: id } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};
