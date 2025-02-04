import type { PageServerLoad } from './$types';
import type { Usuario } from '@prisma/client';
import type { ConstantData } from '$lib/types';

export const load: PageServerLoad = async ({ fetch }) => {
	const constantes: ConstantData = await fetch('api/constantes', {
		method: 'GET'
	}).then((response) => {
		return response.json();
	});

	return {
		materiales: constantes.materiales,
		colores: constantes.colores,
		cristales: constantes.cristales,
		tipos: constantes.tipos,
		perfiles: constantes.perfiles,
		quincallerias: constantes.quincallerias
	};
};
