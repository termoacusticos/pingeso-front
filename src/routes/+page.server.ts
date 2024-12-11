import { redirect } from '@sveltejs/kit';
import { inspect } from 'node:util';
import type { PageServerLoad } from './$types';
import type { Usuario } from '@prisma/client';
import type { JWTBody, PresupuestoModel } from '$lib/types';

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

	// const login: { token: string } = await fetch('/api/login', {
	// 	method: 'POST',
	// 	body: JSON.stringify({ email: user.email, password: user.password })
	// }).then((response) => {
	// 	return response.json();
	// });
	// console.log(login);

	const nuevoPresupuesto: PresupuestoModel = {
		fecha: '',
		cliente: {
			direccion: '',
			email: 'hola123',
			nombre: 'pogencio',
			rut_cliente: '2121',
			telefono: '123'
		},
		opciones: [
			{
				ventanas: [
					{
						alto: 100,
						ancho: 100,
						cantidad: 1,
						id_color: 0,
						id_tipo: 0,
						id_cristal: 0,
						id_material: 0,
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
						id_material: 2,
						precio_unitario: 1000,
						precio_total: 10000
					}
				]
			}
		]
	};

	console.log('presupuesto');
	const presupuesto = await fetch('/api/presupuesto', {
		method: 'POST',
		body: JSON.stringify(nuevoPresupuesto)
	}).then((response) => {
		return response.json();
	});
	const presupuestos = await fetch('/api/presupuesto', {
		method: 'GET'
	}).then((response) => {
		return response.json();
	});
	console.log(presupuesto);
	console.log(inspect(presupuestos, false, null, true /* enable colors */));

	await fetch('/api/presupuesto', {
		method: 'DELETE'
	}).then((response) => {
		return response.json();
	});
	// const getPresupuesto: PresupuestoModel[] = await fetch('/api/presupuesto', {
	// 	method: 'GET',
	// 	headers: {
	// 		Authorization: `Bearer ${login.token}`
	// 	}
	// }).then((response) => {
	// 	return response.json();
	// });
	// console.log(util.inspect(getPresupuesto, false, null, true));

	return {};
};
