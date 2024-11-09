import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const user: Usuario = { id: 0, email: 'asdasd@gmgm', password: 'HOLA', rol_id: 0 };
	const registro = await fetch('/api/register', {
		method: 'POST',
		body: JSON.stringify(user)
	}).then((response) => {
		return response.json();
	});

	console.log(registro);
	const login = await fetch('/api/login', {
		method: 'POST',
		body: JSON.stringify({ email: user.email, password: user.password })
	}).then((response) => {
		return response.json();
	});
	console.log(login);

	return {};
};
