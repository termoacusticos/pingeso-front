import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	console.log('==== TAMBIEN SERVER ====');

	const saludo = await fetch('/api', {
		method: 'POST',
		body: JSON.stringify({ hola: 'HOLA' })
	})
		.then((response) => {
			console.log('==== response ====');
			console.log(response);
			return response.json();
		})
		.then((data) => {
			console.log('==== data ====');
			console.log(data);
			return data.adios;
		});

	return {
		saludo
	};
};
