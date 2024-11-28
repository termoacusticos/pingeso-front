import { err, ok } from 'neverthrow';

export const getPerfilById = async (db: D1Database, id: number) => {
	const perfil = await db
		.prepare('SELECT * FROM perfil WHERE id_perfil = ?;')
		.bind(id)
		.run<PerfilEntity>()
		.then((stmt) => {
			if (!stmt.results[0]) return err('Perfil no encontrado');
			return ok(stmt.results[0]);
		});
	return perfil;
};

export const getAllPerfiles = async (db: D1Database) => {
	const perfiles = await db
		.prepare('SELECT * FROM perfil;')
		.run<PerfilEntity>()
		.then((stmt) => stmt.results);
	return perfiles;
};

export const savePerfil = async (db: D1Database, perfil: PerfilEntity) => {
	return await db
		.prepare(
			'INSERT INTO perfil (codigo_per, formula_per, cantidad, kg_ml_per) VALUES (?, ?, ?, ?);'
		)
		.bind(perfil.codigo, perfil.formula, perfil.cantidad, perfil.kg_ml)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};

export const deletePerfil = async (db: D1Database, id: number) => {
	return await db
		.prepare('DELETE FROM perfil WHERE id_perfil = ?;')
		.bind(id)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};

export const getFormulaByCod = async (db: D1Database, cod: number) => {
	const formula = await db
		.prepare('SELECT formula_per FROM perfil WHERE codigo_per = ?;')
		.bind(cod)
		.run<PerfilEntity>()
		.then((stmt) => {
			if (!stmt.results[0]) return err('Perfil no encontrado');
			return ok(stmt.results[0]);
		});
	return formula;
}

export const getPerfilByCod = async (db: D1Database, cod: number) => {
	const perfil = await db
		.prepare('SELECT * FROM perfil WHERE codigo_per = ?;')
		.bind(cod)
		.run<PerfilEntity>()
		.then((stmt) => {
			if (!stmt.results[0]) return err('Perfil no encontrado');
			return ok(stmt.results[0]);
		});
	return perfil;
};

export const getTiposPerfil = async (db: D1Database, cod: number) => {
	const tipos = await db
		.prepare(`SELECT p.id_perfil, p.codigo_per, p.formula_per, p.cantidad,
			p.kg_ml_per,
			t.id_tipo,
			t.descripcion_tipo,
			t.minimo,
			t.maximo
		  FROM 
			perfil p
		  INNER JOIN 
			tipo_perfil tp ON p.id_perfil = tp.id_perfil
		  INNER JOIN 
			tipo t ON tp.id_tipo = t.id_tipo
		  WHERE 
			t.id_tipo = 1;`
		  )
		.bind(cod)
		.run<PerfilEntity>()
		.then((stmt) => stmt.results);
	return tipos;
}

