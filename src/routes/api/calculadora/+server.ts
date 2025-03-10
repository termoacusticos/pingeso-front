import type { RequestHandler } from './$types';
import { getDB } from '$lib';
import { json } from '@sveltejs/kit';
import { calcularCostoVentana } from '$lib/services/calculadora';
import type { VentanaModel, VentanaUI } from '$lib/types';

export const POST: RequestHandler = async ({ request, platform, cookies }) => {
	const connResult = getDB(platform);
	if (connResult.isErr()) {
		return json({ error: connResult.error }, { status: 400 });
	}

	/*const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });*/

	const ventana: VentanaModel = await request.json();

	if (!ventana) {
		return json(
			{
				error: 'Parámetros inválidos: asegúrese de incluir ventana, y porcentaje correctamente.'
			},
			{ status: 400 }
		);
	}

	try {
		const resultado = await calcularCostoVentana(ventana);

		return json({ message: 'Cálculo realizado correctamente', resultado });
	} catch (error) {
		console.error('Error en la calculadora:', error);
		return json({ error: 'Error al realizar el cálculo.' }, { status: 500 });
	}
};
