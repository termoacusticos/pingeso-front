import { prisma } from '$lib';
import type { Constantes } from '@prisma/client';
import { err, ok } from 'neverthrow';

export const getAllConstantes = () => {
	const materiales = prisma.material.findMany();
	const colores = prisma.color.findMany();
	const cristales = prisma.cristal.findMany();
	const tipos = prisma.tipo.findMany();
	const perfiles = prisma.perfil.findMany();
	const quincallerias = prisma.quincalleria.findMany();
	const constantes = prisma.constantes.findFirst();
	return Promise.all([materiales, colores, cristales, tipos, perfiles, quincallerias, constantes]);
};

export const saveConstantes = async (constantes: Constantes) => {
	return await prisma.constantes
		.upsert({
			create: { ...constantes, id_constantes: 1 },
			where: { id_constantes: 1 },
			update: { ...constantes, id_constantes: 1 }
		})
		.then((response) => ok(response))
		.catch((error) => err(error));
};
