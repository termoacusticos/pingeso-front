import type { PageServerLoad } from './$types';
import type { Usuario } from '@prisma/client';
import type { ConstantData } from '$lib/types';

export const load: PageServerLoad = async ({ fetch }) => {
	const usuario: Usuario = {
		email: 'ejemplo@gmail.com',
		id_usuario: 0,
		is_admin: 1,
		password: 'HOLA1234'
	};
	const resp = await fetch('/api/register', {
		method: 'POST',
		body: JSON.stringify(usuario)
	}).then(async (resp) => {
		return await resp.json();
	});

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
