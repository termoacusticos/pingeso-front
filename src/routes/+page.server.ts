import type { PageServerLoad } from './$types';
import type { Usuario } from '@prisma/client';
import type { ConstantData, JWTBody, PresupuestoModel } from '$lib/types';

export const load: PageServerLoad = async ({ fetch }) => {
	const user: Usuario = {
		id_usuario: 0,
		email: 'ejemplo@gmail.com',
		password: 'HOLA1234',
		is_admin: 0
	};

	await fetch('api/register', {
		method: 'POST',
		body: JSON.stringify(user)
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
