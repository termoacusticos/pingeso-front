import type { ConstantData, ImageGroup } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	if (locals.session == null || !locals.session.is_admin) {
		redirect(308, '/');
	}

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
		perfiles: constantes.perfiles,
		quincallerias: constantes.quincallerias,
		constantes_pdf: constantes.constantes_pdf,
		imagenes
	};
};
