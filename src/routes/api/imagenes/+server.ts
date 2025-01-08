import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDB, validateJWT } from '$lib';
import { deleteImagenes, getImagenes, saveImagenes } from '$lib/repositories/imagen';
import type { Imagen } from '@prisma/client';
import type { ImageGroup } from '$lib/types';

export const GET: RequestHandler = async ({ platform, cookies }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const imagenesResult = await getImagenes();

	if (imagenesResult.isErr()) {
		return json({ error: 'Error al buscar imagenes.' }, { status: 500 });
	}

	let imagenes = imagenesResult.value.reduce(
		(acc, image) => {
			// Busca si ya existe un grupo con el img_group actual
			let group = acc.find((g) => g.img_group === image.img_group);

			// Si no existe, lo crea y lo añade al acumulador
			if (!group) {
				group = { img_group: image.img_group, imagenes: [] };
				acc.push(group);
			}

			// Agrega la imagen al grupo correspondiente
			group.imagenes.push(image);

			return acc;
		},
		[
			{ img_group: 1, imagenes: [] },
			{ img_group: 2, imagenes: [] },
			{ img_group: 3, imagenes: [] }
		] as ImageGroup[]
	);

	return json(imagenes);
};

export const POST: RequestHandler = async ({ request, platform, cookies }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const imagen: Imagen = await request.json<Imagen>();

	const result = await saveImagenes(imagen);

	if (result.isErr()) {
		return json({ error: 'Error al crear imagenes.' }, { status: 500 });
	}
	return json({ message: 'Imagenes creadas correctamente.' });
};

export const DELETE: RequestHandler = async ({ request, platform, cookies }) => {
	const connection = getDB(platform);
	if (connection.isErr()) return json({ error: connection.error }, { status: 400 });

	const token = cookies.get('authToken');
	if (!token) return json({ error: 'Token no proporcionado.' }, { status: 401 });
	const validationResult = await validateJWT(token);
	if (validationResult.isErr()) return json({ error: 'Token inválido.' }, { status: 401 });

	const { id_imagen } = await request.json<{ id_imagen: number }>();

	const result = await deleteImagenes(id_imagen);

	if (result.isErr()) {
		return json({ error: 'Error al borrar imagen.' }, { status: 500 });
	}

	return json({ message: 'Imagen eliminada correctamente.' });
};
