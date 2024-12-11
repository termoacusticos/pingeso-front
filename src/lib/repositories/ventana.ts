import { err, ok } from 'neverthrow';

export const getVentanasById = async (db: D1Database, id: number) => {
	return await db
		.prepare('SELECT * FROM ventana WHERE id_opcion = ?;')
		.bind(id)
		.run<VentanaEntity>()
		.then((stmt) => {
			if (stmt.results.length == 0) return [];
			return stmt.results.map((ventana): VentanaModel => {
				return {
					alto: ventana.alto,
					ancho: ventana.ancho,
					cantidad: ventana.cantidad,
					id: ventana.id || 0,
					material: { id_material: 0, nombre: '?' },
					precio_total: ventana.precio_total,
					precio_unitario: ventana.precio_unitario,
					tipo: { descripcion_tipo: '', id_tipo: 0, maximo: 0, minimo: 0 },
					color: { id_color: 0, nombre: '?' },
					cristal: { descripcion: '', id_cristal: 0, precio: 0 }
				};
			});
		});
};

export const getAllVentanas = async (db: D1Database) => {
	const ventanas = await db
		.prepare('SELECT * FROM ventana;')
		.run<VentanaEntity>()
		.then((stmt) => stmt.results);
	return ventanas;
};

export const saveVentana = (db: D1Database, ventana: VentanaModel, id_opcion: number) => {
	return db
		.prepare(
			'INSERT INTO ventana ' +
				'(descripcion, alto, ancho, id_tipo, ' +
				'id_opcion, color, material, cantidad, precio_unitario, precio_total) ' +
				'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);'
		)
		.bind(
			ventana.alto,
			ventana.ancho,
			id_opcion,
			ventana.color,
			ventana.material,
			ventana.cantidad,
			ventana.precio_unitario,
			ventana.precio_total
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
