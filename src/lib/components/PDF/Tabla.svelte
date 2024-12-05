<script lang="ts">
	const { opcion, index }: { opcion: OpcionModel; index: number } = $props();

	const border = 'border border-slate-500 ';
</script>

<div class="grid grid-cols-3 font-bold justify-start gap-2">
	<h2>OPCIÓN {index}</h2>
	<p class="flex justify-between">CALIDAD: ALTA <span class="iconify size-6 text-green-500 mdi--check-bold"></span></p>
	<p class="flex justify-between">MEDIA <span class="iconify size-6 mdi--checkbox-blank-outline"></span></p>
	<p>TERMOPANEL</p>
	<p class="flex justify-between">WARM EDGE <span class="iconify size-6 text-green-500 mdi--check-bold"></span></p>
	<p class="flex justify-between">TRADICIONAL <span class="iconify size-6 mdi--checkbox-blank-outline"></span></p>
</div>
<table class="table-auto w-full text-xs">
	<thead>
		<tr class="bg-slate-300">
			<th class={border + 'text-left'}>MATERIAL</th>
			<th class={border + 'text-left'}>TIPO</th>
			<th class={border + 'text-left'}>DESCRIPCIÓN</th>
			<th class={border + 'text-left'}>COLOR</th>
			<th class={border}>ANCHO</th>
			<th class={border}>ALTO</th>
			<th class={border}>CANT</th>
			<th class={border}>PRECIO U</th>
			<th class={border}>TOTAL</th>
		</tr>
	</thead>
	<tbody>
		{#each opcion.ventanas as ventana}
			<tr>
				<td class={border + 'text-left'}>{ventana.material}</td>
				<td class={border + 'text-left'}>{ventana.tipo_id}</td>
				<td class={border + 'text-left'}>{ventana.item}</td>
				<td class={border + 'text-left'}>{ventana.color}</td>
				<td class={border}>{ventana.ancho}</td>
				<td class={border}>{ventana.alto}</td>
				<td class={border}>{ventana.cantidad}</td>
				<td class={border}>{ventana.precio_unitario}</td>
				<td class={border}>{ventana.precio_total}</td>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr> </tr>
	</tfoot>
</table>
