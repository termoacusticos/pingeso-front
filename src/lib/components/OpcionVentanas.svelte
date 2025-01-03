<script lang="ts">
	import Ventana2 from './Ventana2.svelte';
	import DropdownColumn from './DropdownColumn.svelte';
	import {
		tipoOptions,
		anchoOptions,
		altoOptions,
		cantidadOptions,
		gananciaOptions
	} from '$lib/store';
	import type { ConstantData, OpcionUI } from '$lib/types';
	import type { Color, Cristal, Material, Tipo } from '@prisma/client';

	interface Props {
		data: ConstantData;
		opcion: OpcionUI;
		index: number;
		mostrar_eliminar_opcion: boolean;
		eliminarOpcion: (index: number) => void;
		agregarVentana: any;
		eliminarVentana: any;
	}

	let {
		data,
		opcion = $bindable(),
		index,
		mostrar_eliminar_opcion,
		eliminarOpcion,
		agregarVentana,
		eliminarVentana
	}: Props = $props();

	let showMaterialDropdown = $state(false);
	let showColorDropdown = $state(false);

	let materiales: Material[] = data.materiales;
	let colores: Color[] = data.colores;

	let materialesNombre: string[] = $state(materiales.map((material) => material.nombre_material));
	let coloresNombre: string[] = $state(colores.map((color) => color.nombre_color));

	let sumaTotal = $derived(
		opcion.ventanas.reduce(
			(acc, ventana) => acc + ventana.precio_total * (1 + (ventana.ganancia ?? 0) / 100),
			0
		)
	);

	let mostrar_eliminar = $derived(opcion.ventanas.length > 1);

	/*
	function eliminarVentana(index: number) {
		// Eliminar la ventana de la lista principal
		opcion.ventanas = opcion.ventanas.filter((_, i) => i !== index);

		itemOptions.update((current) => current.filter((_, i) => i !== index));
		tipoOptions.update((current) => current.filter((_, i) => i !== index));
		cantidadOptions.update((current) => current.filter((_, i) => i !== index));
		altoOptions.update((current) => current.filter((_, i) => i !== index));
		anchoOptions.update((current) => current.filter((_, i) => i !== index));
	}
	*/
</script>

<div class="space-y-4 bg-white pt-5 px-5 shadow rounded-lg">
	<!-- Botón para agregar una nueva ventana -->
	<div class="flex flex-row gap-5 items-center justify-between w-full">
		<h1 class="text-xl font-semibold text-gray-800">Opción {index + 1}</h1>
		{#if index < 1}
			<button
				onclick={agregarVentana}
				class="bg-teal-600 hover:bg-teal-500 transition-all text-white px-3 p-2 rounded font-bold"
				>+ Agregar Ventana</button>
		{/if}
		{#if mostrar_eliminar_opcion && index >= 1}
			<button
				class="bg-red-500 hover:bg-red-400 text-white p-2 rounded font-bold"
				onclick={() => eliminarOpcion(index)}>
				Eliminar Opción
			</button>
		{/if}
	</div>

	<!-- Lista de ventanas -->
	<div class="flex flex-col rounded-lg">
		<table class=" table-auto w-full rounded-lg bg-white">
			<thead class="rounded-lg">
				<tr class="py-2 items-center rounded-lg">
					<th class="px-1 pl-2 py-2">N°</th>
					<th class="px-1 py-2 justify-center">
						<DropdownColumn
							onSelectItem={() => {
								opcion.ventanas.forEach((ventana) => {
									ventana.material = opcion.material;
								});
							}}
							columna={'Material'}
							items={materialesNombre}
							bind:itemSelected={opcion.material}
							bind:showDropdown={showMaterialDropdown} />
					</th>
					<th class="px-1 py-2"> Tipo </th>
					<th class="px-1 py-2"> Cristal </th>
					<th class="px-1 py-2">
						<DropdownColumn
							onSelectItem={() => {
								opcion.ventanas.forEach((ventana) => {
									ventana.color = opcion.color;
								});
							}}
							columna={'Color'}
							items={coloresNombre}
							bind:itemSelected={opcion.color}
							bind:showDropdown={showColorDropdown} />
					</th>
					<th class="px-1 py-2 min-w-20">Cantidad</th>
					<th class="px-1 py-2 min-w-20">Ancho</th>
					<th class="px-1 py-2 min-w-20">Alto</th>
					<th class="px-1 py-2 min-w-20">Ganancia</th>
					<th class="px-1 py-2 w-32 min-w-32">Valor Unitario</th>
					<th class="px-1 py-2 w-32 min-w-32">Valor Total</th>
					<th class="px-1 pr-2 py-2"></th>
				</tr>
			</thead>
			<tbody>
				{#each opcion.ventanas as ventana, id}
					<Ventana2
						{data}
						bind:ventana={opcion.ventanas[id]}
						{id}
						option_index={index}
						{mostrar_eliminar}
						{eliminarVentana} />
				{/each}
				<tr>
					<td colspan="10" class="px-4 py-2 text-right font-bold"
						>Total: ${sumaTotal.toLocaleString().split(',')[0]}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
