import { prisma } from '$lib';
import type { Tipo } from '@prisma/client';
import { Err, err, ok } from 'neverthrow';

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
	perfilesAgregar?: number[];
	perfilesEliminar?: number[];
	quincalleriasAgregar?: number[];
	quincalleriasEliminar?: number[];
}

export const updateTipo = async (id: number, tipo: Tipo, relaciones?: RelacionesTipo) => {
	return prisma.$transaction(async (tx) => {
		const tipoActualizado = await tx.tipo.update({ where: { id_tipo: id }, data: tipo });

		if (relaciones){
			if (relaciones.perfilesEliminar?.length){
				await Promise.all(
					relaciones.perfilesEliminar.map((id_perfil) => tx.tipoPerfil.delete({ where: { id_tipo_id_perfil: { id_tipo: id, id_perfil } } }))
				);
			}

			if (relaciones.perfilesAgregar?.length){
				await Promise.all(
					relaciones.perfilesAgregar.map((id_perfil) => tx.tipoPerfil.create({ data: { id_tipo: id, id_perfil } }))
				);
			}

			if (relaciones.quincalleriasEliminar?.length){
				await Promise.all(
					relaciones.quincalleriasEliminar.map((id_quincalleria) => tx.tipoQuincalleria.delete({ where: { id_tipo_id_quincalleria: { id_tipo: id, id_quincalleria } } }))
				);
			}

			if (relaciones.quincalleriasAgregar?.length){
				await Promise.all(
					relaciones.quincalleriasAgregar.map((id_quincalleria) => tx.tipoQuincalleria.create({ data: { id_tipo: id, id_quincalleria } }))
				);
			}
		}

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

export const addPerfil = async (id_tipo: number, id_perfil: number) => {
	return prisma.tipoPerfil
		.create({ data: { id_tipo, id_perfil } })
		.then((response) => ok(response))
		.catch((error) => err(error));
}

export const deletePerfil = async (id_tipo: number, id_perfil: number) => {
	return prisma.tipoPerfil
		.delete({ where: { id_tipo_id_perfil: { id_tipo, id_perfil } } })
		.then((response) => ok(response))
		.catch((error) => err(error));
}

export const addQuincalleria = async (id_tipo: number, id_quincalleria: number) => {
	return prisma.tipoQuincalleria
		.create({ data: { id_tipo, id_quincalleria } })
		.then((response) => ok(response))
		.catch((error) => err(error));
}

export const deleteQuincalleria = async (id_tipo: number, id_quincalleria: number) => {
	return prisma.tipoQuincalleria
		.delete({ where: { id_tipo_id_quincalleria: { id_tipo, id_quincalleria } } })
		.then((response) => ok(response))
		.catch((error) => err(error));
}
