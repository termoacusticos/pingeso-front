<script lang="ts">
	const { opcion, index }: { opcion: OpcionModel; index: number } = $props();

	const border = 'border border-slate-500 ';
</script>

<div class="grid grid-cols-3 font-bold justify-start gap-2">
	<h2>OPCIÓN {index}</h2>
	<p class="flex justify-between">
		CALIDAD: ALTA <span class="iconify size-6 text-green-500 mdi--check-bold"></span>
	</p>
	<p class="flex justify-between">
		MEDIA <span class="iconify size-6 mdi--checkbox-blank-outline"></span>
	</p>
	<p>TERMOPANEL</p>
	<p class="flex justify-between">
		WARM EDGE <span class="iconify size-6 text-green-500 mdi--check-bold"></span>
	</p>
	<p class="flex justify-between">
		TRADICIONAL <span class="iconify size-6 mdi--checkbox-blank-outline"></span>
	</p>
</div>
<table class="table-auto w-full text-xs">
	<thead>
		<tr class="bg-slate-300 border border-slate-500 text-right">
			<th class="text-left">MATERIAL</th>
			<th class="text-left">TIPO</th>
			<th class="text-left">DESCRIPCIÓN</th>
			<th class="text-left">COLOR</th>
			<th>ANCHO</th>
			<th>ALTO</th>
			<th>CANT</th>
			<th>PRECIO U</th>
			<th>TOTAL</th>
		</tr>
	</thead>
	<tbody>
		{#each opcion.ventanas as ventana}
			<tr class="border border-slate-500 text-right">
				<td class="text-left">{ventana.material}</td>
				<td class="text-left">{ventana.tipo_id}</td>
				<td class="text-left">{ventana.item}</td>
				<td class="text-left">{ventana.color}</td>
				<td>{ventana.ancho}</td>
				<td>{ventana.alto}</td>
				<td>{ventana.cantidad}</td>
				<td>{ventana.precio_unitario}</td>
				<td>{ventana.precio_total}</td>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr class="bg-yellow-100 border border-slate-500">
			<td colspan="8" class="text-right">TOTAL IVA INCLUIDO</td>
			<td class="text-right">
				{opcion.ventanas.reduce(
					(accumulator, currentValue) => accumulator + currentValue.precio_total,
					0
				)}
			</td>
		</tr>
	</tfoot>
</table>
