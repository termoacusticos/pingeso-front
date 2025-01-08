import { prisma } from '$lib';
import type { Color } from '@prisma/client';
import { err, ok } from 'neverthrow';

export const saveColor = async (color: Color) => {
	return prisma.color
		.create({ data: { ...color, id_color: undefined } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const updateColor = async (id: number, color: Color) => {
	return prisma.color
		.update({ where: { id_color: id }, data: { ...color, id_color: id } })
		.then((response) => ok(response))
		.catch((error) => err(error));
};
