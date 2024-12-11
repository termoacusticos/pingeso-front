import { prisma } from '$lib';

export const getAllConstantes = () => {
	const materiales = prisma.material.findMany();
	const colores = prisma.color.findMany();
	const cristales = prisma.cristal.findMany();
	const tipos = prisma.tipo.findMany();
	return Promise.all([materiales, colores, cristales, tipos]);
};
