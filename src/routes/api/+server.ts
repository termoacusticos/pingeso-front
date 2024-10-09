import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, request, platform }) => {
	console.log('==== SERVER ====');
	const counter = platform?.env.COUNTER.idFromName('A');

	let body = await request.json();
	console.log('==== request body ====');
	console.log(body);

	return json({ adios: 'ADIOS' }, { status: 299, statusText: 'yalo envie' });
	// equivale a: (el response se agrega implicitamente, y se puede usar lo de abajo también)
	// return new Response(JSON.stringify({ adios: 'ADIOS' }), {status: 299, statusText: 'yalo envie' })
};
