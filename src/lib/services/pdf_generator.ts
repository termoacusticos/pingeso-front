import {
	PDFDocument,
	PDFFont,
	PDFPage,
	PageSizes,
	StandardFonts,
	endMarkedContent,
	rgb
} from 'pdf-lib';

//#region constantes

const checkbox_0 =
	'M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5z';
const checkbox_1 =
	'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5zm-9 12l-4-4l1.41-1.42L10 14.17l6.59-6.59L18 9';

let pdfDoc: PDFDocument;
let page: PDFPage;

let fontSize = 11;
let font: PDFFont;
let boldFont: PDFFont;

let height: number;
let width: number;

let marginTop: number = 40;
let marginLeft: number = 20;

let currentX: number;
let currentY: number;

let verticalGap: number = 15;

const columnWidths = [70, 40, 100, 70, 50, 50, 40, 60, 60];
const rowHeight = 15; // Altura de cada fila
const footerText = ['TOTAL IVA INCLUIDO', 'TRANSPORTE'];

//#region funciones
async function embedImg(pdfDoc: PDFDocument, url: string) {
	const image = await fetch(url).then((res) => res.arrayBuffer());
	const embeded = await pdfDoc.embedPng(image); // Usa embedJpg si es JPG
	return embeded;
}

async function drawImageRow(images: string[], imageAreaHeight: number) {
	if (currentY - imageAreaHeight - verticalGap < 0) {
		page = pdfDoc.addPage(PageSizes.A4);
		currentY = height - marginTop;
	}

	// Agregar imágenes programáticamente
	const imageYPosition = currentY - imageAreaHeight; // Posición vertical del área para imágenes
	const imageWidth = (width - marginLeft * 2) / images.length - 10; // Espacio horizontal dividido entre imágenes
	const imageXStart = marginLeft; // Margen inicial a la izquierda

	for (let i = 0; i < images.length; i++) {
		const url = images[i];
		const embeddedImage = await embedImg(pdfDoc, url);
		const scaledImage = embeddedImage.scaleToFit(imageWidth, imageAreaHeight);

		const xOffset = imageXStart + i * (imageWidth + 10); // Espacio entre imágenes
		const xCenterOffset = (imageWidth - scaledImage.width) / 2; // Centrado horizontal
		const yCenterOffset = (imageAreaHeight - scaledImage.height) / 2; // Centrado vertical
		page.drawImage(embeddedImage, {
			x: xOffset + xCenterOffset,
			y: imageYPosition + yCenterOffset,
			width: scaledImage.width,
			height: scaledImage.height
		});
	}
	currentY = imageYPosition - verticalGap;
}

function drawLeftText(textArray: string[], options: { linkOn3rd: boolean } = { linkOn3rd: false }) {
	for (let index = 0; index < textArray.length; index++) {
		const text = textArray[index];
		const isLink = index === 3; // El último es un link
		page.drawText(text, {
			x: marginLeft,
			y: currentY,
			size: fontSize,
			font: boldFont,
			color: isLink && options.linkOn3rd ? rgb(0, 0, 1) : rgb(0, 0, 0) // Azul para el link
		});
		currentY -= verticalGap; // Espacio entre líneas
	}
}

function drawOptionHeaderRow(
	row: string[],
	rowSize: number,
	colSize: number,
	optionMargin: number
) {
	let svgSize = 12.5;
	currentX = marginLeft + optionMargin;
	for (let index = 0; index < row.length; index++) {
		const text = row[index];
		page.drawText(text, {
			x: currentX,
			y: currentY,
			size: fontSize,
			font: boldFont
		});
		currentX += rowSize;
		if (index != 0) {
			page.drawSvgPath(index == 1 ? checkbox_1 : checkbox_0, {
				x: currentX - svgSize,
				y: currentY + svgSize,
				scale: 0.675,
				color: index == 1 ? rgb(0, 1, 0) : rgb(0, 0, 0)
			});
			currentX += svgSize;
		}
	}
	currentY -= colSize;
}

