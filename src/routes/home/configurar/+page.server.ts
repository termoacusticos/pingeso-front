import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session == null || !locals.session.is_admin) {
		redirect(308, '/');
	}

	return {};
};
