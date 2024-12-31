import { prisma } from '$lib';
import type { Tipo } from '@prisma/client';
import { err, ok } from 'neverthrow';

export const getTipoById = async (id: number) => {
	return prisma.tipo.findFirst({ include: { Material: true }, where: { id_tipo: id } });
};

export const getAllTipos = async () => {
	return prisma.tipo
		.findMany()
		.then((response) => ok(response))
		.catch((error) => err(error));
};

/*export const saveTipo = async (tipo: Tipo) => {
	return prisma.tipo
		.create({ data: tipo })
		.then((response) => ok(response))
		.catch((error) => err(error));
};*/

export const deleteTipo = async (id: number) => {
	return prisma.tipo
		.delete({ where: { id_tipo: id } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};

interface RelacionesTipo {
    perfiles?: number[];
    quincallerias?: number[];
}

export const updateTipo = async (id: number, tipo: Tipo, relaciones?: RelacionesTipo) => {
    return prisma.$transaction(async (tx) => {
        const tipoActualizado = await tx.tipo.update({ 
            where: { id_tipo: id }, 
            data: {
                ...tipo,
                TipoPerfil: relaciones?.perfiles ? {
                    deleteMany: {},
                    create: relaciones.perfiles.map(id_perfil => ({ id_perfil }))
                } : undefined,
                TipoQuincalleria: relaciones?.quincallerias ? {
                    deleteMany: {},
                    create: relaciones.quincallerias.map(id_quincalleria => ({ id_quincalleria }))
                } : undefined
            },
            include: {
                TipoPerfil: { include: { Perfil: true } },
                TipoQuincalleria: { include: { Quincalleria: true } }
            }
        });

        return tipoActualizado;
    })
    .then((response) => ok(response))
    .catch((error) => err(error));
};

export const getPerfilesTipo = async (id_tipo: number) => {
	return prisma.perfil.findMany({ where: { TipoPerfil: { some: { id_tipo: id_tipo } } } });
};

export const getQuincalleriasTipo = async (id_tipo: number) => {
	return prisma.quincalleria.findMany({
		where: { TipoQuincalleria: { some: { id_tipo: id_tipo } } }
	});
};
