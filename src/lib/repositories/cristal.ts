import { prisma } from '$lib';
import type { Cristal } from '@prisma/client';
import { err, ok } from 'neverthrow';

export const getCristalById = async (id_cristal: number) => {
	return prisma.cristal.findFirst({ where: { id_cristal } });
};

export const getAllCristales = async () => {
	return prisma.cristal
		.findMany()
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const saveCristal = async (cristal: Cristal) => {
	return prisma.cristal
		.create({ data: cristal })
		.then((response) => ok(response))
		.catch((error) => err(error));
};
