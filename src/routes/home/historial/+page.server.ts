import type { ConstantData } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const presupuestos = await fetch('/api/presupuesto', {
		method: 'GET'
	}).then((response) => {
		return response.json();
	});

	const constantes: ConstantData = await fetch('/api/constantes', {
		method: 'GET'
	}).then((response) => {
		return response.json();
	});

	return {
		presupuestos,
		materiales: constantes.materiales,
		colores: constantes.colores,
		cristales: constantes.cristales,
		tipos: constantes.tipos,
		perfiles: constantes.perfiles,
		quincallerias: constantes.quincallerias
	};
};
