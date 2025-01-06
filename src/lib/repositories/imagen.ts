import { prisma } from '$lib';
import type { Imagen } from '@prisma/client';
import { err, ok } from 'neverthrow';

export const saveImagenes = async (img: Imagen) => {
	return await prisma.imagen
		.create({
			data: { ...img, id_imagen: undefined }
		})
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const getImagenes = async () => {
	return await prisma.imagen
		.findMany()
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const deleteImagenes = async (id_imagen: number) => {
	return await prisma.imagen
		.delete({ where: { id_imagen } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};
