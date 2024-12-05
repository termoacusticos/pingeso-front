import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Función para generar el PDF iterando sobre los elementos.
export const generatePDF = async (items: any[]) => {
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
	for (let index = 0; index < items.length; index++) {
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