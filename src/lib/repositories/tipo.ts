import {Err, err,ok} from 'neverthrow';

export const getTipoById = async (db: D1Database, id: number)=>{
    const tipo = await db
        .prepare('SELECT * FROM tipo WHERE id_tipo = ?;')
        .bind(id)
        .run<TipoEntity>()
        .then((stmt) => {
            if (stmt.results.length == 0) return err('Tipo no encontrado');
            return ok(stmt.results);
        });

    return tipo;
}

export const getAllTipos = async (db: D1Database) =>{
    const tipos = await db
        .prepare('SELECT * FROM tipo;')
        .run<TipoEntity>()
        .then((stmt) => stmt.results);
    return tipos;
};

export const saveTipo = async (db: D1Database, tipo: TipoEntity) => {
    return await db
        .prepare('INSERT INTO tipo (descripcion_tipo, minimo, maximo) VALUES (?, ?, ?);'
        )
        .bind(tipo.descripcion_tipo, tipo.minimo, tipo.maximo)
        .run()
        .then(()=> ok(true))
        .catch((error: Error)=> err(error));
};

export const deleteTipo = async (db: D1Database, id: number) => {
    return await db
        .prepare('DELETE FROM tipo WHERE id_tipo = ?;')
        .bind(id)
        .run()
        .then(() => ok(true))
        .catch((error: Error) => err(error));
};

export const getPerfilesTipo = async (db: D1Database, id_tipo: number) => {
	const perfiles = await db
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
			t.id_tipo = ?;`
		  )
		.bind(id_tipo)
		.run<PerfilEntity>()
		.then((stmt) => stmt.results);
	return perfiles;
}