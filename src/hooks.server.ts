import { validateJWT } from '$lib';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('authToken') ?? null;
	if (token === null) {
		event.locals.session = null;
		return resolve(event);
	}

	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) {
		event.cookies.set('authToken', '', { path: '/', httpOnly: true, maxAge: 0, sameSite: 'lax' });
		event.locals.session = null;
	} else {
		const { email, is_admin, user_id, exp } = validationResult.value;
		event.locals.session = { email, is_admin, user_id, exp: exp ?? 0 };
	}

	return resolve(event);
};
