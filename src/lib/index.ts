import { JWT_SECRET } from '$env/static/private';
import { jwtVerify } from 'jose';
import { err, ok } from 'neverthrow';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

const TOKEN_SECRET = new TextEncoder().encode(JWT_SECRET);

export let prisma: PrismaClient;

let __prisma: PrismaClient | undefined;

export const getDB = (platform: Readonly<App.Platform> | undefined) => {
	if (!platform) return err('falló la conexión con la db');
	if (!__prisma) {
		const adapter = new PrismaD1(platform.env.DB);
		prisma = new PrismaClient({ adapter });
		if (process.env.NODE_ENV === 'development') __prisma = prisma;
	} else {
		prisma = __prisma;
	}
	return ok(prisma);
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
