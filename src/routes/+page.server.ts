import { redirect } from '@sveltejs/kit';
import { inspect } from 'node:util';
import type { PageServerLoad } from './$types';
import type { Usuario } from '@prisma/client';
import type { ConstantData, JWTBody, PresupuestoModel } from '$lib/types';
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

	const registro = await fetch('/api/register', {
		method: 'POST',
		body: JSON.stringify(user)
	}).then((response) => {
		console.log(response);
		return response.json();
	});

	const constantes: ConstantData = await fetch('api/constantes', {
		method: 'GET'
	}).then((response) => {
		console.log(response);
		return response.json();
	});
	console.log('constantes afuera');
	console.log(constantes);

	// const login: { token: string } = await fetch('/api/login', {
	// 	method: 'POST',
	// 	body: JSON.stringify({ email: user.email, password: user.password })
	// }).then((response) => {
	// 	return response.json();
	// });
	// console.log(login);

	/* const nuevoPresupuesto: PresupuestoModel = {
		fecha: '',
		id_usuario: 1,
		Cliente: {
			direccion: '',
			email: 'hola123@gmail',
			nombre: 'Carlos',
			rut_cliente: '2121',
			telefono: '123'
		},
		Opciones: [
			{
				Ventanas: [
					{
						alto: 800,
						ancho: 2530,
						cantidad: 1,
						id_material: 2,
						id_color: 1,
						id_tipo: 6,
						id_cristal: 1,
						precio_unitario: 0,
						precio_total: 0,
						ganancia: 0.1,
						item: ''
					}
				]
			}
		]
	}; */

	// const resultado = await fetch('/api/presupuesto', {
	// 	method: 'POST',
	// 	body: JSON.stringify(nuevoPresupuesto)
	// }).then((response) => {
	// 	return response.json();
	// });
	// console.log(resultado);

	// const calculadora = await fetch('/api/calculadora', {
	// 	method: 'POST',
	// 	body: JSON.stringify(nuevoPresupuesto.Opciones[0].Ventanas[0])
	// }).then((response) => {
	// 	return response.json();
	// });
	// console.log(calculadora);

	// await fetch('/api/presupuesto', {
	// 	method: 'DELETE'
	// }).then((response) => {
	// 	return response.json();
	// });

	// const constantes = await fetch('/api/constantes', {
	// 	method: 'GET'
	// }).then((response) => {
	// 	return response.json();
	// });
	// console.log(constantes);

	return {
		materiales: constantes.materiales,
		colores: constantes.colores,
		cristales: constantes.cristales,
		tipos: constantes.tipos
	};
};
