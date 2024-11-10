import { err, ok } from 'neverthrow';

/*export const getCristalByFormula = async (db: D1Database, formula: string) => {
    const cristal = await db
        .prepare('SELECT * FROM cristal WHERE formula_cris = ?;')
        .bind(formula)
        .run<Cristal>()
        .then((stmt) => {
            if (!stmt.results[0]) return err('Cristal no encontrado');
            return ok(stmt.results[0]);
        });
    return cristal;
};*/

export const getAllCristales = async (db: D1Database) => {
    const cristales = await db
        .prepare('SELECT * FROM cristal;')
        .run<Cristal>()
        .then((stmt) => stmt.results);
    return cristales;
};

export const saveCristal = async (db: D1Database, cristal: Cristal) => {
    return await db
        .prepare('INSERT INTO cristal (formula_cris, cantidad, valor_m2) VALUES (?, ?, ?);')
        .bind(cristal.formula, cristal.cantidad, cristal.valor_m2)
        .run()
        .then(() => ok(true))
        .catch((error: Error) => err(error));
};

/*export const deleteCristal = async (db: D1Database, formula: string) => {
    return await db
        .prepare('DELETE FROM cristal WHERE formula_cris = ?;')
        .bind(formula)
        .run()
        .then(() => ok(true))
        .catch((error: Error) => err(error));
};*/
