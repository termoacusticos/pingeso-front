import { writable } from 'svelte/store';
import type { Color, Cristal, Material, Tipo } from '@prisma/client';

// Stores para los valores de los modales
export const materialOptions = writable<string[]>([]);
export const colorOptions = writable<string[]>([]);
export const itemOptions = writable<string[]>([]);
export const tipoOptions = writable<string[]>([]);
export const cristalOptions = writable<string[]>([]);
export const cantidadOptions = writable<number[]>([]);
export const altoOptions = writable<number[]>([]);
export const anchoOptions = writable<number[]>([]);

export const materiales = writable<Material[]>([]);
export const colores = writable<Color[]>([]);
export const cristales = writable<Cristal[]>([]);
export const tipos = writable<Tipo[]>([]);