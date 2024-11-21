import { writable } from 'svelte/store';

// Stores para los valores de los modales
export const materialOptions = writable<string[]>([]);
export const colorOptions = writable<string[]>([]);
export const itemOptions = writable<string[]>([]);
export const tipoOptions = writable<string[]>([]);
export const cantidadOptions = writable<number[]>([]);
export const altoOptions = writable<number[]>([]);
export const anchoOptions = writable<number[]>([]);