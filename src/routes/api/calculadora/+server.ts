import type { RequestHandler } from './$types';
import { getDB } from '$lib';
import { json } from '@sveltejs/kit';
import { calcularCostoTotal } from '$lib/services/presupuesto';

export const POST: RequestHandler = async ({ request, platform, cookies }) => {
	const connResult = getDB(platform);
	if (connResult.isErr()) {
		return json({ error: connResult.error }, { status: 400 });
	}
	const db = connResult.value;

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });

	const { ventana, porcentaje }: { ventana: VentanaModel; porcentaje: number } =
		await request.json();

	if (!ventana || typeof porcentaje !== 'number') {
		return json(
			{
				error:
					'Parámetros inválidos: asegúrese de incluir ventana, input, y porcentaje correctamente.'
			},
			{ status: 400 }
		);
	}

	try {
		const resultado = await calcularCostoTotal(db, ventana, porcentaje);

		return json({ message: 'Cálculo realizado correctamente', resultado });
	} catch (error) {
		console.error('Error en la calculadora:', error);
		return json({ error: 'Error al realizar el cálculo.' }, { status: 500 });
	}
};
