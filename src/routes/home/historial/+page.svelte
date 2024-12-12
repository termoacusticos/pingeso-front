<script lang="ts">
	import { onMount } from 'svelte';
	import HistoryElement from '$lib/components/HistoryElement.svelte';
	import type { PresupuestoModel } from '$lib/types';

	interface Props {
		data: any;
	}

	let {
		data
	}: Props = $props();

	// Parámetros de paginación
	let pageSize = 15; // Número de cotizaciones por página
	let currentPage = $state(1); // Página actual (comienza en 1)

	let searchQuery = $state(''); // Estado para almacenar el término de búsqueda

	let fechaSortDirection = $state('desc');
	let rutSortDirection = $state('desc');
	let valorSortDirection = $state('desc');
	let idSortDirection = $state('desc');

	let cotizaciones: PresupuestoModel[] = [];

	function sortByDate() {
		// Alternar la dirección de orden
		fechaSortDirection = fechaSortDirection === 'asc' ? 'desc' : 'asc';

		// Ordenar las cotizaciones por la fecha
		cotizaciones = cotizaciones.sort((a: any, b: any) => {
			const dateA: any = new Date(a.fechaCreacion);
			const dateB: any = new Date(b.fechaCreacion);

			return fechaSortDirection === 'asc' ? dateA - dateB : dateB - dateA;
		});
	}

	function sortByRUT() {
		// Alternar la dirección de orden
		rutSortDirection = rutSortDirection === 'asc' ? 'desc' : 'asc';

		// Ordenar las cotizaciones por el RUT
		cotizaciones = cotizaciones.sort((a: any, b: any) => {
			const rutA = a.rut.replace(/[^\d]/g, ''); // Eliminar caracteres no numéricos del RUT
			const rutB = b.rut.replace(/[^\d]/g, ''); // Eliminar caracteres no numéricos del RUT

			return rutSortDirection === 'asc' ? rutA.localeCompare(rutB) : rutB.localeCompare(rutA);
		});
	}

	function sortByPrecio() {
		// Alternar la dirección de orden
		valorSortDirection = valorSortDirection === 'asc' ? 'desc' : 'asc';

		// Ordenar las cotizaciones por precio
		cotizaciones = cotizaciones.sort((a: any, b: any) => {
			return valorSortDirection === 'asc' ? a.precio - b.precio : b.precio - a.precio;
		});
	}

	function sortById() {
		// Alternar la dirección de orden
		idSortDirection = idSortDirection === 'asc' ? 'desc' : 'asc';

		// Ordenar las cotizaciones por precio
		cotizaciones = cotizaciones.sort((a: any, b: any) => {
			return idSortDirection === 'asc' ? a.id - b.id : b.id - a.id;
		});
	}

	// Filtrar las cotizaciones en función del término de búsqueda
	let filteredCotizaciones = $derived(cotizaciones.filter((cotizacion) => {
		const nombreCliente = cotizacion.cliente?.nombre.toLowerCase();
		const rut = cotizacion.cliente?.rut_cliente.toLowerCase();
		const query = searchQuery.toLowerCase();

		// Comprobar si el término de búsqueda está en materiales, colores, nombreCliente o rut
		return (
			nombreCliente?.includes(query) ||
			rut?.includes(query)
		);
	}));

	// Calcular el índice de las cotizaciones para la página actual
	let paginatedCotizaciones = $derived(filteredCotizaciones.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	));

	// Número total de páginas
	let totalPages = $derived(Math.ceil(filteredCotizaciones.length / pageSize));

	// Función para cambiar la página
	function goToPage(page: any) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
		}
	}

	// Funciones para navegar a la siguiente y anterior página
	function goToNextPage() {
		if (currentPage < totalPages) {
			currentPage += 1;
		}
	}

	function goToPreviousPage() {
		if (currentPage > 1) {
			currentPage -= 1;
		}
	}
</script>

<div class="min-h-screen w-full p-8 bg-gray-100 xl:w-[50%] lg:w-[50%] md:w-[70%] mx-auto overflow-scroll">
	<h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Historial de Cotizaciones</h1>
  
	<!-- Campo de búsqueda -->
	<input
	  type="text"
	  bind:value={searchQuery}
	  placeholder="Buscar nombre de cliente o RUT..."
	  class="w-full p-3 mb-6 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring focus:ring-indigo-200"
	/>
  
	<!-- Tabla de cotizaciones -->
	<table class="w-full table-fixed bg-white shadow-md rounded-lg overflow-hidden">
	  <thead class="bg-gray-200 text-gray-700">
		<tr>
			<th class="py-3 px-4 text-left cursor-pointer" onclick={() => sortById()}>
				ID
				<span class="ml-1">{idSortDirection === 'asc' ? '▲' : '▼'}</span>
			  </th>
		  <th class="py-3 px-4 text-left">Cliente</th>
		  <th class="py-3 px-4 text-left cursor-pointer" onclick={() => sortByRUT()}>
			RUT
			<span class="ml-1">{rutSortDirection === 'asc' ? '▲' : '▼'}</span>
		  </th>
		  <th class="py-3 px-4 text-left cursor-pointer" onclick={() => sortByDate()}>
			Fecha
			<span class="ml-1">{fechaSortDirection === 'asc' ? '▲' : '▼'}</span>
		  </th>
		  <th class="py-3 px-4 text-left">Acciones</th>
		</tr>
	  </thead>
	  <tbody>
		{#if paginatedCotizaciones.length > 0}
		  {#each paginatedCotizaciones as cotizacion}
			<tr class="border-b border-gray-200 hover:bg-gray-100">
			  <td class="py-3 px-4">{cotizacion.id_presupuesto}</td>
			  <td class="py-3 px-4 truncate">{cotizacion.cliente?.nombre}</td>
			  <td class="py-3 px-4">{cotizacion.cliente?.rut_cliente}</td>
			  <td class="py-3 px-4">{cotizacion.fecha}</td>
			  <td class="py-3 px-4">
				<button class="w-full flex flex-col overflow-hidden text-right" aria-label="pdf">
					<span class="size-8 iconify mdi--pdf-box bg-red-600 hover:bg-red-500 transition-all"></span>
				</button>
			  </td>
			</tr>
		  {/each}
		{:else}
		  <tr>
			<td colspan="5" class="py-4 text-center text-gray-600">
			  No se encontraron cotizaciones para el criterio de búsqueda.
			</td>
		  </tr>
		{/if}
	  </tbody>
	</table>
  
	<!-- Controles de paginación -->
	<div class="flex justify-center mt-6">
	  <button
		class="px-4 py-2 bg-teal-600 text-white rounded-lg mr-4 hover:bg-teal-700 transition-all"
		onclick={goToPreviousPage}
		disabled={currentPage === 1}
	  >
		Anterior
	  </button>
	  <span class="px-4 py-2 text-lg">{currentPage} de {totalPages}</span>
	  <button
		class="px-4 py-2 bg-teal-600 text-white rounded-lg ml-4 hover:bg-teal-700 transition-all"
		onclick={goToNextPage}
		disabled={currentPage === totalPages}
	  >
		Siguiente
	  </button>
	</div>
  </div>