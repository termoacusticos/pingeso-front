<script lang="ts">
	interface Props {
		cotizacion: Cotizacion;
	}

	let { cotizacion }: Props = $props();
</script>

<div class="grid grid-flow-row grid-cols-6 h-20 bg-white p-4 my-2 rounded-lg shadow-md text-left">
	<div class="flex flex-col">
		<h2 class="flex text-lg font-semibold items-center w-fit">#{cotizacion.id}</h2>
	</div>
	<div class="flex flex-col overflow-hidden">
		<p>Materiales</p>
		<p class="text-gray-700">{cotizacion.materiales.join(', ')}</p>
	</div>
	<div class="flex flex-col overflow-hidden">
		<p>Dimensiones</p>
		<p class="text-gray-700 overflow-hidden">{cotizacion.alto} x {cotizacion.ancho} cm</p>
	</div>
	<div class="flex flex-col overflow-hidden">
		<p>Colores</p>
		<p class="text-gray-700">{cotizacion.colores.join(', ')}</p>
	</div>
	<div class="flex flex-col overflow-hidden">
		<p>Fecha</p>
		<p class="text-gray-700">{cotizacion.fecha}</p>
	</div>
	<div class="flex flex-col overflow-hidden text-right">
		<p>Valor total</p>
		<p class="text-green-600 font-bold">${cotizacion.precio}</p>
	</div>
</div>
