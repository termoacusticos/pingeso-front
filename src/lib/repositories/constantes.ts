import { prisma } from '$lib';

export const getAllConstantes = () => {
	const materiales = prisma.material.findMany();
	const colores = prisma.color.findMany();
	const cristales = prisma.cristal.findMany();
	const tipos = prisma.tipo.findMany();
	const perfiles = prisma.perfil.findMany();
	const quincallerias = prisma.quincalleria.findMany();
	return Promise.all([materiales, colores, cristales, tipos, perfiles, quincallerias]);
};
