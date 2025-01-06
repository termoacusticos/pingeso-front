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
		ganancia_global: number;
		id: number;
		option_index: number;
		mostrar_eliminar: boolean;
		eliminarVentana: (id: number) => void;
	}

	let {
		data,
		ventana = $bindable(),
		id,
		ganancia_global = $bindable(),
		option_index,
		mostrar_eliminar,
		eliminarVentana
	}: Props = $props();

	let tiposLista: Tipo[] = data.tipos;
	let cristalesLista: Cristal[] = data.cristales;
	let tiposFiltrados = $state<Tipo[]>([]);
	let mostrar_porcentaje = false; // Define the variable

	// Mensajes para mostrar si alto/ancho quedan fuera de los rangos
	let msgAlto = $state('');
	let msgAncho = $state('');

	//$inspect('tipo ventana', ventana.tipo)
	//$inspect('lista tipo', $tipoOptions);

	//Reactividad para obtener los tipos de acuerdo al material seleccionado
	$effect(() => {
		const materialSeleccionado = data.materiales.find(
			(m) => m.nombre_material === ventana.material
		);
		if (!materialSeleccionado) {
			tiposFiltrados = [];
		} else {
			// Filtra solo los tipos que tengan el mismo id_material
			tiposFiltrados = data.tipos.filter((t) => t.id_material === materialSeleccionado.id_material);
		}
	});

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

	// Valida los rangos cada vez que cambien alto, ancho o el tipo
	$effect(() => {
		// Limpia mensajes antes de recalcular
		msgAlto = '';
		msgAncho = '';

		const tipoSeleccionado = data.tipos.find((t) => t.descripcion_tipo === ventana.tipo);
		if (!tipoSeleccionado) return;

		const { minimo, maximo } = tipoSeleccionado;

		// Validar ALTO
		if (ventana.alto === undefined || ventana.alto === null) {
			msgAlto = '';
		} else if (minimo !== null && maximo !== null) {
			if (ventana.alto < minimo) {
				msgAlto = `El alto mínimo para "${ventana.tipo}" es ${minimo} cm`;
			} else if (ventana.alto > maximo) {
				msgAlto = `El alto máximo para "${ventana.tipo}" es ${maximo} cm`;
			} else {
				msgAlto = '';
			}
		}
	});

	function formatoChileno(valor: number) {
		const truncado = Math.trunc(valor); // Trunca el número
		return new Intl.NumberFormat('es-CL', {
			style: 'currency',
			currency: 'CLP',
			minimumFractionDigits: 0
		}).format(truncado);
	}

	/*function calculateTotal() {
		ventana.precio_total = ventana.cantidad * ventana.precio_unitario;
	}

	$effect(() => {
		ventana.precio_total = ventana.cantidad * ventana.precio_unitario;
	});*/
</script>

<tr class=" border-b">
	<td class="px-1 pl-2 py-1">#{id + 1}</td>

	<!-- Material Selector -->
	<td class="px-1 py-1">
		<p class="p-2 rounded-md w-44 bg-white border truncate overflow-hidden">{ventana.material}</p>
	</td>

	<!-- Tipo Selector -->
	<td class="px-1 py-1">
		<select
			bind:value={ventana.tipo}
			onchange={() => {
				const ganancia = tiposFiltrados.find(
					(tipo) => tipo.descripcion_tipo === ventana.tipo
				)?.ganancia;
				if (ganancia !== null) {
					ventana.ganancia = ganancia;
				}
				tipoOptions.update((current) => {
					const updated = [...current]; // Crear una copia del arreglo actual
					updated[id] = ventana.tipo;
					return updated;
				});
			}}
			class="p-2 rounded-md bg-white border w-44 truncate overflow-hidden whitespace-nowrap">
			<option selected disabled value="">Selecciona un tipo</option>
			{#each tiposFiltrados as option}
				<option class="w-auto">{option.descripcion_tipo}</option>
			{/each}
		</select>
	</td>

	<!-- Cristal Selector -->
	<td class="px-1 py-1">
		<select
			bind:value={ventana.cristal}
			onchange={() => {
				cristalOptions.update((current) => {
					const updated = [...current]; // Crear una copia del arreglo actual
					updated[id] = ventana.cristal;
					return updated;
				});
			}}
			class="p-2 rounded-md bg-white border w-32 truncate overflow-hidden whitespace-nowrap">
			<option selected disabled value="">Selecciona un tipo</option>
			{#each cristalesLista as option}
				<option class="w-auto">{option.desc_cristal}</option>
			{/each}
		</select>
	</td>

	<!-- Color Input -->
	<td class="px-1 py-1">
		<p class="p-2 rounded-md bg-white border w-24 truncate">{ventana.color}</p>
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
	<td class="px-1 pr-2 py-1">
		<input
			type="number"
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
			placeholder="0" />
	</td>
	<td class="px-1 py-1">
		<div class="relative">
			<input
				type="number"
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
				placeholder="0" />
			<!-- Tooltip si hay msgAlto -->
			<!-- Mensaje Amarillo -->
			{#if msgAlto}
				<div
					class="absolute -bottom-13 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs rounded px-2 py-1 w-max z-10 shadow-md">
					{msgAlto}
				</div>
			{/if}
		</div>
	</td>

	<!-- Ganancia -->
	<td class="px-1 py-1">
		<input
			type="number"
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
			class="p-2 border rounded-md w-full"
			placeholder="0" />
	</td>

	<!-- Precio Unitario -->
	<td class="px-1 py-1">
		<p class="p-2 rounded-md w-full bg-white border">
			{formatoChileno(ventana.precio_unitario*(1 + ganancia_global/100))}
		</p>
	</td>

	<!-- Precio Total -->
	<td class="px-1 py-1">
		<p class="p-2 rounded-md w-full bg-white border">
			{formatoChileno(ventana.precio_total*(1 + ganancia_global/100))}
		</p>
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
