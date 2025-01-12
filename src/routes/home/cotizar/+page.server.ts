import type { ConstantData } from '$lib/types';
import type { PageServerLoad } from './$types';
import type { ImageGroup } from '$lib/types';

export const load: PageServerLoad = async ({ fetch }) => {
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
		imagenes,
		materiales: constantes.materiales,
		colores: constantes.colores,
		cristales: constantes.cristales,
		tipos: constantes.tipos,
		perfiles: constantes.perfiles,
		quincallerias: constantes.quincallerias
	};
};
