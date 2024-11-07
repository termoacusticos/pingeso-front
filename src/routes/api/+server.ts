import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { init_db } from '$lib';
import { PUBLIC_IS_DEV } from '$env/static/public';

export const POST: RequestHandler = async ({ fetch, request, platform }) => {
	// instanciar db
	const db = platform?.env.DB;

	if (PUBLIC_IS_DEV) {
		console.log(init_db); // init de la db local, en prod está listo
		init_db.forEach((query) => {
			db?.prepare(query).run();
		});
	}
	// stmt = statement
	let usuarios = db
		?.prepare('SELECT * FROM usuarios;')
		.run()
		.then((stmt) => stmt.results);

	return json({ results: await usuarios });
};
