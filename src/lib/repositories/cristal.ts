import { prisma } from '$lib';
import type { Cristal } from '@prisma/client';
import { err, ok } from 'neverthrow';

// export const getCristalByFormula = async (db: D1Database, formula: string) => {
//     const cristal = await db
//         .prepare('SELECT * FROM cristal WHERE formula_cris = ?;')
//         .bind(formula)
//         .run<Cristal>()
//         .then((stmt) => {
//             if (!stmt.results[0]) return err('Cristal no encontrado');
//             return ok(stmt.results[0]);
//         });
//     return cristal;
// };

export const getAllCristales = async () => {
	return prisma.cristal
		.findMany()
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const saveCristal = async (cristal: Cristal) => {
	return prisma.cristal
		.create({ data: cristal })
		.then((response) => ok(response))
		.catch((error) => err(error));
};
