import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { init } from '$lib';
import { PUBLIC_IS_DEV } from '$env/static/public';

export const POST: RequestHandler = async ({ fetch, request, platform }) => {
	const db = platform?.env.DB;

	if (PUBLIC_IS_DEV) {
		console.log(init); // init de la db local, en prod está listo
		init.forEach((query) => {
			db?.prepare(query).run();
		});
	}

	console.log('==== SERVER ====');
	let sql1 = await db?.prepare('SELECT * FROM usuarios;').run();
	console.log(sql1?.results);
	return json({ adios: sql1?.results ?? ['NADA'] }, { status: 299, statusText: 'yalo envie' });
	// equivale a: (el response se agrega implicitamente, y se puede usar lo de abajo también)
	// return new Response(JSON.stringify({ adios: 'ADIOS' }), {status: 299, statusText: 'yalo envie' })
};
