<script lang="ts">
	import Ventana from '$lib/components/Ventana.svelte';

	let materiales = [
		{
			nombre: 'PVC',
			calidad: 'Alta',
			descripcion1: 'Sistema Europeo',
			descripcion2: 'Warm Edge',
			seleccionado: false
		},
		{
			nombre: 'Aluminio Xelentia',
			calidad: 'Alta',
			descripcion1: 'Sistema Premium',
			descripcion2: 'Warm Edge',
			seleccionado: false
		},
		{
			nombre: 'Aluminio Estandar',
			calidad: 'Media',
			descripcion1: 'Sistema Tradicional',
			descripcion2: 'Normal',
			seleccionado: false
		}
	];

	let coloresDisponibles = [
		{ nombre: 'Nogal', seleccionado: false },
		{ nombre: 'Titanio', seleccionado: false },
		{ nombre: 'Blanco', seleccionado: false },
		{ nombre: 'Negro', seleccionado: false },
		{ nombre: 'Roble Dorado', seleccionado: false },
		{ nombre: 'Mate', seleccionado: false },
		{ nombre: 'Antracita', seleccionado: false }
	];

	let cotizaciones = $state([
		{
			tipo: '',
			item:'',
			cantidad: '',
			color: '',
			alto: '',
			ancho: '',
			vidrio: '',
			precio: ''
		}
	]);
	let mostrar_eliminar = $derived(cotizaciones.length > 1);

	$inspect(cotizaciones);

	function agregarVentana() {
		cotizaciones = [
			...cotizaciones,
			{ tipo: '', item:'', cantidad: '', color: '', alto: '', ancho: '', vidrio: '', precio: '' }
		];
	}

	function eliminarVentana(index: any) {
		cotizaciones = cotizaciones.filter((_, i) => i !== index);
	}

	function manejarSeleccion(event: Event, color: { nombre: string; seleccionado: boolean }) {
		const seleccionados = coloresDisponibles.filter(c => c.seleccionado).length;
		// Si ya hay 2 seleccionados y se intenta seleccionar otro, bloquea la acción
		if (seleccionados >= 2 && !color.seleccionado) {
			event.preventDefault();
			alert("Solo puedes seleccionar hasta 2 colores.");
			return;
		}
		// Cambiar el estado de selección
		color.seleccionado = !color.seleccionado;
	}
</script>

<div class="min-h-screen bg-gray-100 p-6 max-w-screen-lg mx-auto">
	<h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Crear Cotización de Ventanas</h1>
	<div class="flex justify-center space-x-6">
		<!-- Seleccionar Materiales -->
		<table class="min-w-max bg-white border border-gray-300">
			<thead>
				<tr>
					<th class="px-4 py-2 bg-gray-200 text-left font-bold">Material (Hasta 3)</th>
					<th class="px-4 py-2 bg-gray-200 text-left font-bold">Calidad</th>
					<th class="px-4 py-2 bg-gray-200 text-left font-bold">Descripción 1</th>
					<th class="px-4 py-2 bg-gray-200 text-left font-bold">Descripción 2</th>
				</tr>
			</thead>
			<tbody>
				{#each materiales as material}
					<tr class="border-t">
						<td class="px-4 py-2">
							<label class="flex items-center space-x-2">
								<input type="checkbox" bind:checked={material.seleccionado} />
								<span>{material.nombre}</span>
							</label>
						</td>
						<td class="px-4 py-2">{material.calidad}</td>
						<td class="px-4 py-2">{material.descripcion1}</td>
						<td class="px-4 py-2">{material.descripcion2}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<!-- Seleccionar Color -->
		<table class="min-w-max bg-white border border-gray-300">
			<thead>
				<tr>
					<th class="px-4 py-2 bg-gray-200 text-left font-bold">Color (Hasta 2 opciones)</th>
				</tr>
			</thead>
			<tbody>
				{#each coloresDisponibles as color}
					<tr class="border-t">
						<td class="px-4 py-2">
							<label class="flex items-center space-x-2">
								<input type="checkbox" 
									checked={color.seleccionado} 
									onclick={(event) => manejarSeleccion(event, color)} />
								<span>{color.nombre}</span>
							</label>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="flex justify-center mt-6">
		<table class="min-w-max bg-white border border-gray-300">
			<tbody>
				<tr>
					<td class="px-6 py-2 bg-gray-200 font-bold">DESPERDICIO</td>
					<td class="px-4 py-2">
						<input type="radio" id="desperdicio_si" name="desperdicio" value="SI"> SI
						<input type="radio" id="desperdicio_no" name="desperdicio" value="NO"> NO
					</td>
				</tr>
				<tr>
					<td class="px-4 py-2 bg-gray-200 font-bold">GANANCIA TOTAL</td>
					<td class="px-4 py-2">5%</td> <!-- Valor obtenido -->
				</tr>
			</tbody>
		</table>
	</div>


	<!-- Ventanas -->
	<div class="space-y-6 mt-8">
		{#each cotizaciones as ventana, index}
			<Ventana {index} {eliminarVentana} bind:ventana={cotizaciones[index]} {mostrar_eliminar} />
		{/each}

		<!-- Botón para agregar nueva ventana -->
		<div class="text-center">
			<button class="mt-4 bg-teal-500 text-white px-4 py-2 rounded" onclick={agregarVentana}>
				+ Agregar otra ventana
			</button>
		</div>
	</div>
</div>
