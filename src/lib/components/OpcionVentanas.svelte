<script lang="ts">
	import Ventana2 from './Ventana2.svelte';
	import DropdownColumn from './DropdownColumn.svelte';
	import type { ConstantData, OpcionUI, VentanaModel, VentanaUI } from '$lib/types';
	import type { Color, Material } from '@prisma/client';

	interface Props {
		convertirVentana: (ventana: VentanaUI) => VentanaModel;
		data: ConstantData;
		opcion: OpcionUI;
		index: number;
		mostrar_eliminar_opcion: boolean;
		eliminarOpcion: (index: number) => void;
		agregarVentana: any;
		eliminarVentana: any;
		ganancia_global?: number; // Añadir ganancia_global
	}

	let {
		convertirVentana,
		data,
		opcion = $bindable(),
		index,
		mostrar_eliminar_opcion,
		eliminarOpcion,
		agregarVentana,
		eliminarVentana,
		ganancia_global = 0 // Valor por defecto
	}: Props = $props();

	let showMaterialDropdown = $state(false);
	let showColorDropdown = $state(false);

	let materiales: Material[] = data.materiales;
	let colores: Color[] = data.colores;

	let materialesNombre: string[] = $state(materiales.map((material) => material.nombre_material));
	let coloresNombre: string[] = $state(colores.map((color) => color.nombre_color));

	let sumaTotal = $derived(opcion.ventanas.reduce((acc, ventana) => acc + ventana.precio_total, 0));

	let sumaTotalConGanancia = $derived(
		opcion.ventanas.reduce(
			(acc, ventana) =>
				acc + ventana.precio_unitario * ventana.cantidad * (1 + ganancia_global / 100),
			0
		)
	);

	let mostrar_eliminar = $derived(opcion.ventanas.length > 1);

	function formatoChileno(valor: number) {
		const truncado = Math.trunc(valor); // Trunca el número
		return new Intl.NumberFormat('es-CL', {
			style: 'currency',
			currency: 'CLP',
			minimumFractionDigits: 0
		}).format(truncado);
	}

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
							onSelectItem={(item) => {
								console.log(item);
								opcion.material = item;
								opcion.ventanas.forEach((ventana) => {
									ventana.material = opcion.material;
								});
							}}
							columna={'Material'}
							items={materialesNombre}
							bind:showDropdown={showMaterialDropdown} />
					</th>
					<th class="px-1 py-2"> Tipo </th>
					<th class="px-1 py-2"> Cristal </th>
					<th class="px-1 py-2">
						<DropdownColumn
							onSelectItem={(item) => {
								opcion.color = item;
								opcion.ventanas.forEach((ventana) => {
									ventana.color = opcion.color;
								});
							}}
							columna={'Color'}
							items={coloresNombre}
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
						{convertirVentana}
						{data}
						bind:ventana={opcion.ventanas[id]}
						{id}
						bind:ganancia_global
						option_index={index}
						{mostrar_eliminar}
						{eliminarVentana} />
				{/each}
				<tr>
					<td colspan="11" class="px-4 py-2 text-right font-bold">
						<!-- Mostrar total y total con ganancia -->
						<span class="">
							Total: {formatoChileno(sumaTotalConGanancia)}
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
