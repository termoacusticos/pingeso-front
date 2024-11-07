<script lang="ts">
	import Ventana from '$lib/components/Ventana.svelte';

	let materiales= [
		{ nombre: "PVC", calidad: "Alta", descripcion1: "Sistema Europeo", descripcion2: "Warm Edge", seleccionado: false },
		{ nombre: "Aluminio Xelentia", calidad: "Alta", descripcion1: "Sistema Premium", descripcion2: "Warm Edge", seleccionado: false },
		{ nombre: "Aluminio Estandar", calidad: "Media", descripcion1: "Sistema Tradicional", descripcion2: "Normal", seleccionado: false }
	];

	let cotizaciones = $state([
		{
			tipo: '',
			cantidad: '',
			color: '',
			alto: '',
			ancho: '',
			vidrio: '',
			precio: '',
		}
	]);
	let mostrar_eliminar = $derived(cotizaciones.length > 1);

	$inspect(cotizaciones);

	function agregarVentana() {
		cotizaciones = [...cotizaciones, { tipo: '', cantidad: '' , color: '', alto: '', ancho: '',vidrio: '', precio: '' }];
	}

	function eliminarVentana(index: any) {
		cotizaciones = cotizaciones.filter((_, i) => i !== index);
	}
</script>

<div class="min-h-screen ml-14 bg-gray-100 p-6">
	<h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Crear Cotización de Ventanas</h1>
	<div class="overflow-auto">
		<table class="min-w-full bg-white border border-gray-300">
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
	</div>

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
