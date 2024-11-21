import { err, ok } from 'neverthrow';

export const getVentanasById = async (db: D1Database, id: number) => {
	const ventana = await db
		.prepare('SELECT * FROM ventana WHERE id_opcion = ?;')
		.bind(id)
		.run<VentanaEntity>()
		.then((stmt) => {
			if (stmt.results.length == 0) return err('Ventana no encontrada');
			return ok(stmt.results);
		});

	return ventana;
};

export const getAllVentanas = async (db: D1Database) => {
	const ventanas = await db
		.prepare('SELECT * FROM ventana;')
		.run<VentanaEntity>()
		.then((stmt) => stmt.results);
	return ventanas;
};

export const saveVentana = (db: D1Database, ventana: VentanaEntity, id_opcion: number) => {
	return db
		.prepare(
			'INSERT INTO ventana (descripcion, alto, ancho, minimo, maximo, id_opcion, color, material, cantidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);'
		)
		.bind(
			ventana.descripcion,
			ventana.alto,
			ventana.ancho,
			ventana.minimo,
			ventana.maximo,
			id_opcion,
			ventana.color,
			ventana.material,
			ventana.cantidad
		);
};

export const deleteVentana = async (db: D1Database, id: number) => {
	return await db
		.prepare('DELETE FROM ventana WHERE id_ventana = ?;')
		.bind(id)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};
