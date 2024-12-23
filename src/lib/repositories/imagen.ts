import { prisma } from '$lib';
import type { Imagen } from '@prisma/client';

export const saveImagenes = async (imagenes: Imagen[]) => {
	await prisma.imagen.createMany({
		data: imagenes
	});
};

export const getImagenes = async () => {
	await prisma.imagen.groupBy({ by: 'header_group' });
};

export const deleteImagenes = async (id_imagen: number) => {
	await prisma.imagen.delete({ where: { id_imagen } });
};
