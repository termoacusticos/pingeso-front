import type { PageServerLoad } from './$types';

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

	const jwt = await fetch('/api/register', {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${login.token}`
		}
	}).then((response) => {
		return response.json();
	});
	console.log(jwt);

	return {};
};
