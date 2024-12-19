<script lang="ts">
	import {
		materialOptions,
		colorOptions,
		tipoOptions,
		cantidadOptions,
		altoOptions,
		anchoOptions,
		cristalOptions,
		gananciaOptions

	} from '$lib/store';
	import type { ConstantData, VentanaUI } from '$lib/types';
	import type { Cristal, Tipo } from '@prisma/client';

	interface Props {
		data: ConstantData;
		ventana: VentanaUI;
		id: number;
		option_index: number;
		mostrar_eliminar: boolean;
		eliminarVentana: (id: number) => void;
	}

	let {
		data,
		ventana = $bindable(),
		id,
		option_index,
		mostrar_eliminar,
		eliminarVentana
	}: Props = $props();

	let tiposLista: Tipo[] = data.tipos;
	let cristalesLista: Cristal[] = data.cristales;
	let mostrar_porcentaje = false; // Define the variable

	//$inspect('tipo ventana', ventana.tipo)
	//$inspect('lista tipo', $tipoOptions);

    tipoOptions.subscribe((value) => {
        if (value[id] !== undefined) {
            ventana.tipo = value[id]; // Actualiza solo si hay un valor definido
        }
    });

   

	cristalOptions.subscribe((value) => {
        if (value[id] !== undefined) {
            ventana.cristal = value[id]; // Actualiza solo si hay un valor definido
        }
    });

	cantidadOptions.subscribe((value) => {
        if (value[id] !== undefined) {
            ventana.cantidad = value[id]; // Actualiza solo si hay un valor definido
        }
    });

	altoOptions.subscribe((value) => {
        if (value[id] !== undefined) {
            ventana.alto = value[id]; // Actualiza solo si hay un valor definido
        }
    });

	anchoOptions.subscribe((value) => {
        if (value[id] !== undefined) {
            ventana.ancho = value[id]; // Actualiza solo si hay un valor definido
        }
    });

	function calculateTotal() {
		ventana.precio_total = ventana.cantidad * ventana.precio_unitario;
	}

	$effect(() => {
		ventana.precio_total = ventana.cantidad * ventana.precio_unitario;
	});
</script>

<tr class=" border-b">
	<td class="px-1 pl-2 py-1">#{id + 1}</td>

	<!-- Material Selector -->
	<td class="px-1 py-1">
		<p class="p-2 rounded-md w-full bg-white border">{ventana.material}</p>
	</td>

	<!-- Tipo Selector -->
	<td class="px-1 py-1">
		<select bind:value={ventana.tipo} 
		onchange={() => {
			tipoOptions.update((current) => {
				const updated = [...current]; // Crear una copia del arreglo actual
				updated[id] = ventana.tipo;
				return updated;
			});
		}} 
		class="p-2 rounded-md bg-white border">
			<option selected disabled value="">Selecciona un tipo</option>
			{#each tiposLista as option}
				<option>{option.descripcion_tipo}</option>
			{/each}
		</select>
	</td>

	<!-- Tipo Selector -->
	<td class="px-1 py-1">
		<select bind:value={ventana.cristal} 
		onchange={() => {
			cristalOptions.update((current) => {
				const updated = [...current]; // Crear una copia del arreglo actual
				updated[id] = ventana.cristal;
				return updated;
			});
		}} 
		class="p-2 rounded-md bg-white border">
			<option selected disabled value="">Selecciona un tipo</option>
			{#each cristalesLista as option}
				<option>{option.desc_cristal}</option>
			{/each}
		</select>
	</td>

	

	<!-- Color Input -->
	<td class="px-1 py-1">
		<p class="p-2 rounded-md w-full bg-white border">{ventana.color}</p>
	</td>

	<!-- Cantidad Input -->
	<td class="px-1 py-1">
		<input
			type="number"
			bind:value={ventana.cantidad}
			onchange={() => {
				cantidadOptions.update((current) => {
					const updated = [...current]; // Crear una copia del arreglo actual
					updated[id] = ventana.cantidad;
					return updated;
				});
			}} 
			min="1"
			class="p-2 border rounded-md w-full" />
	</td>

	<!-- Dimensiones Alto y Ancho -->
	<td class="px-1 py-1">
		<input type="text"
		bind:value={ventana.alto} 
		oninput={() => {
			altoOptions.update((current) => {
				const updated = [...current]; // Crear una copia del arreglo actual
				if (ventana.alto !== undefined) {
					updated[id] = ventana.alto;
				}
				return updated;
			});
		}}
		class="p-2 border rounded-md w-full" 
		placeholder="0"/>
	</td>



	<td class="px-1 pr-2 py-1">
		<input type="text"
		bind:value={ventana.ancho} 
		oninput={() => {
			anchoOptions.update((current) => {
				const updated = [...current]; // Crear una copia del arreglo actual
				if (ventana.ancho !== undefined) {
					updated[id] = ventana.ancho;
				}
				return updated;
			});
		}}
		class="p-2 border rounded-md w-full" 
		placeholder="0"/>
	</td>


	<!-- Ganancia -->
	<td class="px-1 py-1">
		<input type="text"
			bind:value={ventana.ganancia}
			onchange={() => {
				gananciaOptions.update((current) => {
					const updated = [...current]; // Crear una copia del arreglo actual
					if (ventana.ganancia !== undefined) {
						updated[id] = ventana.ganancia;
					}
					return updated;
				});
			}} 
			class="p-2 border rounded-md w-full" placeholder="0"/>
	</td>


	<!-- Precio Unitario -->
	<td class="px-1 py-1">
		<p class="p-2 rounded-md w-full bg-white border">{ventana.precio_unitario}</p>
	</td>

	<!-- Precio Total -->
	<td class="px-1 py-1">
		<p class="p-2 rounded-md w-full bg-white border">{ventana.precio_total}</p>
	</td>



	<!-- Delete Button -->
	<td class="px-1 pr-2 py-1">
		{#if mostrar_eliminar}
			<button class="text-red-500" aria-label="delete" onclick={() => eliminarVentana(id)}>
				<span class="size-8 iconify mdi--delete align-middle"></span>
			</button>
		{:else}
			<span class="size-8 iconify mdi--delete opacity-30 align-middle"></span>
		{/if}
	</td>
</tr>
