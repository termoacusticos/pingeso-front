<script lang="ts">
	import OpcionVentanas from '$lib/components/OpcionVentanas.svelte';

	const materialOptions = ["Madera", "Aluminio", "PVC"];
	const tipoOptions = ["Corredera", "Abatible", "Oscilobatiente"];
	const itemOptions = ["Ventana Simple", "Ventana Doble", "Ventana Termopanel"];
	const coloresOptions = ["Blanco", "Rojo", "Violeta"]

	let mostrarAgregarOpcion = $state(false);
	let materialModal = $state('');
	let colorModal = $state('');

	function cambiarAgregarOpcion() {
		mostrarAgregarOpcion = !mostrarAgregarOpcion;
	}

	let opciones: Opcion[] = $state([
		{
			material: '',
			color: '',
			ventanas: [],
		}
	]);

	let mostrar_eliminar_opcion = $derived(opciones.length > 1);

	$inspect('opciones:', opciones);
	$inspect('materialModal:', materialModal);
	$inspect('colorModal:', colorModal);

	function agregarOpcion() {
		let nuevas_ventanas = opciones[0].ventanas.map((ventana) => ({
			...ventana,
			material: materialModal,
			color: colorModal
		}));

		// Crear una nueva opción
		const nuevaOpcion = {
			material: materialModal,
			color: colorModal,
			ventanas: nuevas_ventanas
		};

		opciones = [
			...opciones, nuevaOpcion
		];

		// Reiniciar los valores del modal
		materialModal = '';
		colorModal = '';
		mostrarAgregarOpcion = false;
	}

	function eliminarOpcion(index: any) {
		opciones = opciones.filter((_, i) => i !== index);
	}
</script>


<div class="flex flex-row bg-gray-100 p-6 gap-10 w-[80%] overflow-hidden mx-auto">
	<!-- Ventanas -->
	<div class="space-y-6 mt-8 w-full h-screen overflow-scroll">
		{#each opciones as opcion, index}
			<OpcionVentanas bind:opcion={opciones[index]} {index} {eliminarOpcion} {mostrar_eliminar_opcion} />
		{/each}

		<!-- Botón para agregar nueva ventana -->
		<div class="text-center">
			<button class="mt-4 bg-teal-500 hover:bg-teal-400 font-bold transition-all text-white px-4 py-2 rounded" onclick={cambiarAgregarOpcion}>
				+ Agregar otra opción
			</button>
		</div>
	</div>

	{#if mostrarAgregarOpcion}
		<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white rounded-lg shadow-xl w-96 p-6">
				<!-- Botón de cierre -->
				<div class="flex justify-end">
					<button
						onclick={cambiarAgregarOpcion}
						class="text-gray-500 hover:text-gray-800 font-bold text-lg">
						X
					</button>
				</div>
		
				<!-- Contenido del modal -->
				<div class="space-y-4">
					<h2 class="text-xl font-semibold text-gray-800">Nueva Opción</h2>
		
					<!-- Select para material -->
					<div>
						<label for="material" class="block text-gray-600 font-medium mb-1">Material</label>
						<select
							id="material"
							bind:value={materialModal}
							class="w-full border rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500">
							<option value="" disabled>Selecciona un material</option>
							{#each materialOptions as option}
								<option value={option}>{option}</option>
							{/each}
						</select>
					</div>
		
					<!-- Select para color -->
					<div>
						<label for="color" class="block text-gray-600 font-medium mb-1">Color</label>
						<select
							id="color"
							bind:value={colorModal}
							class="w-full border rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500">
							<option value="" disabled>Selecciona un color</option>
							{#each coloresOptions as option}
								<option value={option}>{option}</option>
							{/each}
						</select>
					</div>
		
					<!-- Botón de Crear Opción -->
					<div class="flex justify-center">
						<button
							onclick={agregarOpcion}
							class="bg-teal-600 hover:bg-teal-500 transition-all text-white px-4 py-2 rounded font-bold"
							disabled={materialModal=='' || colorModal==''}>
							Crear Opción
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!--
	<div class="flex flex-col items-center">
		<h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Crear Cotización de Ventanas</h1>
		<div class="flex flex-col gap-5 w-full items-center">
			// Seleccionar Materiales
			<div class="w-full max-w-4xl bg-white border border-gray-300">
				<div class="flex px-4 py-2 bg-gray-200 font-bold text-left">
					<div class="w-1/4 text-center">Material (Hasta 3)</div>
					<div class="w-1/4 text-center">Calidad</div>
					<div class="w-1/4 text-center">Descripción 1</div>
					<div class="w-1/4 text-center">Descripción 2</div>
				</div>
				<div>
					{#each materiales as material}
						<div class="flex border-t">
							<div class="w-1/4 px-4 py-2">
								<label class="flex items-center space-x-2">
									<input
										type="checkbox"
										bind:checked={material.seleccionado}
										oninput={() => {
											opciones.push({
												tipo: material.nombre,
												item: '',
												cantidad: '',
												color: '',
												alto: '',
												ancho: '',
												vidrio: '',
												precio: ''
											});
										}} />
									<span>{material.nombre}</span>
								</label>
							</div>
							<div class="w-1/4 px-4 py-2">{material.calidad}</div>
							<div class="w-1/4 px-4 py-2">{material.descripcion1}</div>
							<div class="w-1/4 px-4 py-2">{material.descripcion2}</div>
						</div>
					{/each}
				</div>
			</div>			
			<!-- Seleccionar Color
			<div class="w-full max-w-4xl bg-white border border-gray-300 flex flex-col items-center">
				<p class="w-full py-2 bg-gray-200 font-bold text-center">Color (Hasta 2 opciones)</p>
				<div class="w-full">
					{#each coloresDisponibles as color}
						<div class="border-t px-4 py-2 flex justify-center">
							<label class="flex flex-row w-full space-x-2">
								<input
									type="checkbox"
									checked={color.seleccionado}
									onclick={(event) => manejarSeleccion(event, color)} />
								<span>{color.nombre}</span>
							</label>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="flex justify-center mt-6 rounded-lg bg-white shadow-lg">
			<table class="min-w-max border-gray-100">
				<tbody>
					<tr>
						<td class="px-6 py-2 bg-gray-200 font-bold">DESPERDICIO</td>
						<td class="px-4 py-2">
							<input type="radio" id="desperdicio_si" name="desperdicio" value="SI" /> SI
							<input type="radio" id="desperdicio_no" name="desperdicio" value="NO" /> NO
						</td>
					</tr>
					<tr>
						<td class="px-4 py-2 bg-gray-200 font-bold">GANANCIA TOTAL</td>
						<td class="px-4 py-2">5%</td> <!-- Valor obtenido
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	-->
</div>
