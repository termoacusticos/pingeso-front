import { prisma } from '$lib';

export const getMaterialById = async (id_material: number) => {
	return prisma.material.findFirst({ where: { id_material } });
};
