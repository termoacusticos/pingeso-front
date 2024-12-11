import { prisma } from '$lib';

export const getAllConstantes = () => {
	const colores = prisma.color.findMany();
	const cristales = prisma.cristal.findMany();
	const tipos = prisma.tipo.findMany();
	return Promise.all([colores, cristales, tipos]);
};
