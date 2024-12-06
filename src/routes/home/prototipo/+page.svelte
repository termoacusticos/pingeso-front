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

	const downloadPDF = () => {
		const options = {
			margin: 1,
			filename: 'myfile.pdf',
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
		};
		html2pdf().set(options).from(makePDF).save();
	};
</script>

<!-- Contenedor de botones -->
<div class="flex flex-col items-center gap-2 my-8">
	<button
		on:click={downloadPDF}
		class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
		>GUARDAR</button>
	<input
		type="file"
		multiple
		accept="image/*"
		on:change={handleImageUpload}
		class="border border-gray-300 px-4 py-2 rounded focus:outline-none" />
</div>
<!-- Vista previa y área del PDF -->
<div class="border border-black w-[210mm] p-5 py-20" id="PDF" bind:this={makePDF}>
	<Header cliente={presupuesto.cliente} />
	

	<!-- Renderizar imágenes cargadas -->
	<div class="grid grid-cols-3 gap-4">
		{#each images as img}
			<img src={img} alt="Cargada" class="w-full h-auto border border-gray-300" />
		{/each}
	</div>
	
	{#each presupuesto.opciones as opcion, index}
		<Tabla {opcion} {index} />
	{/each}
</div>
