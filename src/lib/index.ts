import { err, ok } from 'neverthrow';

export const getDB = (platform: Readonly<App.Platform> | undefined) => {
	if (!platform) return err('falló la conexión con la db');

	return ok(platform.env.DB);
};
