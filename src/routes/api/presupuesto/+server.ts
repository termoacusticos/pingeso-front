import type { RequestHandler } from './$types';
import { getDB } from '$lib';
import { json } from '@sveltejs/kit';
import { savePresupuesto } from '$lib/repositories/presupuesto';
import { getAllPresupuestos } from '$lib/repositories/presupuesto';

export const GET: RequestHandler = async ({ platform }) => {
	const connResult = getDB(platform);
	if (connResult.isErr()){
		return json({error: connResult.error}, {status: 400});
	}

	const db = connResult.value;

	const presupuestos = await getAllPresupuestos(db);

	if (presupuestos.length === 0){
		return json({error: 'No se encontraron presupuestos'}, {status: 500});
	}

	return json({presupuestos: presupuestos.values});
};


export const POST: RequestHandler = async ({request, platform}) => {
	const connResult = getDB(platform);
	if (connResult.isErr()){
		return json({error: connResult.error}, {status: 400});
	}

	const db = connResult.value;

	const {id_usuario, fecha, data_json, nombre_cliente, rut_cliente} = await request.json<{
		id_usuario: number, 
		fecha: Date, 
		data_json: string, 
		nombre_cliente: string, 
		rut_cliente: string
	}>();

	const saveResult = await savePresupuesto(db, {
		id_usuario,
		fecha: new Date(fecha),
		data_json,
		nombre_cliente,
		rut_cliente
	});

	if (saveResult.isErr()){
		return json({error: saveResult.error}, {status: 500});
	}

	return json({ message: 'Presupuesto guardado correctamente', presupuesto: saveResult.value });
};