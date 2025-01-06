import type { ConstantData, ImageGroup } from '$lib/types';
import type { PageServerLoad } from './$types';
import { inspect } from 'node:util';
export const load: PageServerLoad = async ({ fetch, locals }) => {
	const constantes: ConstantData = await fetch('/api/constantes', {
		method: 'GET'
	}).then((response) => {
		return response.json();
	});

	const imagenes: ImageGroup[] = await fetch('/api/imagenes', {
		method: 'GET'
	}).then((response) => {
		return response.json();
	});

	return {
		materiales: constantes.materiales,
		colores: constantes.colores,
		cristales: constantes.cristales,
		tipos: constantes.tipos,
		imagenes
	};
};
