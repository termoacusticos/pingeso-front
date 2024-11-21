<script lang="ts">
	import Ventana2 from './Ventana2.svelte';
	import DropdownColumn from './DropdownColumn.svelte';
	import { materialOptions, colorOptions, itemOptions } from '$lib/store';

	interface Props {
		opcion: Opcion;
		index: number;
		mostrar_eliminar_opcion: boolean;
		eliminarOpcion: (index: number) => void;
		agregarVentana: any;
	}

	let {
		opcion = $bindable(),
		index,
		mostrar_eliminar_opcion,
		eliminarOpcion,
		agregarVentana
	}: Props = $props();

	// opcion.material = '';
	// opcion.color = '';
	// opcion.ventanas = [{
	// 		material: opcion.material,
	// 		tipo: '',
	// 		item: '',
	// 		cantidad: 1,
	// 		color: opcion.color,
	// 		alto: 0,
	// 		ancho: 0,
	// 		precio_unitario: 20,
	// 		precio_total: 0
	// 	}];

	// $effect(() => {

	// });

	let showMaterialDropdown = $state(false);
	let showColorDropdown = $state(false);

	let coloresDisponibles = [
		{ nombre: 'Nogal', seleccionado: false },
		{ nombre: 'Titanio', seleccionado: false },
		{ nombre: 'Blanco', seleccionado: false },
		{ nombre: 'Negro', seleccionado: false },
		{ nombre: 'Roble Dorado', seleccionado: false },
		{ nombre: 'Mate', seleccionado: false },
		{ nombre: 'Antracita', seleccionado: false }
	];

	const materiales = ['Madera', 'Aluminio', 'PVC'];
	const tipos = ['Corredera', 'Abatible', 'Oscilobatiente'];
	const items = ['Ventana Simple', 'Ventana Doble', 'Ventana Termopanel'];
	const colores = ['Blanco', 'Rojo', 'Violeta'];

	let sumaTotal = $derived(opcion.ventanas.reduce((acc, ventana) => acc + ventana.precio_total, 0));

	let mostrar_eliminar = $derived(opcion.ventanas.length > 1);

	function eliminarVentana(index: number) {
		opcion.ventanas = opcion.ventanas.filter((_, i) => i !== index);
	}
</script>

<div class="space-y-4">
	<!-- Botón para agregar una nueva ventana -->
	<div class="flex flex-row gap-5 items-center">
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
	<div class="flex flex-col">
		<table class="table-auto border-collapse border-gray-100 w-full shadow rounded-lg bg-white">
			<thead>
				<tr class="bg-slate-300 py-2 items-center rounded-t-lg">
					<th class="px-2 px- py-2 border border-gray-300">N°</th>
					<th class="px-2 py-2 border border-gray-300 justify-center">
						<DropdownColumn
							onSelectItem={() => {
								opcion.ventanas.forEach((ventana) => {
									ventana.material = opcion.material;
								});
							}}
							columna={'Material'}
							items={materiales}
							bind:itemSelected={opcion.material}
							bind:showDropdown={showMaterialDropdown} />
					</th>
					<th class="px-2 py-2 border border-gray-300"> Tipo </th>
					<th class="px-2 py-2 border border-gray-300">Item</th>
					<th class="px-2 py-2 border border-gray-300">
						<DropdownColumn
							onSelectItem={() => {
								opcion.ventanas.forEach((ventana) => {
									ventana.color = opcion.color;
								});
							}}
							columna={'Color'}
							items={colores}
							bind:itemSelected={opcion.color}
							bind:showDropdown={showColorDropdown} />
					</th>
					<th class="px-2 py-2 border border-gray-300">Cantidad</th>
					<th class="px-2 py-2 border border-gray-300">Alto</th>
					<th class="px-2 py-2 border border-gray-300">Ancho</th>
					<th class="px-2 py-2 border border-gray-300 w-32 min-w-32">Valor Unitario</th>
					<th class="px-2 py-2 border border-gray-300 w-32 min-w-32">Valor Total</th>
					<th class="px-2 py-2 border border-gray-300"></th>
				</tr>
			</thead>
			<tbody>
				{#each opcion.ventanas as ventana, id}
					<Ventana2
						bind:ventana={opcion.ventanas[id]}
						{id}
						option_index={index}
						{mostrar_eliminar}
						{eliminarVentana}
						changeType={() => {
							materialOptions.update((current) => {
								const updated = [...current]; // Crear una copia del arreglo actual
								updated[id] = ventana.tipo;
								return updated;
							});
						}} />
				{/each}
				<tr>
					<td colspan="10" class="px-4 py-2 text-right font-bold">Total: ${sumaTotal}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
