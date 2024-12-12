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

export const saveTipo = async (tipo: Tipo) => {
	return prisma.tipo
		.create({ data: tipo })
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const deleteTipo = async (id: number) => {
	return prisma.tipo
		.delete({ where: { id_tipo: id } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const getPerfilesTipo = async (id_tipo: number) => {
	return prisma.perfil.findMany({ where: { TipoPerfil: { some: { id_tipo: id_tipo } } } });
	// const perfiles = await db
	// 	.prepare(
	// 		`SELECT p.id_perfil, p.codigo_per, p.formula_per, p.cantidad,
	// 		p.kg_ml_per,
	// 		t.id_tipo,
	// 		t.descripcion_tipo,
	// 		t.minimo,
	// 		t.maximo
	// 	  FROM
	// 		perfil p
	// 	  INNER JOIN
	// 		tipo_perfil tp ON p.id_perfil = tp.id_perfil
	// 	  INNER JOIN
	// 		tipo t ON tp.id_tipo = t.id_tipo
	// 	  WHERE
	// 		t.id_tipo = ?;`
	// 	)
	// 	.bind(id_tipo)
	// 	.run<PerfilEntity>()
	// 	.then((stmt) => stmt.results);
	// return perfiles;
};

export const getQuincalleriasTipo = async (id_tipo: number) => {
	return prisma.quincalleria.findMany({
		where: { TipoQuincalleria: { some: { id_tipo: id_tipo } } }
	});

	// const quincallerias = await db
	// 	.prepare(
	// 		`SELECT q.id_quincalleria, q.desc_quin, q.formula_quin, q.precio_quin,
	//     t.id_tipo,
	//     t.descripcion_tipo,
	//     t.minimo,
	//     t.maximo
	//   FROM
	//     quincalleria q
	//   INNER JOIN
	//     tipo_quincalleria tq ON q.id_quincalleria = tq.id_quincalleria
	//   INNER JOIN
	//     tipo t ON tq.id_tipo = t.id_tipo
	//   WHERE
	//     t.id_tipo = ?;`
	// 	)
	// 	.bind(id_tipo)
	// 	.run<QuincalleriaEntity>()
	// 	.then((stmt) => stmt.results);
	// return quincallerias;
};
