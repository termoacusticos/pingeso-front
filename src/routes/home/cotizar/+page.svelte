<script lang="ts">
	import { goto } from '$app/navigation';
	import DatosCotizacion from '$lib/components/DatosCotizacion.svelte';
	import OpcionVentanas from '$lib/components/OpcionVentanas.svelte';
	import {
		tipoOptions,
		anchoOptions,
		altoOptions,
		cantidadOptions,
		cristalOptions,
		gananciaOptions,
		precioUnitarioOptions,
		precioTotalOptions,

		presupuesto

	} from '$lib/store';
	import type {
		ClienteUI,
		ConstantData,
		OpcionModel,
		OpcionUI,
		PresupuestoModel,
		VentanaModel,
		VentanaUI
	} from '$lib/types';
	import type { Cliente, Color, Cristal, Material, Tipo } from '@prisma/client';

	const { data }: { data: ConstantData } = $props();

	let successModal = $state(false);
	let errorModal = $state(false);

	let materiales: Material[] = data.materiales;
	let colores: Color[] = data.colores;
	let tipos: Tipo[] = data.tipos;
	let cristales: Cristal[] = data.cristales;

	let materialesNombre: string[] = $state(materiales.map((material) => material.nombre_material));
	let coloresNombre: string[] = $state(colores.map((color) => color.nombre_color));

	let mostrarAgregarOpcion = $state(false);
	let materialModal = $state('');
	let colorModal = $state('');
	let cliente: ClienteUI = $state({
		nombre: '',
		rut_cliente: '',
		direccion: '',
		email: '',
		telefono: ''
	});

	let opciones: OpcionUI[] = $state([
		{
			material: '',
			color: '',
			ventanas: [
				{
					material: '',
					tipo: '',
					cantidad: 1,
					cristal: '',
					color: '',
					alto: undefined,
					ancho: undefined,
					precio_unitario: 0,
					precio_total: 0,
					ganancia: undefined,
					item: ''
				}
			]
		}
	]);

	let mostrar_eliminar_opcion = $derived(opciones.length > 1);

	$inspect('opciones:', opciones);
	$inspect('materialModal:', materialModal);
	$inspect('colorModal:', colorModal);
	$inspect('cliente: ', cliente);

	function cerrarSuccessModal() {
		location.assign('/home/cotizar');
	}

	function cerrarErrorModal() {
		errorModal = !errorModal;
	}

	function cambiarAgregarOpcion() {
		mostrarAgregarOpcion = !mostrarAgregarOpcion;
	}

	function agregarOpcion() {
		let nuevas_ventanas = opciones[0].ventanas.map((ventana) => ({
			...ventana,
			material: materialModal,
			color: colorModal
		}));
		console.log(nuevas_ventanas);

		// Crear una nueva opción
		const nuevaOpcion = {
			material: materialModal,
			color: colorModal,
			ventanas: nuevas_ventanas
		};

		opciones.push(nuevaOpcion);

		// Reiniciar los valores del modal
		materialModal = '';
		colorModal = '';
		mostrarAgregarOpcion = false;
	}

	function eliminarOpcion(index: any) {
		opciones = opciones.filter((_, i) => i !== index);
	}

	// Función para convertir la lista de VentanaUI a VentanaModel
	function convertirVentana(ventana: VentanaUI): VentanaModel {
		// Buscar el id del material, tipo, color y cristal en sus respectivas listas
		const id_material =
			materiales.find((m) => m.nombre_material === ventana.material)?.id_material ?? 0;
		const id_tipo = tipos.find((t) => t.descripcion_tipo === ventana.tipo)?.id_tipo ?? 0;
		const id_color = colores.find((c) => c.nombre_color === ventana.color)?.id_color ?? 0;
		const id_cristal = cristales.find((c) => c.desc_cristal === ventana.cristal)?.id_cristal ?? 0;

		// Devolver el objeto convertido a VentanaModel
		return {
			cantidad: ventana.cantidad,
			id_material,
			id_tipo,
			id_color,
			id_cristal,
			item: ventana.item,
			alto: ventana.alto ?? 0,
			ancho: ventana.ancho ?? 0,
			precio_unitario: ventana.precio_unitario,
			precio_total: ventana.precio_total,
			ganancia: ventana.ganancia ?? 0
		};
	}

	// Función para convertir la lista de VentanaUI a VentanaModel
	function convertirVentanas(ventanas: VentanaUI[]): VentanaModel[] {
		return ventanas.map((ventana) => {
			// Buscar el id del material, tipo, color y cristal en sus respectivas listas
			const id_material =
				materiales.find((m) => m.nombre_material === ventana.material)?.id_material ?? 0;
			const id_tipo = tipos.find((t) => t.descripcion_tipo === ventana.tipo)?.id_tipo ?? 0;
			const id_color = colores.find((c) => c.nombre_color === ventana.color)?.id_color ?? 0;
			const id_cristal = cristales.find((c) => c.desc_cristal === ventana.cristal)?.id_cristal ?? 0;

			// Devolver el objeto convertido a VentanaModel
			return {
				cantidad: ventana.cantidad,
				id_material,
				id_tipo,
				id_color,
				id_cristal,
				item: ventana.item,
				alto: ventana.alto ?? 0,
				ancho: ventana.ancho ?? 0,
				precio_unitario: ventana.precio_unitario,
				precio_total: ventana.precio_total,
				ganancia: ventana.ganancia ?? 0
			};
		});
	}

	function crearOpcionesModel(opciones: OpcionUI[]): { Ventanas: VentanaModel[] }[] {
		return opciones.map((opcion) => ({
			Ventanas: convertirVentanas(opcion.ventanas)
		}));
	}

	function crearCotizacion() {
		try {
			let opcionesModel: OpcionModel[] = crearOpcionesModel(opciones);
			let cotizacion: PresupuestoModel = {
				id_usuario: 0,
				fecha: '',
				Cliente: {
					nombre: cliente.nombre,
					rut_cliente: cliente.rut_cliente,
					direccion: cliente.direccion,
					email: cliente.email,
					telefono: cliente.telefono
				},
				Opciones: opcionesModel
			};
			fetch('/api/presupuesto', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(cotizacion),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
					}
					return response.json();
				})
				.then((data) => {
					presupuesto.set(cotizacion);
					successModal = true;
					console.log('Respuesta del servidor:', data);
				})
				.catch((error) => {
					errorModal = true;
					console.error('Error durante la solicitud:', error);
				});
		} catch (error) {
			errorModal = true;
			console.error('Error al crear la cotización:', error);
		}
	}


	function eliminarVentana(_opcionIndex: number, ventanaIndex: number) {
		opciones = opciones.map((opcion) => {
			return {
				...opcion,
				ventanas: opcion.ventanas.filter((_, i) => i !== ventanaIndex)
			};
		});

		tipoOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		cantidadOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		cristalOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		altoOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		anchoOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		gananciaOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		precioUnitarioOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		precioTotalOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
	}

	async function handleCalcularCosto(ventana: VentanaUI) {
		const response = await fetch('/api/calculadora', {
			method: 'POST',
			body: JSON.stringify(convertirVentana(ventana))
		});
		const data: {
			resultado: {
				costoTotal: number;
				costoUnitario: number;
			};
		} = await response.json();
		console.log(data);

		ventana.precio_unitario = data.resultado.costoUnitario;
		ventana.precio_total = data.resultado.costoTotal;
	}

	$effect(() => {
		for (const opcion of opciones) {
			for (const ventana of opcion.ventanas) {
				if (ventana.alto !== undefined && ventana.ancho !== undefined) {
					handleCalcularCosto(ventana);
				}
			}
		}
	});
