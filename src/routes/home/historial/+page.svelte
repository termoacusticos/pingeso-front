<script lang="ts">
	import type { PresupuestoModel, OpcionModel } from '$lib/types';
	import { materialOptions, presupuesto, url } from '$lib/store';
	import { goto } from '$app/navigation';
	import { generatePDF } from '$lib/services/pdf_generator';
	import { get } from 'svelte/store';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();
	const constantData = data; // horrible pero necesito usar data dentro de un fetch

	// Reemplazar después por cte de la db
	let images = data.imagenes; // Parámetros de paginación
	let pageSize = 12; // Número de cotizaciones por página
	let currentPage = $state(1); // Página actual (comienza en 1)

	let searchQuery = $state(''); // Estado para almacenar el término de búsqueda

	let fechaSortDirection = $state('desc');
	let rutSortDirection = $state('desc');
	let valorSortDirection = $state('desc');
	let idSortDirection = $state('desc');

	let cotizaciones: PresupuestoModel[] = $state(data.presupuestos);

	function getNombreMaterial(id_material: number) {
		const material = constantData.materiales.find((m: any) => m.id_material === id_material);
		return material ? material.nombre_material : 'Material no encontrado';
	}

	function calcularTotalOpcion(opcion: OpcionModel) {
		return opcion.Ventanas.reduce((total, ventana) => {
			return total + ventana.precio_total;
		}, 0);
	}

	function formatoChileno(valor: number) {
		const truncado = Math.trunc(valor); // Trunca el número
		return new Intl.NumberFormat('es-CL', {
			style: 'currency',
			currency: 'CLP',
			minimumFractionDigits: 0
		}).format(truncado);
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
		// console.log(inspect(filteredCotizaciones, true, null));

		return filteredCotizaciones.slice((currentPage - 1) * pageSize, currentPage * pageSize);
	});

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
	class="min-h-screen w-full flex flex-col p-8 bg-gray-100 gap-5 2xl:w-[80%] xl:w-full lg:w-[50%] md:w-[70%] mx-auto overflow-scroll">
	<div class="flex flex-row items-center">
		<button
			onclick={() => {
				location.assign('/home');
			}}
			aria-label="home"
			class="hover:underline">Home</button>
		<div class="iconify mdi--keyboard-arrow-right size-5"></div>
		<span class=" text-slate-400">Historial</span>
	</div>

	<!-- Campo de búsqueda -->
	<input
		type="text"
		bind:value={searchQuery}
		placeholder="Buscar nombre de cliente..."
		class="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring focus:ring-indigo-200" />

	<!-- Tabla de cotizaciones -->
	<table class="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
		<thead class="bg-gray-200 text-gray-700">
			<tr>
				<th class="py-3 px-4 text-left">Cliente</th>
				<!--<th class="py-3 px-4 text-left"> Direccion </th>
				<th class="py-3 px-4 text-left cursor-pointer" onclick={() => sortByRUT()}>
					RUT
					<span class="ml-1">{rutSortDirection === 'asc' ? '▲' : '▼'}</span>
				</th>-->
				<th class="py-3 px-4 text-left min-w-48 w-52">Materiales</th>
				<th class="py-3 px-4 text-left cursor-pointer" onclick={() => sortByDate()}>
					Fecha
					<span class="ml-1">{fechaSortDirection === 'asc' ? '▲' : '▼'}</span>
				</th>
				<th class="py-3 px-4 text-left">Valor presupuesto</th>
				<!--<th>Despacho</th>
				<th>Instalación</th>-->
				<th class="py-3 px-6 text-right min-w-28 w-32">Acciones</th>
			</tr>
		</thead>
		<tbody>
			{#each paginatedCotizaciones as cotizacion}
				<tr class="border-b border-gray-200 hover:bg-gray-100">
					<td class="py-3 px-4 truncate">{cotizacion.nombre_cliente}</td>
					<td class="py-3 px-4">
						<div class="w-80 truncate overflow-hidden whitespace-nowrap space-x-3">
							{#each cotizacion.Opciones as opcion, index}
								{getNombreMaterial(opcion.Ventanas[0].id_material)}
								{index < cotizacion.Opciones.length - 1 ? ',' : ''}
							{/each}
						</div>
					</td>
					<!--<td class="py-3 px-4">{cotizacion.Cliente?.direccion}</td>
					<td class="py-3 px-4">{cotizacion.Cliente?.rut_cliente}</td> -->
					<td class="py-3 px-4">{new Date(cotizacion.fecha).toLocaleDateString()}</td>
					<!--<td class="py-3 px-4">{formatoChileno(cotizacion.valor_despacho)}</td>
					<td class="py-3 px-4">{formatoChileno(cotizacion.valor_instalacion)}</td>-->
					<td class="py-3 px-4 text-left">
						<div class=" space-x-3">
							{#each cotizacion.Opciones as opcion, index}
								<b>{index + 1}:</b>
								{formatoChileno(
									calcularTotalOpcion(opcion)
								)}{#if index < cotizacion.Opciones.length - 1},
								{/if}
							{/each}
						</div>
					</td>
					<td class="py-3 px-4">
						<div class="flex gap-2 justify-end">
							<button
								class="flex flex-col overflow-hidden text-left"
								aria-label="Editar"
								onclick={() => {
									presupuesto.set(cotizacion);
									goto(`/home/cotizar`);
								}}>
								<span
									class="size-8 iconify mdi--pencil-box bg-blue-600 hover:bg-blue-500 transition-all"
								></span>
							</button>
							<button
								class="flex flex-col overflow-hidden text-right"
								aria-label="pdf"
								onclick={async () => {
									presupuesto.set(cotizacion);
									const urlLocal = await generatePDF(cotizacion, images, constantData);
									url.set(urlLocal);
									window.open(get(url));
								}}>
								<span class="size-8 iconify mdi--pdf-box bg-red-600 hover:bg-red-500 transition-all"
								></span>
							</button>
						</div>
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
