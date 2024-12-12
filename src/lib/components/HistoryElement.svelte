<script lang="ts">
	import type { CotizacionUI } from "$lib/types";

	interface Props {
		cotizacion: CotizacionUI;
	}

	let { cotizacion }: Props = $props();
</script>

<div class="grid grid-flow-row grid-cols-6 h-20 bg-white p-4 my-2 rounded-lg shadow-md text-left align-middle items-center">
	<div class="flex flex-col">
		<h2 class="flex text-lg font-semibold items-center w-fit">#{cotizacion.id}</h2>
	</div>
	<div class="flex flex-col overflow-hidden">
		<p>Cliente</p>
		<p class="text-gray-700">{cotizacion.nombreCliente}</p>
	</div>
	<div class="flex flex-col overflow-hidden">
		<p>RUT</p>
		<p class="text-gray-700">{cotizacion.rut}</p>
	</div>
	<div class="flex flex-col overflow-hidden">
		<p>Fecha</p>
		<p class="text-gray-700">{cotizacion.fechaCreacion}</p>
	</div>
	<div class="flex flex-col overflow-hidden text-right">
		<p>Valor total</p>
		<p class="text-green-600 font-bold">${cotizacion.valor_total}</p>
	</div>
	<button class="w-full flex flex-col overflow-hidden text-right items-end" aria-label="pdf">
		<span class="size-8 iconify mdi--pdf-box bg-red-600 hover:bg-red-500 transition-all"></span>
	</button>
</div>
