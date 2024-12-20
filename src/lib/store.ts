import { writable } from 'svelte/store';
import type { Color, Cristal, Material, Tipo } from '@prisma/client';
import type { PresupuestoModel } from './types';

export const presupuesto = writable<PresupuestoModel>();
// Stores para los valores de los modales
export const materialOptions = writable<string[]>([]);
export const colorOptions = writable<string[]>([]);
export const tipoOptions = writable<string[]>([]);
export const cristalOptions = writable<string[]>([]);
export const cantidadOptions = writable<number[]>([]);
export const altoOptions = writable<number[]>([]);
export const anchoOptions = writable<number[]>([]);
export const gananciaOptions = writable<number[]>([]);
export const precioUnitarioOptions = writable<number[]>([]);
export const precioTotalOptions = writable<number[]>([]);

export const materiales = writable<Material[]>([]);
export const colores = writable<Color[]>([]);
export const cristales = writable<Cristal[]>([]);
export const tipos = writable<Tipo[]>([]);

export function resetStores() {
	materialOptions.set([]);
	colorOptions.set([]);
	tipoOptions.set([]);
	cristalOptions.set([]);
	cantidadOptions.set([]);
	altoOptions.set([]);
	anchoOptions.set([]);
	gananciaOptions.set([]);
	precioUnitarioOptions.set([]);
	precioTotalOptions.set([]);

	materiales.set([]);
	colores.set([]);
	cristales.set([]);
	tipos.set([]);
}

