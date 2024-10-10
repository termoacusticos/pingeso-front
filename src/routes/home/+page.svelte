<script>
    // Datos ficticios sobre las ventanas más cotizadas, colores y otros datos
    const data = {
        windowsQuoted: [
            { type: "Ventana Corrediza", quotes: 120 },
            { type: "Ventana Batiente", quotes: 95 },
            { type: "Ventana Fija", quotes: 80 },
            { type: "Ventana Oscilobatiente", quotes: 65 }
        ],
        colorsUsed: [
            { color: "Blanco", count: 140 },
            { color: "Negro", count: 95 },
            { color: "Gris", count: 75 },
            { color: "Madera", count: 60 }
        ],
        importantStats: {
            totalQuotes: 360,
            avgPrice: "$550,000",
            topMaterial: "Aluminio",
            avgDeliveryTime: "15 días"
        }
    };
</script>

<div class="min-h-screen ml-14 p-8 bg-gray-100">
    <!-- Título del Dashboard -->
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Dashboard de Cotización de Ventanas</h1>

    <!-- Sección de estadísticas generales -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-4 rounded shadow text-center">
            <h2 class="text-lg font-semibold text-gray-700">Total Cotizaciones</h2>
            <p class="text-2xl font-bold text-blue-600">{data.importantStats.totalQuotes}</p>
        </div>
        <div class="bg-white p-4 rounded shadow text-center">
            <h2 class="text-lg font-semibold text-gray-700">Precio Promedio</h2>
            <p class="text-2xl font-bold text-green-600">{data.importantStats.avgPrice}</p>
        </div>
        <div class="bg-white p-4 rounded shadow text-center">
            <h2 class="text-lg font-semibold text-gray-700">Material Más Usado</h2>
            <p class="text-2xl font-bold text-yellow-600">{data.importantStats.topMaterial}</p>
        </div>
        <div class="bg-white p-4 rounded shadow text-center">
            <h2 class="text-lg font-semibold text-gray-700">Tiempo Promedio de Entrega</h2>
            <p class="text-2xl font-bold text-red-600">{data.importantStats.avgDeliveryTime}</p>
        </div>
    </div>

    <!-- Sección de ventanas más cotizadas -->
    <div class="bg-white p-6 rounded shadow mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Ventanas Más Cotizadas</h2>
        <ul>
            {#each data.windowsQuoted as window}
                <li class="flex justify-between py-2 border-b border-gray-200">
                    <span class="text-gray-700">{window.type}</span>
                    <span class="font-bold text-gray-900">{window.quotes} cotizaciones</span>
                </li>
            {/each}
        </ul>
    </div>

    <!-- Sección de colores más usados -->
    <div class="bg-white p-6 rounded shadow mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Colores Más Usados</h2>
        <ul>
            {#each data.colorsUsed as color}
                <li class="flex justify-between py-2 border-b border-gray-200">
                    <span class="text-gray-700">{color.color}</span>
                    <span class="font-bold text-gray-900">{color.count} veces</span>
                </li>
            {/each}
        </ul>
    </div>
</div>
