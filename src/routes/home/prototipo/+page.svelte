<script lang="ts">
	import { generatePDF } from '$lib/services/pdf_generator';
	import { onMount } from 'svelte';
	let header = {
		logos: ['/logo_negro.png', '/elige_expertos.png', '/barras.png'],
		h2: ['/favicon.png', '/barras.png']
	};
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
						precio_unitario: 1200000,
						precio_total: 12000000
					},
					{
						alto: 100,
						ancho: 100,
						cantidad: 3,
						color: 'Alcntar',
						tipo_id: 0,
						item: '',
						material: 'PVC',
						precio_unitario: 1200000,
						precio_total: 12000000
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
						precio_unitario: 100000,
						precio_total: 100000
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

	let images: string[] = [];

	const handleImageUpload = (event: Event) => {
		const files = (event.target as HTMLInputElement)?.files;
		if (files) {
			for (const file of Array.from(files)) {
				const reader = new FileReader();
				reader.onload = (e) => {
					if (e.target?.result) {
						images = [...images, e.target.result as string];
					}
				};
				reader.readAsDataURL(file);
			}
		}
	};

	let url = '';
	onMount(async () => {
		url = await generatePDF(presupuesto, header);
	});
</script>

<div class="border border-black p-5 py-20 flex flex-col" id="PDF">
	<!-- Contenedor de botones -->
	<div class="flex flex-col items-center gap-2 my-8">
		<input
			type="file"
			multiple
			accept="image/*"
			onchange={handleImageUpload}
			class="border border-gray-300 px-4 py-2 rounded focus:outline-none" />
	</div>
	<!-- Renderizar imágenes cargadas -->
	<div class="grid grid-cols-3 gap-4">
		{#each images as img}
			<img src={img} alt="Cargada" class="w-full h-auto border border-gray-300" />
		{/each}
	</div>
</div>

<button
	onclick={async () => {
		presupuesto.opciones.push({
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
		});
		url = await generatePDF(presupuesto, header);
	}}>GUARDAR</button>
<!-- <a href={url} download="hola.pdf" target="_blank">DESCARGAR</a> -->
<iframe src={url} title="PDF cotizacion" width="1200"></iframe>
