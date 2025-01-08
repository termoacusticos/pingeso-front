<script lang="ts">
	import { goto } from '$app/navigation';
	import { generatePDF } from '$lib/services/pdf_generator';
	import { presupuesto } from '$lib/store';
	import type { PresupuestoUI } from '$lib/types';
	import { onMount } from 'svelte';

	const { data } = $props();
	let header = {
		logos: ['/ejemplo.png'],
		h2: ['/favicon.png', '/barras.png']
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

	let url = $state('');
	onMount(async () => {
		if (!$presupuesto) goto('/home/historial');
		await generatePDF($presupuesto, header, data, 'asd');
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

<!-- <a href={url} download="hola.pdf" target="_blank">DESCARGAR</a> -->
<iframe src={url} title="PDF cotizacion" width="1200"></iframe>
