import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {

	const saludo = await fetch('/api', {
		method: 'POST'
	})
		.then((response) => {
			console.log(response);
			return response.json();
		})
		.then((data) => {
			console.log(data);
			return data.adios;
		});

	return {
		saludo
	};
};
