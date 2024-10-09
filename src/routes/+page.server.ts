import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {

	const saludo = await fetch('/api', {
		method: 'POST',
		body: JSON.stringify({ hola: 'HOLA' })
	})
		.then((response) => {
			console.log(response);
			return response.json();
		})
		.then((data) => {
			return data.adios;
		});

	return {
		saludo
	};
};
