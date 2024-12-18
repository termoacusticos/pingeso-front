<script lang="ts">
	import { PageSizes, PDFDocument } from 'pdf-lib';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let images: string[] = $state([]);
	$inspect(images);
	const handleImageUpload = async (event: Event) => {
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

	let test = async () => {
		let pdfDoc = await PDFDocument.create();
		console.log('img:', images);
		console.log('img:', images[0]);

		let page = pdfDoc.addPage(PageSizes.A4);
		let img = await pdfDoc.embedPng(images[0]);
		page.drawImage(img);
		const pdfBytes = await pdfDoc.save();
		const blob = new Blob([pdfBytes], { type: 'application/pdf' });
		const url = URL.createObjectURL(blob);
		window.open(url);
	};
</script>

<div class="border border-black p-5 py-20 flex flex-col" id="PDF">
	<button onclick={test}> gen </button>
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
