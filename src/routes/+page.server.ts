import type { PageServerLoad } from './$types';
import type { Usuario } from '@prisma/client';
import type { ConstantData, JWTBody, PresupuestoModel } from '$lib/types';

export const load: PageServerLoad = async ({ fetch }) => {
	/*await fetch('/api/login', {
		method: 'GET'
	}).then((response) => {
		// if (response.ok) {
		// 	redirect(301, '/home');
		// }
		return response.json<JWTBody>();
	});*/

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
	// console.log(constantes);

	const login: { token: string } = await fetch('/api/login', {
		method: 'POST',
		body: JSON.stringify({ email: user.email, password: user.password })
	}).then((response) => {
		return response.json();
	});
	console.log(login);

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

	// console.log('!/// constantes ///');

	// const cristal_nuevo = await fetch('api/cristal', {
	// 	method: 'POST',
	// 	body: JSON.stringify({
	// 		cristalData: {
	// 			desc_cristal: 'prueba_c',
	// 			precio_cristal: 100000
	// 		}
	// 	})
	// }).then((resp) => resp.json<Cristal>());

	// await fetch('api/cristal', {
	// 	method: 'PUT',
	// 	body: JSON.stringify({
	// 		id: cristal_nuevo.id_cristal,
	// 		cristalData: {
	// 			desc_cristal: 'ejemplo2',
	// 			precio_cristal: 100000,
	// 			id_cristal: cristal_nuevo.id_cristal
	// 		}
	// 	})
	// });
	// const cristales = await fetch('api/cristal', {
	// 	method: 'GET'
	// });
	// // console.log(await cristales.json());

	// await fetch('api/material', {
	// 	method: 'DELETE',
	// 	body: JSON.stringify({
	// 		id_material: 1
	// 	})
	// });
	// let tipos = await fetch('api/tipo', {
	// 	method: 'GET'
	// });

	// await fetch('api/tipo', {
	// 	method: 'PUT',
	// 	body: JSON.stringify({
	// 		id: constantes.tipos[0],
	// 		tipo: { ...constantes.tipos[0], descripcion_tipo: 'ejemplo' }
	// 	})
	// });

	// await fetch('api/quincalleria', {
	// 	method: 'POST',
	// 	body: JSON.stringify({
	// 		quincalleriaData: {
	// 			desc_quin: 'Ejemplo',
	// 			formula_quin: 'X*Y',
	// 			id_quincalleria: 0,
	// 			precio_quin: 100000
	// 		}
	// 	})
	// });
	// let quinc = await fetch('api/quincalleria', {
	// 	method: 'GET'
	// });
	// console.log(await quinc.json());

	// await fetch('api/quincalleria', {
	// 	method: 'PUT',
	// 	body: JSON.stringify({
	// 		id: 1,
	// 		quincalleriaData: {
	// 			desc_quin: 'Ejemplo232',
	// 			formula_quin: 'X*Y',
	// 			id_quincalleria: 1,
	// 			precio_quin: 100000
	// 		}
	// 	})
	// });

	// quinc = await fetch('api/quincalleria', {
	// 	method: 'GET'
	// });
	// console.log(await quinc.json());

	// await fetch('api/quincalleria', {
	// 	method: 'DELETE',
	// 	body: JSON.stringify({
	// 		id_quincalleria: 0
	// 	})
	// });

	// let perfil = await fetch('api/perfil', {
	// 	method: 'GET'
	// });
	// console.log(await perfil.json());

	// await fetch('api/perfil', {
	// 	method: 'POST',
	// 	body: JSON.stringify({
	// 		perfilData: {
	// 			codigo_per: 2,
	// 			formula_cant: 'X',
	// 			formula_dim: '2',
	// 			id_perfil: 0,
	// 			kg_ml_per: 100,
	// 			valor: 10000
	// 		}
	// 	})
	// });
	// await fetch('api/perfil', {
	// 	method: 'PUT',
	// 	body: JSON.stringify({
	// 		id: 105,
	// 		perfilData: {
	// 			codigo_per: 2,
	// 			formula_cant: 'Y',
	// 			formula_dim: '2',
	// 			id_perfil: 0,
	// 			kg_ml_per: 100,
	// 			valor: 10000
	// 		}
	// 	})
	// });

	// await fetch('api/quincalleria', {
	// 	method: 'DELETE',
	// 	body: JSON.stringify({
	// 		id_quincalleria: 52
	// 	})
	// });

	return {
		materiales: constantes.materiales,
		colores: constantes.colores,
		cristales: constantes.cristales,
		tipos: constantes.tipos
	};
};
