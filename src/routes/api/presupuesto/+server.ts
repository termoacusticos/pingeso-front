import type { RequestHandler } from './$types';
import { getDB, validateJWT } from '$lib';
import { json } from '@sveltejs/kit';
import { savePresupuesto } from '$lib/repositories/presupuesto';
import { getAllPresupuestos } from '$lib/repositories/presupuesto';
import { saveCliente } from '$lib/repositories/cliente';

export const GET: RequestHandler = async ({ platform }) => {
	const connResult = getDB(platform);
	if (connResult.isErr()) {
		return json({ error: connResult.error }, { status: 400 });
	}

	const db = connResult.value;

	const presupuestosResult = await getAllPresupuestos(db);

	if (presupuestosResult.isErr()) {
		return json(presupuestosResult.error, { status: 500 });
	}

	return json(presupuestosResult.value);
};

export const POST: RequestHandler = async ({ request, platform }) => {
	const connResult = getDB(platform);
	if (connResult.isErr()) {
		return json({ error: connResult.error }, { status: 400 });
	}

	const db = connResult.value;

	const token = request.headers.get('Authorization') ?? '';
	const jwtResult = await validateJWT(token);
	if (jwtResult.isErr()) return json({ message: jwtResult.error }, { status: 400 });

	const presupuesto = await request.json<Presupuesto>();

	const saveResult = await savePresupuesto(db, presupuesto);

	if (saveResult.isErr()) {
		return json(saveResult.error.message, { status: 500 });
	}

	return json({ message: 'Presupuesto guardado correctamente', presupuesto: saveResult.value });
};