</script>

<div class="flex flex-col bg-gray-100 py-6 px-4 gap-5 xl:w-full 2xl:w-[80%] mx-auto">
	<DatosCotizacion bind:cliente />
	<!-- Ventanas -->
	<div class="space-y-6 w-full">
		{#each opciones as opcion, opcionIndex}
			<OpcionVentanas
				{data}
				agregarVentana={() => {
					for (const opc of opciones) {
						opc.ventanas = [
							...opc.ventanas,
							{
								material: opc.material,
								tipo: '',
								cantidad: 1,
								cristal: '',
								color: opc.color,
								alto: undefined,
								ancho: undefined,
								precio_unitario: 0,
								precio_total: 0,
								ganancia: undefined,
								item: ''
							}
						];
					}
					$tipoOptions.push('');
					$cristalOptions.push('');
					$altoOptions.push();
					$anchoOptions.push();
					$cantidadOptions.push(1);
					$gananciaOptions.push();
					$precioUnitarioOptions.push();
					$precioTotalOptions.push();
				}}
				eliminarVentana={(ventanaIndex: number) => eliminarVentana(opcionIndex, ventanaIndex)}
				bind:opcion={opciones[opcionIndex]}
				index={opcionIndex}
				{eliminarOpcion}
				{mostrar_eliminar_opcion} />
		{/each}

		<!-- Botón para agregar nueva ventana -->
		<div class="flex flex-row w-full justify-center gap-10">
			<button
				class="flex flex-row mt-4 bg-teal-600 hover:bg-teal-500 font-bold transition-all text-white px-4 py-2 rounded items-center"
				onclick={cambiarAgregarOpcion}>
				<span class=" iconify mdi--plus size-6"></span> Agregar otra opción
			</button>
			<button
				class="mt-4 bg-amber-500 hover:bg-amber-600 font-bold transition-all text-white px-4 py-2 rounded"
				onclick={crearCotizacion}>
				Crear cotización
			</button>
		</div>
	</div>

	{#if successModal}
		<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white rounded-lg shadow-xl w-96 p-8">
				<!-- Botón de cierre -->
				<div class="flex justify-end">
					<button
						onclick={cerrarSuccessModal}
						class="text-gray-500 hover:text-gray-800 font-bold text-lg iconify mdi--close size-6"
						aria-label="X">
					</button>
				</div>

				<div class="w-full iconify mdi--success-circle bg-teal-500 size-16"></div>
			
				<!-- Contenido del modal -->
				<div class="flex flex-col gap-2 text-center mt-2 items-center">
					<h2 class="text-2xl font-extrabold text-gray-800">¡Éxito!</h2>
					<p class="text-gray-700">Presupuesto creado correctamente</p>

					<!-- Botón para realizar otra acción o cerrar -->
					<button
						onclick={cerrarSuccessModal}
						class="bg-transparent text-gray-700 mt-2 w-fit font-medium py-2 px-4 rounded hover:underline">
						Cerrar
					</button>
					<button
						onclick={() => goto('/home/prototipo')}
						class="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">
						Visualizar cotización
					</button>
				</div>
			</div>
		</div>
	{/if}

	{#if errorModal}
		<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white rounded-lg shadow-xl w-96 p-8">
				<!-- Botón de cierre -->
				<div class="flex justify-end">
					<button
						onclick={cerrarErrorModal}
						class="text-gray-500 hover:text-gray-800 font-bold text-lg iconify mdi--close size-6"
						aria-label="X">
					</button>
				</div>

				<div class="w-full iconify mdi--error bg-red-500 size-16"></div>
			
				<!-- Contenido del modal -->
				<div class="flex flex-col gap-2 text-center mt-2 items-center">
					<h2 class="text-2xl font-extrabold text-gray-800">Error</h2>
					<p class="text-gray-700">Algo sucedió. Intente nuevamente.</p>

					<!-- Botón para realizar otra acción o cerrar -->
					<button
						onclick={cerrarErrorModal}
						class="w-full mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
						Cerrar ventana
					</button>
				</div>
			</div>
		</div>
	{/if}


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
							{#each materialesNombre as option}
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
							{#each coloresNombre as option}
								<option value={option}>{option}</option>
							{/each}
						</select>
					</div>

					<!-- Botón de Crear Opción -->
					<div class="flex justify-center">
						<button
							onclick={agregarOpcion}
							class="bg-teal-600 hover:bg-teal-500 transition-all text-white px-4 py-2 rounded font-bold"
							disabled={materialModal == '' || colorModal == ''}>
							Crear Opción
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
