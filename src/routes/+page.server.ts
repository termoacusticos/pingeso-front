import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const saludo = await fetch('/api', {
		method: 'POST',
		body: JSON.stringify({ hola: 'HOLA' })
	})
		.then((response) => {
			return response.json();
		})
		.then((data: any) => {
			return data.adios;
		});


	return {
		saludo
	};
};
