<script lang="ts">
	let cotizaciones = [
		{
			tipo: '',
			color: '',
			alto: '',
			ancho: ''
		}
	];

	const tiposDeVentanas = ['Corrediza', 'Batiente', 'Fija', 'Oscilobatiente'];
	const coloresDisponibles = ['Blanco', 'Negro', 'Gris', 'Madera'];

	function agregarVentana() {
		cotizaciones = [...cotizaciones, { tipo: '', color: '', alto: '', ancho: '' }];
	}

	function eliminarVentana(index: any) {
		cotizaciones = cotizaciones.filter((_, i) => i !== index);
	}

	function actualizarCotizacion(index: any, field: any, value: any) {
		cotizaciones[index] = { ...cotizaciones[index], [field]: value };
	}
</script>

<div class="min-h-screen ml-14 bg-gray-100 p-6">
	<h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Crear Cotización de Ventanas</h1>

	<div class="space-y-6">
		{#each cotizaciones as cotizacion, index}
			<div class="bg-white p-4 rounded shadow space-y-4">
				<div class="flex justify-between items-center">
					<h2 class="text-lg font-semibold text-gray-800">Ventana {index + 1}</h2>
					{#if cotizaciones.length > 1}
						<button class="text-red-500 font-bold" on:click={() => eliminarVentana(index)}>
							Eliminar
						</button>
					{/if}
				</div>

				<!-- Seleccionar Tipo de Ventana -->
				<div>
					<label for="tipo" class="block text-sm font-medium text-gray-700">Tipo de Ventana</label>
					<select
						id="tipo"
						class="mt-1 block w-full p-2 border border-gray-300 rounded"
						bind:value={cotizacion.tipo}
						on:change={(e) => actualizarCotizacion(index, 'tipo', e.target?.value)}
					>
						<option value="">Seleccionar tipo</option>
						{#each tiposDeVentanas as tipo}
							<option value={tipo}>{tipo}</option>
						{/each}
					</select>
				</div>

				<!-- Seleccionar Color -->
				<div>
					<label for="color" class="block text-sm font-medium text-gray-700">Color</label>
					<select
						id="color"
						class="mt-1 block w-full p-2 border border-gray-300 rounded"
						bind:value={cotizacion.color}
						on:change={(e) => actualizarCotizacion(index, 'color', e.target?.value)}
					>
						<option value="">Seleccionar color</option>
						{#each coloresDisponibles as color}
							<option value={color}>{color}</option>
						{/each}
					</select>
				</div>

				<!-- Medidas de la Ventana -->
				<div class="flex space-x-4">
					<div class="w-1/2">
						<label for="alto" class="block text-sm font-medium text-gray-700">Alto (cm)</label>
						<input
							type="number"
							id="alto"
							class="mt-1 block w-full p-2 border border-gray-300 rounded"
							bind:value={cotizacion.alto}
							on:input={(e) => actualizarCotizacion(index, 'alto', e.target?.value)}
						/>
					</div>
					<div class="w-1/2">
						<label for="ancho" class="block text-sm font-medium text-gray-700">Ancho (cm)</label>
						<input
							type="number"
							id="ancho"
							class="mt-1 block w-full p-2 border border-gray-300 rounded"
							bind:value={cotizacion.ancho}
							on:input={(e) => actualizarCotizacion(index, 'ancho', e.target?.value)}
						/>
					</div>
				</div>
			</div>
		{/each}

		<!-- Botón para agregar nueva ventana -->
		<div class="text-center">
			<button class="mt-4 bg-teal-500 text-white px-4 py-2 rounded" on:click={agregarVentana}>
				+ Agregar otra ventana
			</button>
		</div>
	</div>
</div>
