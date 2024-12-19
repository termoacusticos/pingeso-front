import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const presupuestos = await fetch('/api/presupuesto', {
		method: 'GET'
	}).then((response) => {
		return response.json();
	});
	console.log(presupuestos);

	return { presupuestos };
};
