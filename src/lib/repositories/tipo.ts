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

export const updateTipo = async (id: number, tipo: Tipo) => {
	return prisma.tipo
		.update({
			where: { id_tipo: id },
			data: { ...tipo, id_tipo: id }
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
