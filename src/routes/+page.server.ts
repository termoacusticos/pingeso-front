import { redirect } from '@sveltejs/kit';
import { inspect } from 'node:util';
import type { PageServerLoad } from './$types';
import type { Usuario } from '@prisma/client';
import type { JWTBody, PresupuestoModel } from '$lib/types';
import { log } from 'node:console';

export const load: PageServerLoad = async ({ fetch }) => {
	const login = await fetch('/api/login', {
		method: 'GET'
	}).then((response) => {
		// if (response.ok) {
		// 	redirect(301, '/home');
		// }
		return response.json<JWTBody>();
	});

	const user: Usuario = {
		id_usuario: 0,
		email: 'ejemplo@gmail.com',
		password: 'HOLA1234',
		is_admin: 0
	};

	// const registro = await fetch('/api/register', {
	// 	method: 'POST',
	// 	body: JSON.stringify(user)
	// }).then((response) => {
	// 	return response.json();
	// });

	const nuevoPresupuesto: PresupuestoModel = {
		fecha: '',
		id_usuario: 1,
		cliente: {
			direccion: '',
			email: 'hola123',
			nombre: 'pogencio',
			rut_cliente: '2121',
			telefono: '123'
		},
		Opciones: [
			{
				Ventanas: [
					{
						alto: 100,
						ancho: 100,
						cantidad: 1,
						id_color: 1,
						id_tipo: 1,
						id_cristal: 1,
						precio_unitario: 0,
						precio_total: 0
					},
					{
						alto: 200,
						ancho: 200,
						cantidad: 1,
						id_color: 2,
						id_tipo: 2,
						id_cristal: 2,
						precio_unitario: 1000,
						precio_total: 10000
					}
				]
			}
		]
	};
	const resultado = await fetch('/api/calculadora', {
		method: 'POST',
		body: JSON.stringify(nuevoPresupuesto.Opciones[0].Ventanas[0])
	}).then((response) => {
		return response.json();
	});
	console.log(resultado);

	return {};
};
