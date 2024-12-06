<script lang="ts">
	import HistoryElement from '$lib/components/HistoryElement.svelte';

	// Parámetros de paginación
	let pageSize = 7; // Número de cotizaciones por página
	let currentPage = 1; // Página actual (comienza en 1)

	let searchQuery = ''; // Estado para almacenar el término de búsqueda

	let cotizaciones = [
	{
		id: 1,
		nombreCliente: "Juan Pérez",
		rut: "12.345.678-9",
		fechaCreacion: "2024-11-20",
		materiales: ["Madera", "Metal"],
		colores: ["Rojo", "Negro"],
		precio: 100000
	},
	{
		id: 2,
		nombreCliente: "Ana Gómez",
		rut: "19.876.543-2",
		fechaCreacion: "2024-11-18",
		materiales: ["Plástico", "Vidrio"],
		colores: ["Blanco", "Azul"],
		precio: 150000
	},
	{
		id: 3,
		nombreCliente: "Carlos López",
		rut: "21.654.321-0",
		fechaCreacion: "2024-11-15",
		materiales: ["Madera", "Textil"],
		colores: ["Verde", "Amarillo"],
		precio: 85000
	},
	{
		id: 4,
		nombreCliente: "Sofía Fernández",
		rut: "15.432.987-1",
		fechaCreacion: "2024-11-10",
		materiales: ["Metal", "Vidrio"],
		colores: ["Negro", "Blanco"],
		precio: 120000
	},
	{
		id: 5,
		nombreCliente: "Luis Martínez",
		rut: "10.223.344-5",
		fechaCreacion: "2024-10-30",
		materiales: ["Aluminio", "Vidrio"],
		colores: ["Azul", "Gris"],
		precio: 200000
	},
	{
		id: 6,
		nombreCliente: "Patricia Rodríguez",
		rut: "25.687.901-7",
		fechaCreacion: "2024-10-28",
		materiales: ["Plástico", "Madera"],
		colores: ["Rojo", "Blanco"],
		precio: 75000
	},
	{
		id: 7,
		nombreCliente: "Miguel Sánchez",
		rut: "34.109.876-0",
		fechaCreacion: "2024-09-25",
		materiales: ["Textil", "Madera"],
		colores: ["Negro", "Verde"],
		precio: 95000
	},
	{
		id: 8,
		nombreCliente: "Laura García",
		rut: "20.345.678-1",
		fechaCreacion: "2024-09-10",
		materiales: ["Metal", "Plástico"],
		colores: ["Blanco", "Naranja"],
		precio: 130000
	},
	{
		id: 9,
		nombreCliente: "Juan Pérez",
		rut: "12.345.678-9",
		fechaCreacion: "2024-08-20",
		materiales: ["Vidrio", "Madera"],
		colores: ["Negro", "Rojo"],
		precio: 170000
	},
	{
		id: 10,
		nombreCliente: "Elena Castillo",
		rut: "14.209.876-3",
		fechaCreacion: "2024-07-12",
		materiales: ["Metal", "Vidrio"],
		colores: ["Azul", "Blanco"],
		precio: 110000
	},
	{
		id: 11,
		nombreCliente: "Francisco Martínez",
		rut: "32.567.890-6",
		fechaCreacion: "2024-07-05",
		materiales: ["Plástico", "Madera"],
		colores: ["Amarillo", "Negro"],
		precio: 90000
	},
	{
		id: 12,
		nombreCliente: "Sandra López",
		rut: "45.234.567-8",
		fechaCreacion: "2024-06-18",
		materiales: ["Madera", "Textil"],
		colores: ["Rojo", "Azul"],
		precio: 115000
	},
	{
		id: 13,
		nombreCliente: "José Silva",
		rut: "53.345.678-9",
		fechaCreacion: "2024-06-10",
		materiales: ["Vidrio", "Aluminio"],
		colores: ["Verde", "Blanco"],
		precio: 160000
	},
	{
		id: 14,
		nombreCliente: "Mónica Pérez",
		rut: "61.234.567-0",
		fechaCreacion: "2024-05-25",
		materiales: ["Madera", "Vidrio"],
		colores: ["Gris", "Negro"],
		precio: 145000
	},
	{
		id: 15,
		nombreCliente: "Roberto Gómez",
		rut: "78.901.234-5",
		fechaCreacion: "2024-05-12",
		materiales: ["Plástico", "Metal"],
		colores: ["Amarillo", "Naranja"],
		precio: 85000
	},
	{
		id: 16,
		nombreCliente: "Carmen Díaz",
		rut: "87.654.321-6",
		fechaCreacion: "2024-04-30",
		materiales: ["Vidrio", "Plástico"],
		colores: ["Rojo", "Blanco"],
		precio: 105000
	},
	{
		id: 17,
		nombreCliente: "Víctor Herrera",
		rut: "94.321.098-7",
		fechaCreacion: "2024-04-20",
		materiales: ["Aluminio", "Textil"],
		colores: ["Negro", "Verde"],
		precio: 160000
	},
	{
		id: 18,
		nombreCliente: "María Sánchez",
		rut: "53.109.876-2",
		fechaCreacion: "2024-03-15",
		materiales: ["Madera", "Vidrio"],
		colores: ["Azul", "Blanco"],
		precio: 110000
	},
	{
		id: 19,
		nombreCliente: "Carlos Torres",
		rut: "32.765.432-1",
		fechaCreacion: "2024-03-05",
		materiales: ["Madera", "Metal"],
		colores: ["Negro", "Rojo"],
		precio: 120000
	},
	{
		id: 20,
		nombreCliente: "Juliana Moreno",
		rut: "21.908.765-4",
		fechaCreacion: "2024-02-28",
		materiales: ["Plástico", "Textil"],
		colores: ["Verde", "Amarillo"],
		precio: 95000
	}
];


	// Filtrar las cotizaciones en función del término de búsqueda
	$: filteredCotizaciones = cotizaciones.filter((cotizacion) => {
		const materiales = cotizacion.materiales.join(' ').toLowerCase();
		const colores = cotizacion.colores.join(' ').toLowerCase();
		const nombreCliente = cotizacion.nombreCliente.toLowerCase();
		const rut = cotizacion.rut.toLowerCase();
		const query = searchQuery.toLowerCase();

		// Comprobar si el término de búsqueda está en materiales, colores, nombreCliente o rut
		return (
			materiales.includes(query) ||
			colores.includes(query) ||
			nombreCliente.includes(query) ||
			rut.includes(query)
		);
	});

	// Calcular el índice de las cotizaciones para la página actual
	$: paginatedCotizaciones = filteredCotizaciones.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	);

	// Número total de páginas
	$: totalPages = Math.ceil(filteredCotizaciones.length / pageSize);

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
		placeholder="Buscar por material, color, nombre de cliente o RUT..."
		class="w-full p-3 mb-6 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring focus:ring-indigo-200" />

	<!-- Lista de cotizaciones filtradas y paginadas -->
	<div>
		{#if paginatedCotizaciones.length > 0}
			{#each paginatedCotizaciones as cotizacion}
				<HistoryElement {cotizacion} />
			{/each}
		{:else}
			<p class="text-center text-gray-600">
				No se encontraron cotizaciones para el criterio de búsqueda.
			</p>
		{/if}
	</div>

	<!-- Controles de paginación -->
	<div class="flex justify-center mt-6">
		<button
			class="px-4 py-2 bg-teal-600 text-white rounded-lg mr-4 hover:bg-teal-700 transition-all"
			on:click={goToPreviousPage}
			disabled={currentPage === 1}
		>
			Anterior
		</button>
		<span class="px-4 py-2 text-lg">{currentPage} de {totalPages}</span>
		<button
			class="px-4 py-2 bg-teal-600 text-white rounded-lg ml-4 hover:bg-teal-700 transition-all"
			on:click={goToNextPage}
			disabled={currentPage === totalPages}
		>
			Siguiente
		</button>
	</div>
</div>
