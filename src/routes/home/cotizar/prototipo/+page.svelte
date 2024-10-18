<script lang="ts">
	import { jsPDF } from 'jspdf';
	import html2canvas from 'html2canvas';

	let pdfContent: HTMLElement;
	let numbers = [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];

	// Función para generar el PDF iterando sobre los elementos.
	const generatePDF = async () => {
		const pdf = new jsPDF({
			orientation: 'portrait',
			unit: 'mm',
			format: 'a4'
		});

		const pageWidth = pdf.internal.pageSize.getWidth();
		const pageHeight = pdf.internal.pageSize.getHeight();
		const margin = 10; // Margen de 10mm
		const gap = 0; // Margen de 10mm

		let currentHeight = margin;
		for (let index = 0; index < numbers.length; index++) {
			const item = document.getElementById('pdf_' + index);
			if (item === null) return;
			const canvas = await html2canvas(item, { scale: 2 });
			const imgData = canvas.toDataURL('image/png');
			const imgWidth = pageWidth - margin * 2;
			const imgHeight = (canvas.height * imgWidth) / canvas.width;

			if (currentHeight + imgHeight > pageHeight - margin) {
				// Si el contenido actual excede la página, agrega una nueva página.
				pdf.addPage();
				currentHeight = margin;
			}

			// Añadir la imagen generada al PDF
			pdf.addImage(imgData, 'PNG', margin, currentHeight, imgWidth, imgHeight);
			currentHeight += imgHeight + gap; // Actualiza la altura para el próximo elemento, con espacio adicional.
		}
		pdf.save('documento_por_partes.pdf');
	};
</script>

<div bind:this={pdfContent} class="bg-blue-400 w-[210mm] p-5 py-20">
	<h1 class="bg-blue-50 p-1 rounded-xl">Presupuesto de Ventanas</h1>
	{#each numbers as n, index}
		<div class="grid grid-cols-2 gap-y-4 gap-x-20 bg-green-300" id={'pdf_' + index}>
			<p>Modelo: Ventana {index}</p>
			<p>Modelo: Ventana {index}</p>
			<p>Modelo: Ventana {index}</p>
			<p>Modelo: Ventana {index}</p>
		</div>
	{/each}
	<p>Color: Blanco</p>
	<p>Material: Aluminio</p>
</div>

<button on:click={generatePDF}>Generar PDF</button>
