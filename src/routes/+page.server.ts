import type { PageServerLoad } from './$types';
import util from 'util';

export const load: PageServerLoad = async ({ fetch }) => {
	const user: UsuarioEntity = {
		id_usuario: 0,
		email: 'asdasd@gmgm',
		password: 'HOLA',
		is_admin: 0
	};

	const registro = await fetch('/api/register', {
		method: 'POST',
		body: JSON.stringify(user)
	}).then((response) => {
		return response.json();
	});
	console.log(registro);

	const login: { token: string } = await fetch('/api/login', {
		method: 'POST',
		body: JSON.stringify({ email: user.email, password: user.password })
	}).then((response) => {
		return response.json();
	});
	console.log(login);

	const jwt: JWTBody = await fetch('/api/register', {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${login.token}`
		}
	}).then((response) => {
		return response.json();
	});
	console.log(jwt);

	const nuevoPresupuesto: Presupuesto = {
		fecha: '',
		id_presupuesto: 0,
		id_usuario: jwt.user_id,
		nombre_cliente: '2 ventanas',
		opciones: [
			{
				id_opcion: 1,
				ventanas: [
					{
						alto: 100,
						ancho: 100,
						cantidad: 1,
						color: 'Alcánts',
						descripcion: '',
						id: 0,
						id_opcion: 1,
						material: 'PVC',
						maximo: 10,
						minimo: 20
					},
					{
						alto: 100,
						ancho: 100,
						cantidad: 3,
						color: 'Alcntar',
						descripcion: '',
						id: 0,
						id_opcion: 1,
						material: 'PVC',
						maximo: 10,
						minimo: 20
					}
				]
			}
		],
		rut_cliente: '2121'
	};
	// const presupuesto = await fetch('/api/presupuesto', {
	// 	method: 'POST',
	// 	body: JSON.stringify(nuevoPresupuesto),
	// 	headers: {
	// 		Authorization: `Bearer ${login.token}`
	// 	}
	// }).then((response) => {
	// 	return response.json();
	// });
	// console.log(presupuesto);

	const getPresupuesto: Presupuesto[] = await fetch('/api/presupuesto', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${login.token}`
		}
	}).then((response) => {
		return response.json();
	});
	console.log(util.inspect(getPresupuesto, false, null, true));

	return {};
};
