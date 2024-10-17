<script lang="ts">
	import { jsPDF } from 'jspdf';
	import html2canvas from 'html2canvas';

	let pdfContent: HTMLElement;

	const generatePDF = () => {
		// Utilizamos html2canvas para capturar el contenido HTML como una imagen
		html2canvas(pdfContent, { scale: 3 }).then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF({
				orientation: 'portrait',
				unit: 'mm',
				format: 'a4'
			});

			const pageWidth = pdf.internal.pageSize.getWidth();
			const pageHeight = pdf.internal.pageSize.getHeight();

			const imgWidth = canvas.width * 0.264583; // Convertir píxeles a mm (aproximado)
			const imgHeight = canvas.height * 0.264583;

			// Ajustar la imagen al tamaño de la página A4
			let widthRatio = pageWidth / imgWidth;
			let heightRatio = pageHeight / imgHeight;
			let scale = Math.min(widthRatio, heightRatio);

			let x = (pageWidth - imgWidth * scale) / 2;
			let y = (pageHeight - imgHeight * scale) / 2;

			pdf.addImage(imgData, 'PNG', x, y, imgWidth * scale, imgHeight * scale);
			pdf.save('document_1.pdf');
		});
	};
</script>

<div bind:this={pdfContent} class="bg-blue-400 w-[210mm] h-[297mm] p-5 py-20">
	<h1 class="bg-blue-50 p-1 rounded-xl">Presupuesto de Ventanas</h1>
	<div class="grid grid-cols-2 gap-y-4 gap-x-20 bg-green-300">
		<p>Modelo: Ventana A</p>
		<p>Modelo: Ventana A</p>
		<p>Modelo: Ventana A</p>
		<p>Modelo: Ventana A</p>
	</div>
	<p>Color: Blanco</p>
	<p>Material: Aluminio</p>
</div>

<button on:click={generatePDF}>Generar PDF</button>

