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
		ventana: VentanaEntity;
		id: number;
		option_index: number;
		mostrar_eliminar: boolean;
		eliminarVentana: (id: number) => void;
	}

	let {
		ventana = $bindable(),
		id,
		option_index,
		mostrar_eliminar,
		eliminarVentana
	}: Props = $props();

	const materiales = ['Madera', 'Aluminio', 'PVC'];
	const tipos = ['Corredera', 'Abatible', 'Oscilobatiente'];
	const items = ['Ventana Simple', 'Ventana Doble', 'Ventana Termopanel'];
	const colores = ['Blanco', 'Rojo', 'Violeta'];

	//$inspect('tipo ventana', ventana.tipo)
	//$inspect('lista tipo', $tipoOptions);

    tipoOptions.subscribe((value) => {
        if (value[id] !== undefined) {
            ventana.tipo = value[id]; // Actualiza solo si hay un valor definido
        }
    });

    itemOptions.subscribe((value) => {
        if (value[id] !== undefined) {
            ventana.item = value[id]; // Actualiza solo si hay un valor definido
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
			{#each tipos as option}
				<option>{option}</option>
			{/each}
		</select>
	</td>

	<!-- Item Input -->
	<td class="px-1 py-1">
		<input
			type="text"
			bind:value={ventana.item}
			oninput={() => {
				itemOptions.update((current) => {
					const updated = [...current]; // Crear una copia del arreglo actual
					updated[id] = ventana.item;
					return updated;
				});
			}}
			class="p-2 border rounded-md w-32"
			placeholder="Ingrese item" />
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
		<input type="number" 
		bind:value={ventana.alto} 
		oninput={() => {
			altoOptions.update((current) => {
				const updated = [...current]; // Crear una copia del arreglo actual
				updated[id] = ventana.alto;
				return updated;
			});
		}}
		min="0" class="p-2 border rounded-md w-full"/>
	</td>

	<td class="px-1 py-1">
		<input type="number" 
		bind:value={ventana.ancho} 
		oninput={() => {
			anchoOptions.update((current) => {
				const updated = [...current]; // Crear una copia del arreglo actual
				updated[id] = ventana.ancho;
				return updated;
			});
		}}
		min="0" class="p-2 border rounded-md w-full" />
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
