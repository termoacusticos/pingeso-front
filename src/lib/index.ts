import { JWT_SECRET } from '$env/static/private';
import { jwtVerify } from 'jose';
import { err, ok } from 'neverthrow';

const TOKEN_SECRET = new TextEncoder().encode(JWT_SECRET);

export const getDB = (platform: Readonly<App.Platform> | undefined) => {
	if (!platform) return err('falló la conexión con la db');

	return ok(platform.env.DB);
};

export const validateJWT = async (token: string) => {
	try {
		const { payload } = await jwtVerify<{ user_id: number; is_admin: number; email: string }>(
			token,
			TOKEN_SECRET
		);

		return ok(payload);
	} catch (error) {
		return err(error);
	}
};
