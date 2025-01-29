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