//#region tabla
function drawTable(opcion: OpcionModel) {
	// Dimensiones de las columnas
	const headers = [
		'MATERIAL',
		'TIPO',
		'DESCRIPCIÓN',
		'COLOR',
		'ANCHO',
		'ALTO',
		'CANT',
		'PRECIO U',
		'TOTAL'
	];

	currentX = marginLeft;

	// Dibujar encabezados con fondo de color
	page.drawRectangle({
		x: marginLeft,
		y: currentY - rowHeight,
		width: width - marginLeft * 2,
		height: rowHeight,
		color: rgb(0.75, 0.75, 0.75), // Color de fondo gris claro
		borderColor: rgb(0, 0, 0),
		borderWidth: 0.5
	});

	headers.forEach((header, index) => {
		const cellX = currentX + 5;
		const columnWidth = columnWidths[index];

		if (index === 7 || index === 8) {
			const textWidth = font.widthOfTextAtSize(header, 10);
			page.drawText(header, {
				x: currentX + columnWidth - textWidth + 5, // Ajuste para alinearlo al borde derecho
				y: currentY - 10,
				size: fontSize,
				font: font,
				color: rgb(0, 0, 0)
			});
		} else {
			// Texto alineado a la izquierda
			page.drawText(header, {
				x: cellX,
				y: currentY - 10,
				size: fontSize,
				font: font,
				color: rgb(0, 0, 0)
			});
		}
		currentX += columnWidths[index];
	});
	currentY -= rowHeight; // Espacio para las filas

	//#region ventanas
	// Dibujar filas de datos desde las opciones
	opcion.ventanas.forEach((ventana, index) => {
		currentX = marginLeft;

		// Dibujar bordes de las filas
		page.drawRectangle({
			x: marginLeft,
			y: currentY - rowHeight,
			width: width - marginLeft * 2,
			height: rowHeight,
			borderWidth: 0.5,
			borderColor: rgb(0, 0, 0)
		});

		const row = [
			ventana.material,
			ventana.tipo_id.toString(),
			ventana.item || '-',
			ventana.color,
			ventana.ancho.toString(),
			ventana.alto.toString(),
			ventana.cantidad.toString(),
			ventana.precio_unitario.toLocaleString(),
			ventana.precio_total.toLocaleString()
		];

		row.forEach((cell, index) => {
			const cellX = currentX + 5;
			const columnWidth = columnWidths[index];

			// Alinear texto a la derecha para "PRECIO U" y "TOTAL"
			if (index === 7 || index === 8) {
				const textWidth = font.widthOfTextAtSize(cell, fontSize);
				page.drawText(cell, {
					x: currentX + columnWidth - textWidth + 10, // Ajuste para alinearlo al borde derecho
					y: currentY - 10,
					size: fontSize,
					font: font,
					color: rgb(0, 0, 0)
				});
			} else {
				// Texto alineado a la izquierda
				page.drawText(cell, {
					x: cellX,
					y: currentY - 10,
					size: fontSize,
					font: font,
					color: rgb(0, 0, 0)
				});
			}

			currentX += columnWidth;
		});

		currentY -= rowHeight; // Espacio entre filas
	});

	//#region footer
	const totalIvaIncluido = opcion.ventanas
		.reduce((sum, ventana) => sum + ventana.precio_total, 0)
		.toLocaleString();
	const footerValues = [totalIvaIncluido, '120000'];

	footerText.forEach((text, index) => {
		page.drawRectangle({
			x: marginLeft,
			y: currentY - rowHeight,
			width: width - marginLeft * 2,
			height: rowHeight,
			color: rgb(0.9, 0.9, 0.5), // Color amarillo claro
			borderColor: rgb(0, 0, 0),
			borderWidth: 0.5
		});

		page.drawText(text, {
			x: marginLeft + 5,
			y: currentY - 10,
			size: fontSize,
			font: font,
			color: rgb(0, 0, 0)
		});

		const value = footerValues[index];
		const valueWidth = font.widthOfTextAtSize(value, fontSize);
		page.drawText(value, {
			x: currentX - valueWidth + 10, // Ajuste para alinearlo al borde derecho
			y: currentY - 10,
			size: fontSize,
			font: font,
			color: rgb(0, 0, 0)
		});
		currentY -= rowHeight;
	});
	currentY -= verticalGap;
}

