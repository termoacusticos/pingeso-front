import { prisma } from '$lib';
import type { Material } from '@prisma/client';
import { err, ok } from 'neverthrow';

export const getMaterialById = async (id_material: number) => {
	return prisma.material.findFirst({ where: { id_material } });
};

export const deleteMaterial = async (id: number) => {
	return prisma.material
		.delete({
			where: { id_material: id }
		})
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const updateMaterial = async (id: number, data: Material) => {
	return prisma.material
		.update({
			where: { id_material: id },
			data: { ...data, id_material: id }
		})
		.then((response) => ok(response))
		.catch((error) => err(error));
};
