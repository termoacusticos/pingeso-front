<script lang="ts">
	//@ts-ignore
	import html2pdf from 'html2pdf.js';
	import Header from '$lib/components/PDF/Header.svelte';
	import Tabla from '$lib/components/PDF/Tabla.svelte';
	import jsPDF from 'jspdf';
	let makePDF: HTMLElement;
	const presupuesto: PresupuestoModel = {
		fecha: '',
		cliente: {
			direccion: '',
			email: 'cliente@ghmail.com',
			nombre: 'cliente',
			rut: '212121',
			telefono: '123123'
		},
		id_presupuesto: 0,
		opciones: [
			{
				ventanas: [
					{
						alto: 100,
						ancho: 100,
						cantidad: 1,
						color: 'Alcánts',
						tipo_id: 0,
						item: '',
						material: 'PVC',
						precio_unitario: 100000,
						precio_total: 100000
					},
					{
						alto: 100,
						ancho: 100,
						cantidad: 3,
						color: 'Alcntar',
						tipo_id: 0,
						item: '',
						material: 'PVC',
						precio_unitario: 120000,
						precio_total: 120000
					}
				]
			},
			{
				ventanas: [
					{
						alto: 100,
						ancho: 100,
						cantidad: 1,
						color: 'Alcánts',
						tipo_id: 0,
						item: '',
						material: 'PVC',
						precio_unitario: 0,
						precio_total: 0
					},
					{
						alto: 100,
						ancho: 100,
						cantidad: 3,
						color: 'Alcntar',
						tipo_id: 0,
						item: '',
						material: 'PVC',
						precio_unitario: 0,
						precio_total: 0
					}
				]
			}
		]
	};
</script>

<button
	onclick={() => {
		var opt = {
			margin: 1,
			filename: 'myfile.pdf',
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
		};
		html2pdf().set(opt).from(makePDF).save();
	}}>GUARDAR</button>
	
<div class="">
	<div class="border border-black w-[210mm] p-5 py-20" id="PDF" bind:this={makePDF}>
		<Header cliente={presupuesto.cliente} />
		{#each presupuesto.opciones as opcion, index}
			<Tabla {opcion} {index} />
		{/each}
	</div>
</div>
