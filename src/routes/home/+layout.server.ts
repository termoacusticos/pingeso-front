import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const login = await fetch('/api/login', {
		method: 'GET'
	});

	if (!login.ok) {
		console.log('NO AUTH');

		redirect(301, '/');
	}
	return {};
};
