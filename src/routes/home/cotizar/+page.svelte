<script lang="ts">
	import OpcionVentanas from '$lib/components/OpcionVentanas.svelte';
	import Ventana2 from '$lib/components/Ventana2.svelte';

	let materiales = [
		{
			nombre: 'PVC',
			calidad: 'Alta',
			descripcion1: 'Sistema Europeo',
			descripcion2: 'Warm Edge',
			seleccionado: false
		},
		{
			nombre: 'Aluminio Xelentia',
			calidad: 'Alta',
			descripcion1: 'Sistema Premium',
			descripcion2: 'Warm Edge',
			seleccionado: false
		},
		{
			nombre: 'Aluminio Estandar',
			calidad: 'Media',
			descripcion1: 'Sistema Tradicional',
			descripcion2: 'Normal',
			seleccionado: false
		}
	];

	let coloresDisponibles = [
		{ nombre: 'Nogal', seleccionado: false },
		{ nombre: 'Titanio', seleccionado: false },
		{ nombre: 'Blanco', seleccionado: false },
		{ nombre: 'Negro', seleccionado: false },
		{ nombre: 'Roble Dorado', seleccionado: false },
		{ nombre: 'Mate', seleccionado: false },
		{ nombre: 'Antracita', seleccionado: false }
	];

	let opciones = $state([
		{
			tipo: '',
			item: '',
			cantidad: '',
			color: '',
			alto: '',
			ancho: '',
			vidrio: '',
			precio: ''
		}
	]);
	let mostrar_eliminar_opcion = $derived(opciones.length > 1);

	$inspect(opciones);

	function agregarOpcion() {
		opciones = [
			...opciones,
			{ tipo: '', item: '', cantidad: '', color: '', alto: '', ancho: '', vidrio: '', precio: '' }
		];
	}

	function eliminarOpcion(index: any) {
		opciones = opciones.filter((_, i) => i !== index);
	}

	function manejarSeleccion(event: Event, color: { nombre: string; seleccionado: boolean }) {
		const seleccionados = coloresDisponibles.filter((c) => c.seleccionado).length;
		// Si ya hay 2 seleccionados y se intenta seleccionar otro, bloquea la acción
		if (seleccionados >= 2 && !color.seleccionado) {
			event.preventDefault();
			alert('Solo puedes seleccionar hasta 2 colores.');
			return;
		}
		// Cambiar el estado de selección
		color.seleccionado = !color.seleccionado;
	}
</script>

<div class="flex flex-row bg-gray-100 p-6 gap-10 w-[90%] overflow-hidden mx-auto">
	<!-- Ventanas -->
	<div class="space-y-6 mt-8 w-fit h-screen overflow-scroll">
		{#each opciones as opcion, index}
			<OpcionVentanas {index} {eliminarOpcion} {mostrar_eliminar_opcion} />
		{/each}

		<!-- Botón para agregar nueva ventana -->
		<div class="text-center">
			<button
				class="mt-4 bg-teal-500 hover:bg-teal-400 font-bold transition-all text-white px-4 py-2 rounded"
				onclick={agregarOpcion}>
				+ Agregar otra opción
			</button>
		</div>
	</div>

	<div class="flex flex-col items-center">
		<h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Crear Cotización de Ventanas</h1>
		<div class="flex flex-col gap-5 w-full items-center">
			<!-- Seleccionar Materiales -->
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
			<!-- Seleccionar Color -->
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
						<td class="px-4 py-2">5%</td>
						<!-- Valor obtenido -->
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
