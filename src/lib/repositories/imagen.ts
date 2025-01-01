import { prisma } from '$lib';
import type { Imagen } from '@prisma/client';

export const saveImagenes = async (imagenes: Imagen[]) => {
	await prisma.imagen.createMany({
		data: imagenes.map((img) => {
			return { ...img, id_imagen: undefined };
		})
	});
};

export const getImagenes = async () => {
	await prisma.imagen.groupBy({ by: 'img_group' });
};

export const deleteImagenes = async (id_imagen: number) => {
	await prisma.imagen.delete({ where: { id_imagen } });
};