//#region generatePDF
// Función para generar el PDF iterando sobre los elementos.
export const generatePDF = async (
	presupuesto: PresupuestoModel,
	header: { logos: string[]; h2: string[] }
) => {
	pdfDoc = await PDFDocument.create();

	font = await pdfDoc.embedFont(StandardFonts.Helvetica);
	boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

	page = pdfDoc.addPage(PageSizes.A4);
	width = page.getWidth();
	height = page.getHeight();

	currentY = height - marginTop;
	currentX = marginLeft;

	//#region header
	const logo = await embedImg(pdfDoc, '/logo_negro.png');
	const logoSize = logo.scale(0.5);
	page.drawImage(logo, {
		x: marginLeft,
		y: currentY - logoSize.height,
		width: logoSize.width,
		height: logoSize.height
	});
	currentX += logoSize.width + 40;

	const expertos = await embedImg(pdfDoc, '/elige_expertos.png');
	const expertosSize = expertos.scale(0.5);
	page.drawImage(expertos, {
		x: currentX,
		y: currentY - expertosSize.height,
		width: expertosSize.width,
		height: expertosSize.height
	});
	currentX += expertosSize.width + 40;

	const barras = await embedImg(pdfDoc, '/barras.png');
	const barrasSize = barras.scale(0.65);
	page.drawImage(barras, {
		x: currentX,
		y: currentY - barrasSize.height,
		width: barrasSize.width,
		height: barrasSize.height
	});
	currentX += barrasSize.height;
	currentY -= logoSize.height + verticalGap;

	//#region textos
	// Izquierda
	const leftTexts = [
		'TERMOPANEL SYSTEM LTDA',
		'77.323.478-7',
		'SANTA INES 01583, QUINTA NORMAL',
		'WWW.TERMOACUSTICOS.CL'
	];

	// Derecha
	const rightTexts = [
		'ASESOR: ALEJANDRO GONZALEZ',
		'JEFE COMERCIAL',
		'+56 9 4963 7515',
		'CONTACTO@TERMOACUSTICOS.CL'
	];

	// Dibujar textos a la derecha
	let yText = currentY; // no actualizar el currenty para que queden paralelos
	for (let index = 0; index < rightTexts.length; index++) {
		const text = rightTexts[index];
		const textWidth = font.widthOfTextAtSize(text, fontSize);
		const isLink = index === 3; // El último es un link
		page.drawText(text, {
			x: width - textWidth - marginLeft, // Alinear derecha
			y: yText,
			size: fontSize,
			font: boldFont,
			color: isLink ? rgb(0, 0, 1) : rgb(0, 0, 0) // Azul para el link
		});
		yText -= verticalGap; // Espacio entre líneas
	}

	drawLeftText(leftTexts, { linkOn3rd: true });

	//#region imagenes1
	await drawImageRow(header.logos, 100);

	const clienteTexts = [
		'SEÑOR(A): ' + presupuesto.cliente?.nombre,
		'A CONTINUACIÓN ENTREGAMOS PROPUESTA PARA SU PROYECTO:'
	];
	drawLeftText(clienteTexts);
	currentY -= verticalGap;

	//#region opciones
	for (let opcionIndex = 0; opcionIndex < presupuesto.opciones.length; opcionIndex++) {
		const opcion = presupuesto.opciones[opcionIndex];

		let optRowSize = boldFont.widthOfTextAtSize('AAAAAAAAAA', fontSize + 2);
		let optColSize = boldFont.heightAtSize(fontSize + 3);

		let opcionHeight = opcion.ventanas.length * rowHeight;
		opcionHeight += (footerText.length + 1) * rowHeight;
		opcionHeight += optColSize * 2;

		if (currentY - opcionHeight < 0) {
			page = pdfDoc.addPage(PageSizes.A4);
			currentY = height - marginTop;
		}

		page.drawText('OPCIÓN ' + opcionIndex, {
			x: marginLeft,
			y: currentY,
			size: fontSize + 2,
			font: boldFont
		});
		let optionMargin = boldFont.widthOfTextAtSize('OPCIÓN X  ', fontSize + 2);

		const upperRow = ['CALIDAD:', 'ALTA', 'MEDIA'];
		const lowerRow = ['TERMOPANEL:', 'WARMEDGE', 'TRADICIONAL'];

		currentX = marginLeft + optionMargin;
		drawOptionHeaderRow(upperRow, optRowSize, optColSize, optionMargin);

		currentX = marginLeft + optionMargin;
		drawOptionHeaderRow(lowerRow, optRowSize, optColSize, optionMargin);
		currentY += verticalGap / 2;

		drawTable(opcion);
	}

	await drawImageRow(header.logos, 80);

	//#region guardarPDF
	const pdfBytes = await pdfDoc.save();
	const blob = new Blob([pdfBytes], { type: 'application/pdf' });
	const url = URL.createObjectURL(blob);
	// window.open(url);
	return url;
};
