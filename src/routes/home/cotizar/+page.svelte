<script lang="ts">
	import Ventana from '$lib/components/Ventana.svelte';

	let cotizaciones = $state([
		{
			tipo: '',
			color: '',
			alto: '',
			ancho: ''
		}
	]);

	let mostrar_eliminar = $derived(cotizaciones.length > 1);

	$inspect(cotizaciones);

	function agregarVentana() {
		cotizaciones = [...cotizaciones, { tipo: '', color: '', alto: '', ancho: '' }];
	}

	function eliminarVentana(index: any) {
		cotizaciones = cotizaciones.filter((_, i) => i !== index);
	}
</script>

<div class="min-h-screen ml-14 bg-gray-100 p-6">
	<h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Crear Cotización de Ventanas</h1>

	<div class="space-y-6">
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
