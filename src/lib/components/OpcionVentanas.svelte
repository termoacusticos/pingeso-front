<script lang="ts">
	import Ventana from './Ventana.svelte';
	import Ventana2 from './Ventana2.svelte';

    interface Props {
        index: number;
        mostrar_eliminar_opcion: boolean;
        eliminarOpcion: (index: number) => void;
    }

    let { index, mostrar_eliminar_opcion, eliminarOpcion }: Props = $props();

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

    let ventanas = $state([
        {
            material: '',
			tipo: '',
			item: '',
			cantidad: 1,
			color: '',
			alto: 0,
			ancho: 0,
			precio_unitario: 0,
			precio_total: 0
        }
    ]);

	let sumaTotal = $derived(ventanas.reduce((acc, ventana) => acc + ventana.precio_total, 0));

    let mostrar_eliminar = $derived(ventanas.length > 1);
    $inspect(ventanas);

	function agregarVentana() {
		ventanas = [...ventanas, {
			material: '',
			tipo: '',
			item: '',
			cantidad: 1,
			color: '',
			alto: 0,
			ancho: 0,
			precio_unitario: 0,
			precio_total: 10
		}];
	}

	function eliminarVentana(index: number) {
		ventanas = ventanas.filter((_, i) => i !== index);
	}
</script>

<div class="space-y-4">
	<h1 class="text-xl font-semibold text-gray-800">Opción {index + 1}</h1>
	
	<!-- Botón para agregar una nueva ventana -->
	<div class="flex flex-row gap-5 items-center">
		<button onclick={agregarVentana} class="bg-blue-600 hover:bg-blue-500 transition-all text-white p-2 rounded font-bold">Agregar Ventana</button>
		{#if mostrar_eliminar_opcion}
			<button class="bg-red-500 hover:bg-red-400 text-white p-2 rounded font-bold" onclick={() => eliminarOpcion(index)}>
				Eliminar Opción
			</button>
		{:else}
		<p class="bg-slate-300 text-slate-400 font-bold p-2 rounded h-fit">
			Eliminar Opción
		</p>
		{/if}
	</div>
	
	<!-- Lista de ventanas -->
	<div class="flex flex-col">
		<table class="flex flex-col border-gray-100 w-full shadow">
			<thead class="w-full">
				<tr class="flex flex-row px-4 bg-slate-300 py-2">
					<th class="mr-8 font-bold">N°</th>
					<th class="mr-16 font-bold">Material</th>
					<th class="mr-36 font-bold">Tipo</th>
					<th class="mr-20 font-bold">Item</th>
					<th class="mr-9 font-bold">Cantidad</th>
					<th class="mr-12 font-bold">Color</th>
					<th class="mr-11 font-bold">Alto</th>
					<th class="mr-8 font-bold">Ancho</th>
					<th class="mr-10 font-bold">Precio Uni.</th>
					<th class=" font-bold">P. Total</th>
				</tr>
			</thead>
			<tbody class="bg-white text-sm">
				{#each ventanas as ventana, index}
					<Ventana2 {ventana} {index} {mostrar_eliminar} {eliminarVentana} />
				{/each}
				<tr class="flex w-full px-20">
					<td class="w-full py-2 text-right">Total: ${sumaTotal}</td>
				</tr>
			</tbody>
		</table>
		
	</div>
	
</div>
