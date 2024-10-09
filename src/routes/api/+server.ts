import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, request }) => {
	console.log('==== SERVER ====');

	let body = await request.json();
	console.log('==== request body ====');
	console.log(body);

	return json({ adios: 'ADIOS' }, { status: 299, statusText: 'yalo envie' });
};
