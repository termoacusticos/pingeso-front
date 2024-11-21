<script lang="ts">
	import {
		materialOptions,
		colorOptions,
		itemOptions,
		tipoOptions,
		cantidadOptions,
		altoOptions,
		anchoOptions
	} from '$lib/store';

	interface Props {
		ventana: Ventana;
		id: number;
		option_index: number;
		mostrar_eliminar: boolean;
		eliminarVentana: (id: number) => void;
		changeType: any;
	}

	let {
		ventana = $bindable(),
		id,
		option_index,
		mostrar_eliminar,
		eliminarVentana,
		changeType
	}: Props = $props();

	const materiales = ['Madera', 'Aluminio', 'PVC'];
	const tipos = ['Corredera', 'Abatible', 'Oscilobatiente'];
	const items = ['Ventana Simple', 'Ventana Doble', 'Ventana Termopanel'];
	const colores = ['Blanco', 'Rojo', 'Violeta'];

	function calculateTotal() {
		ventana.precio_total = ventana.cantidad * ventana.precio_unitario;
	}

	$effect(() => {
		ventana.precio_total = ventana.cantidad * ventana.precio_unitario;
	});
</script>

<tr class="border">
	<td class="px-2 py-2">#{id + 1}</td>

	<!-- Material Selector -->
	<td class="px-2 py-2">
		<p class="p-2 rounded-md w-full bg-gray-100">{ventana.material}</p>
	</td>

	<!-- Tipo Selector -->
	<td class="px-2 py-2">
		<select bind:value={ventana.tipo} onselect={changeType} class="p-2 rounded-md">
			<option selected disabled value="">Selecciona un tipo</option>
			{#each tipos as option}
				<option>{option}</option>
			{/each}
		</select>
	</td>

	<!-- Item Selector -->
	<td class="px-2 py-2">
		<input
			type="text"
			bind:value={ventana.item}
			class="p-2 border rounded-md"
			placeholder="Ingrese item" />
	</td>

	<!-- Color Input -->
	<td class="px-2 py-2">
		<p class="p-2 rounded-md w-full bg-gray-100">{ventana.color}</p>
	</td>

	<!-- Cantidad Input -->
	<td class="px-2 py-2">
		<input
			type="number"
			bind:value={ventana.cantidad}
			min="1"
			class="p-2 border rounded-md w-full" />
	</td>

	<!-- Dimensiones Alto y Ancho -->
	<td class="px-2 py-2">
		<input type="number" bind:value={ventana.alto} min="0" class="p-2 border rounded-md w-full" />
	</td>

	<td class="px-2 py-2">
		<input type="number" bind:value={ventana.ancho} min="0" class="p-2 border rounded-md w-full" />
	</td>

	<!-- Precio Unitario -->
	<td class="px-2 py-2">
		<p class="p-2 rounded-md w-full bg-gray-100">{ventana.precio_unitario}</p>
	</td>

	<!-- Precio Total -->
	<td class="px-2 py-2">
		<p class="p-2 rounded-md w-full bg-gray-100">{ventana.precio_total}</p>
	</td>

	<!-- Delete Button -->
	<td class="px-2 py-2">
		{#if mostrar_eliminar}
			<button class="text-red-500" aria-label="delete" onclick={() => eliminarVentana(id)}>
				<span class="size-8 iconify mdi--delete align-middle"></span>
			</button>
		{:else}
			<span class="size-8 iconify mdi--delete opacity-30 align-middle"></span>
		{/if}
	</td>
</tr>
