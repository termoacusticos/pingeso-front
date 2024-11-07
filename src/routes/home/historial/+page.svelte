<script>
    import HistoryElement from '$lib/components/HistoryElement.svelte';

    // Ejemplo de datos de cotización; podrías reemplazar esto con una llamada a la API
    let cotizaciones = [
        { id: 1, materiales: ['Aluminio', 'Vidrio'], alto: 100, ancho: 100, colores: ['Blanco', 'Transparente'], precio: 100, fecha: '2024-01-05' },
        { id: 2, materiales: ['PVC', 'Vidrio'], alto: 200, ancho: 200, colores: ['Negro', 'Transparente'], precio: 200, fecha: '2024-01-12' },
        { id: 3, materiales: ['Madera', 'Vidrio'], alto: 150, ancho: 120, colores: ['Marrón', 'Transparente'], precio: 180, fecha: '2024-01-20' },
        { id: 4, materiales: ['Aluminio', 'Vidrio Templado'], alto: 250, ancho: 150, colores: ['Plata', 'Transparente'], precio: 300, fecha: '2024-01-25' },
        { id: 5, materiales: ['PVC', 'Vidrio Doble'], alto: 120, ancho: 120, colores: ['Blanco', 'Espejado'], precio: 220, fecha: '2024-02-03' },
        { id: 6, materiales: ['Acero', 'Vidrio'], alto: 300, ancho: 200, colores: ['Gris', 'Transparente'], precio: 350, fecha: '2024-02-10' },
        { id: 7, materiales: ['Madera', 'Vidrio Doble'], alto: 180, ancho: 150, colores: ['Caoba', 'Espejado'], precio: 270, fecha: '2024-02-15' },
        { id: 8, materiales: ['PVC', 'Vidrio Laminado'], alto: 150, ancho: 100, colores: ['Blanco', 'Azulado'], precio: 190, fecha: '2024-02-18' },
        { id: 9, materiales: ['Aluminio', 'Vidrio'], alto: 220, ancho: 130, colores: ['Anodizado', 'Transparente'], precio: 250, fecha: '2024-02-23' },
        { id: 10, materiales: ['PVC', 'Vidrio Triple'], alto: 140, ancho: 140, colores: ['Negro', 'Espejado'], precio: 240, fecha: '2024-03-01' },
        { id: 11, materiales: ['Fibra de Vidrio', 'Vidrio'], alto: 160, ancho: 110, colores: ['Verde', 'Transparente'], precio: 200, fecha: '2024-03-05' },
        { id: 12, materiales: ['Aluminio', 'Vidrio Aislante'], alto: 180, ancho: 180, colores: ['Dorado', 'Espejado'], precio: 310, fecha: '2024-03-12' },
        { id: 13, materiales: ['Madera', 'Vidrio Laminado'], alto: 130, ancho: 130, colores: ['Nogal', 'Espejado'], precio: 220, fecha: '2024-03-18' },
        { id: 14, materiales: ['PVC', 'Vidrio Doble'], alto: 240, ancho: 140, colores: ['Blanco', 'Opaco'], precio: 330, fecha: '2024-03-22' },
        { id: 15, materiales: ['Aluminio', 'Vidrio Espejado'], alto: 200, ancho: 150, colores: ['Gris', 'Espejado'], precio: 280, fecha: '2024-03-28' },
        { id: 16, materiales: ['Acero Inoxidable', 'Vidrio Templado'], alto: 300, ancho: 160, colores: ['Plateado', 'Transparente'], precio: 420, fecha: '2024-04-02' },
        { id: 17, materiales: ['PVC', 'Vidrio'], alto: 100, ancho: 100, colores: ['Blanco', 'Espejado'], precio: 110, fecha: '2024-04-05' },
        { id: 18, materiales: ['Aluminio', 'Vidrio Templado'], alto: 250, ancho: 200, colores: ['Negro', 'Transparente'], precio: 390, fecha: '2024-04-10' },
        { id: 19, materiales: ['Madera', 'Vidrio Aislante'], alto: 120, ancho: 120, colores: ['Marrón Oscuro', 'Opaco'], precio: 210, fecha: '2024-04-15' },
        { id: 20, materiales: ['Fibra de Vidrio', 'Vidrio Espejado'], alto: 150, ancho: 150, colores: ['Gris Claro', 'Espejado'], precio: 260, fecha: '2024-04-20' }
    ];
    
    let searchQuery = ""; // Estado para almacenar el término de búsqueda

    // Filtrar las cotizaciones en función del término de búsqueda
    $: filteredCotizaciones = cotizaciones.filter(cotizacion => {
        const materiales = cotizacion.materiales.join(' ').toLowerCase();
        const colores = cotizacion.colores.join(' ').toLowerCase();
        const query = searchQuery.toLowerCase();
        return materiales.includes(query) || colores.includes(query);
    });
</script>

<div class="min-h-screen w-full p-8 bg-gray-100 xl:w-[50%] lg:w-[50%] md:w-[70%] mx-auto overflow-scroll">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Historial de Cotizaciones</h1>

    <!-- Campo de búsqueda -->
    <input
        type="text"
        bind:value={searchQuery}
        placeholder="Buscar por material o color..."
        class="w-full p-3 mb-6 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring focus:ring-indigo-200"
    />

    <!-- Lista de cotizaciones filtradas -->
    <div>
        {#if filteredCotizaciones.length > 0}
            {#each filteredCotizaciones as cotizacion}
                <HistoryElement {cotizacion} />
            {/each}
        {:else}
            <p class="text-center text-gray-600">No se encontraron cotizaciones para el criterio de búsqueda.</p>
        {/if}
    </div>
</div>