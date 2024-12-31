import { prisma } from '$lib';
import { err, ok } from 'neverthrow';

export const getMaterialById = async (id_material: number) => {
	return prisma.material.findFirst({ where: { id_material } });
};

export const deleteMaterial = async (id: number) => {
    return prisma.$transaction(async (tx) => {
        await tx.tipo.deleteMany({
            where: { id_material: id }
        });
        
        return tx.material.delete({
            where: { id_material: id }
        });
    })
    .then((response) => ok(response))
    .catch((error) => err(error));
};
