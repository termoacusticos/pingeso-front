import { prisma } from '$lib';

export const saveImagenes = async (imagenes: string[]) => {
	await prisma.imagen.createMany({
		data: imagenes.map((value) => {
			return { bytes: value };
		})
	});
};
