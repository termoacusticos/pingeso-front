<script lang="ts">
	import type { PresupuestoModel } from '$lib/types';
	import { presupuesto, url } from '$lib/store';
	import { goto } from '$app/navigation';
	import { generatePDF } from '$lib/services/pdf_generator';
	import { get } from 'svelte/store';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();
	const constantData = data; // horrible pero necesito usar data dentro de un fetch

	// Reemplazar después por cte de la db
	let header = {
		logos: ['/ejemplo.png'],
		h2: ['/favicon.png', '/barras.png']
	};

	// Parámetros de paginación
	let pageSize = 15; // Número de cotizaciones por página
	let currentPage = $state(1); // Página actual (comienza en 1)

	let searchQuery = $state(''); // Estado para almacenar el término de búsqueda

	let fechaSortDirection = $state('desc');
	let rutSortDirection = $state('desc');
	let valorSortDirection = $state('desc');
	let idSortDirection = $state('desc');

	let cotizaciones: PresupuestoModel[] = $state(data.presupuestos);

	function formatoChileno(valor: number) {
		return new Intl.NumberFormat("es-CL", {
		style: "currency",
		currency: "CLP",
		minimumFractionDigits: 0
		}).format(valor);
	}

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
	let filteredCotizaciones = $derived.by(() => {
		return cotizaciones.filter((cotizacion) => {
			console.log('filter');

			const nombreCliente = cotizacion.Cliente?.nombre.toLowerCase();
			const rut = cotizacion.Cliente?.rut_cliente.toLowerCase();
			const query = searchQuery.toLowerCase();

			// Comprobar si el término de búsqueda está en materiales, colores, nombreCliente o rut
			return nombreCliente?.includes(query) || rut?.includes(query);
		});
	});

	// Calcular el índice de las cotizaciones para la página actual
	let paginatedCotizaciones = $derived.by(() => {
		console.log((currentPage - 1) * pageSize, currentPage * pageSize);
		console.log(filteredCotizaciones[0]);

		return filteredCotizaciones.slice((currentPage - 1) * pageSize, currentPage * pageSize);
	});
	$inspect(cotizaciones);

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

<div
	class="min-h-screen w-full flex flex-col p-8 bg-gray-100 gap-5 xl:w-[60%] lg:w-[50%] md:w-[70%] mx-auto overflow-scroll">
	<div class="flex flex-row items-center">
		<button onclick={() => {location.assign('/home');}} aria-label="home" class="hover:underline">Home</button>
		<div class="iconify mdi--keyboard-arrow-right size-5"></div>
		<span class=" text-slate-400">Historial</span>
	</div>

	<!-- Campo de búsqueda -->
	<input
		type="text"
		bind:value={searchQuery}
		placeholder="Buscar nombre de cliente o RUT..."
		class="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring focus:ring-indigo-200" />

	<!-- Tabla de cotizaciones -->
	<table class="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
		<thead class="bg-gray-200 text-gray-700">
			<tr>
				<th class="py-3 px-4 text-left">Cliente</th>
				<th class="py-3 px-4 text-left"> Dirección </th>
				<th class="py-3 px-4 text-left cursor-pointer" onclick={() => sortByRUT()}>
					RUT
					<span class="ml-1">{rutSortDirection === 'asc' ? '▲' : '▼'}</span>
				</th>
				<th class="py-3 px-4 text-left cursor-pointer" onclick={() => sortByDate()}>
					Fecha
					<span class="ml-1">{fechaSortDirection === 'asc' ? '▲' : '▼'}</span>
				</th>
				<th>Despacho</th>
				<th>Instalación</th>
				<th class="py-3 px-4 text-left">Acciones</th>
			</tr>
		</thead>
		<tbody>
			{#each paginatedCotizaciones as cotizacion}
				<tr class="border-b border-gray-200 hover:bg-gray-100">
					<td class="py-3 px-4 truncate">{cotizacion.Cliente?.nombre}</td>
					<td class="py-3 px-4">{cotizacion.Cliente?.direccion}</td>
					<td class="py-3 px-4">{cotizacion.Cliente?.rut_cliente}</td>
					<td class="py-3 px-4">{new Date(cotizacion.fecha).toLocaleDateString()}</td>
					<td class="py-3 px-4">{formatoChileno(cotizacion.valor_despacho)}</td>
					<td class="py-3 px-4">{formatoChileno(cotizacion.valor_instalacion)}</td>
					<td class="py-3 px-4">
						<button
							class="w-full flex flex-col overflow-hidden text-right"
							aria-label="pdf"
							onclick={async () => {
								presupuesto.set(cotizacion);
								const urlLocal = await generatePDF(cotizacion, header, constantData);
								url.set(urlLocal);
								window.open(get(url));
							}}>
							<span class="size-8 iconify mdi--pdf-box bg-red-600 hover:bg-red-500 transition-all"
							></span>
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<!-- Controles de paginación -->
	<div class="flex justify-center mt-6">
		<button
			class="px-4 py-2 bg-teal-600 text-white rounded-lg mr-4 hover:bg-teal-700 transition-all"
			onclick={goToPreviousPage}
			disabled={currentPage === 1}>
			Anterior
		</button>
		<span class="px-4 py-2 text-lg">{currentPage} de {totalPages}</span>
		<button
			class="px-4 py-2 bg-teal-600 text-white rounded-lg ml-4 hover:bg-teal-700 transition-all"
			onclick={goToNextPage}
			disabled={currentPage === totalPages}>
			Siguiente
		</button>
	</div>
</div>
