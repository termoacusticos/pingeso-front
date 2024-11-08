import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const saludo = await fetch('/api', {
		method: 'POST'
	})
		.then((response) => {
			return response.json();
		})
		.then((data: any) => {
			return data.results;
		});
		console.log(saludo);
		
	return {
		saludo
	};
};
