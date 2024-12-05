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
		return json({ error: presupuestosResult.error }, { status: 500 });
	}

	return json(presupuestosResult.value);
};

export const POST: RequestHandler = async ({ request, platform, cookies }) => {
	const connResult = getDB(platform);
	if (connResult.isErr()) {
		return json({ error: connResult.error }, { status: 400 });
	}

	const db = connResult.value;

	const token = cookies.get('authToken');

	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });

	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const presupuesto = await request.json<PresupuestoModel>();

	const user_id = validationResult.value.user_id;
	const saveResult = await savePresupuesto(db, presupuesto, user_id);

	if (saveResult.isErr()) {
		return json({ error: saveResult.error.message }, { status: 500 });
	}

	return json({ message: 'Presupuesto guardado correctamente', presupuesto: saveResult.value });
};
