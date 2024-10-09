import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, request, platform }) => {
	console.log('==== SERVER ====');
	let sql = await platform?.env.DB.prepare('SELECT * FROM usuarios;').run();
	console.log(sql?.results);

	return json({ adios: sql?.results }, { status: 299, statusText: 'yalo envie' });
	// equivale a: (el response se agrega implicitamente, y se puede usar lo de abajo también)
	// return new Response(JSON.stringify({ adios: 'ADIOS' }), {status: 299, statusText: 'yalo envie' })
};
