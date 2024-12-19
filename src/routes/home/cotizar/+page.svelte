<script lang="ts">
	import DatosCotizacion from '$lib/components/DatosCotizacion.svelte';
	import OpcionVentanas from '$lib/components/OpcionVentanas.svelte';
	import {
		itemOptions,
		tipoOptions,
		anchoOptions,
		altoOptions,
		cantidadOptions,
		cristalOptions
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

	const { data }: {data: ConstantData} = $props();

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
                    item: '',
                    cantidad: 1,
                    cristal: '',
                    color: '',
                    alto: 0,
                    ancho: 0,
                    precio_unitario: 20,
                    precio_total: 0
                }
            ]
        }
    ]);

	let mostrar_eliminar_opcion = $derived(opciones.length > 1);

	$inspect('opciones:', opciones);
	$inspect('materialModal:', materialModal);
	$inspect('colorModal:', colorModal);
	$inspect('cliente: ', cliente);

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
				item: ventana.item,
				id_color,
				id_cristal,
				alto: ventana.alto,
				ancho: ventana.ancho,
				precio_unitario: ventana.precio_unitario,
				precio_total: ventana.precio_total
			};
		});
	}

	function crearOpcionesModel(opciones: OpcionUI[]): { Ventanas: VentanaModel[] }[] {
		return opciones.map((opcion) => ({
			Ventanas: convertirVentanas(opcion.ventanas)
		}));
	}

	function crearCotizacion() {
		let opcionesModel: OpcionModel[] = crearOpcionesModel(opciones);
		let clienteModel: Cliente = cliente;
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
		console.log(cotizacion);
		fetch('/api/presupuesto', {
			method: 'POST',
			body: JSON.stringify(cotizacion)
		}).then((response) => {
			console.log(response);
			return response.json();
		});
	}
	function eliminarVentana(_opcionIndex: number, ventanaIndex: number) {
		opciones = opciones.map((opcion) => {
			return {
				...opcion,
				ventanas: opcion.ventanas.filter((_, i) => i !== ventanaIndex)
			};
		});

		itemOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		tipoOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		cantidadOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		cristalOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		altoOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		anchoOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
	}
	
</script>

<div class="flex flex-col bg-gray-100 py-6 px-4 gap-5 xl:w-full 2xl:w-[70%] mx-auto">
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
								item: '',
								cantidad: 1,
								cristal: '',
								color: opc.color,
								alto: 0,
								ancho: 0,
								precio_unitario: 20,
								precio_total: 0
							}
						];
					}
					$tipoOptions.push('');
					$itemOptions.push('');
					$cristalOptions.push('');
					$altoOptions.push(0);
					$anchoOptions.push(0);
					$cantidadOptions.push(1);
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
				class="mt-4 bg-teal-600 hover:bg-teal-500 font-bold transition-all text-white px-4 py-2 rounded"
				onclick={cambiarAgregarOpcion}>
				+ Agregar otra opción
			</button>
			<button
				class="mt-4 bg-blue-600 hover:bg-blue-700 font-bold transition-all text-white px-4 py-2 rounded"
				onclick={crearCotizacion}>
				Crear Cotización
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
