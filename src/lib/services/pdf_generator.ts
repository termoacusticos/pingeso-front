import type { ConstantData, ImageGroup, OpcionModel, PresupuestoModel } from '$lib/types';
import type { Color, Cristal, Material, Tipo } from '@prisma/client';
import {
	PDFDocument,
	PageSizes,
	rgb,
	layoutMultilineText,
	TextAlignment,
	PDFPage,
	PDFFont,
	type LayoutTextOptions
} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

//#region constantes
let materiales: Material[];
let colores: Color[];
let cristales: Cristal[];
let tipos: Tipo[];

let pdfDoc: PDFDocument;
let page: PDFPage;

const fontSize = 9;
let font: PDFFont;
let boldFont: PDFFont;

let height: number;
let width: number;

const marginTop: number = 40;
const marginLeft: number = 20;

let currentX: number;
let currentY: number;

const verticalGap: number = 11;

// Dimensiones de las columnas
const headersTabla = ['TIPO', 'COLOR', 'CRISTAL', 'ANCHO', 'ALTO', 'CANT', 'PRECIO U', 'TOTAL'];
const columnWidths = [115, -25, 35, -35, -40, -33, -15, -15].map((element, _, arr) => {
	return element + 550 / arr.length;
});
const rowHeight = 13; // Altura de cada fila
const rowGap = 9;
const footerText = ['TRANSPORTE', 'INSTALACIÓN', 'TOTAL IVA INCLUIDO'];
let footerValues: number[] = [];
//#region funciones
async function drawImageRow(group: ImageGroup | undefined) {
	if (group == undefined) return;

	const images = group.imagenes;
	if (images.length == 0) return;
	const imgHeight = images[0].height;

	if (currentY - -verticalGap < 0) {
		page = pdfDoc.addPage(PageSizes.A4);
		currentY = height - marginTop;
	}

	// Agregar imágenes programáticamente
	const imageYPosition = currentY - imgHeight; // Posición vertical del área para imágenes
	const imageWidth = (width - marginLeft * 2) / images.length - 10; // Espacio horizontal dividido entre imágenes
	const imageXStart = marginLeft; // Margen inicial a la izquierda

	for (let i = 0; i < images.length; i++) {
		const bytes = images[i].bytes;
		const embeddedImage = await pdfDoc.embedPng(bytes);
		const scaledImage = embeddedImage.scaleToFit(imageWidth, imgHeight);

		const xOffset = imageXStart + i * (imageWidth + 10); // Espacio entre imágenes
		const xCenterOffset = (imageWidth - scaledImage.width) / 2; // Centrado horizontal
		const yCenterOffset = (imgHeight - scaledImage.height) / 2; // Centrado vertical
		page.drawImage(embeddedImage, {
			x: xOffset + xCenterOffset,
			y: imageYPosition + yCenterOffset,
			width: scaledImage.width,
			height: scaledImage.height
		});
	}
	currentY = imageYPosition - verticalGap;
}

function formatoChileno(valor: number) {
	const truncado = Math.trunc(valor); // Trunca el número
	return new Intl.NumberFormat('es-CL', {
		currency: 'CLP',
		minimumFractionDigits: 0
	}).format(truncado);
}

function drawOptionHeaderRow(row: string[], avialable_width: number, fontSize: number) {
	if (row.length === 0) return;

	const totalTextWidth = row.reduce(
		(acc, text) => acc + boldFont.widthOfTextAtSize(text, fontSize),
		0
	);

	const totalSpacing = avialable_width - totalTextWidth;
	const extraSpacing = totalSpacing / (row.length - 1);

	for (let index = 0; index < row.length; index++) {
		const text = row[index];

		page.drawText(text, {
			x: currentX,
			y: currentY,
			size: fontSize,
			font: boldFont
		});

		// Avanzar X considerando el tamaño del texto más el espacio extra calculado
		currentX += boldFont.widthOfTextAtSize(text, fontSize) + extraSpacing;
	}
}

function isValidURL(str: string) {
	const pattern = /^(https?:\/\/)?(www\.)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
	return pattern.test(str);
}

function drawMultiLineText(texto_multilinea: string, opciones: LayoutTextOptions) {
	const multiText = layoutMultilineText(texto_multilinea, opciones);
	let _currentY = currentY - verticalGap;

	for (let i = 0; i < multiText.lines.length; i++) {
		const line = multiText.lines[i];

		if (_currentY - line.height < 0) {
			page = pdfDoc.addPage(PageSizes.A4);
			currentY = height - marginTop;
			_currentY = currentY;
		}

		page.drawText(line.text, {
			x: line.x,
			y: line.y - height,
			size: opciones.fontSize,
			font: opciones.font,
			color: isValidURL(multiText.lines[i].text) ? rgb(0, 0, 1) : rgb(0, 0, 0) // Azul para el link
		});
		// move position down
		_currentY -= line.height * 1.15;
	}
	return _currentY;
}

//#region tabla
function drawTable(opcion: OpcionModel, valor_despacho: number, valor_instalacion: number) {
	const tableFontSize = fontSize - 1;

	currentX = marginLeft;

	// dibujar fondo blanco y borde rojo para header + body
	page.drawRectangle({
		x: marginLeft,
		y: currentY - rowHeight * (opcion.Ventanas.length + 1),
		width: width - marginLeft * 2,
		height: rowHeight * (opcion.Ventanas.length + 1),
		color: rgb(1, 1, 1),
		borderColor: rgb(1, 0, 0),
		borderWidth: 0.5
	});

	// Dibujar encabezados con fondo de color
	page.drawRectangle({
		x: marginLeft + 0.5,
		y: currentY - rowHeight,
		width: width - 1 - marginLeft * 2,
		height: rowHeight - 0.5,
		color: rgb(0, 176 / 255, 240 / 255) // Color de fondo azul claro
	});

	headersTabla.forEach((header, index) => {
		const cellX = currentX + 5;
		const columnWidth = columnWidths[index];

		if (index > headersTabla.length - 6) {
			const textWidth = font.widthOfTextAtSize(header, tableFontSize);
			page.drawText(header, {
				x: currentX + columnWidth - textWidth + 10, // Ajuste para alinearlo al borde derecho
				y: currentY - rowGap,
				size: tableFontSize,
				font: boldFont,
				color: rgb(1, 1, 1)
			});
		} else {
			// Texto alineado a la izquierda
			page.drawText(header, {
				x: cellX,
				y: currentY - rowGap,
				size: tableFontSize,
				font: boldFont,
				color: rgb(1, 1, 1)
			});
		}
		currentX += columnWidths[index];
	});
	currentY -= rowHeight; // Espacio para las filas

	//#region ventanas
	// Dibujar filas de datos desde las opciones
	opcion.Ventanas.forEach((ventana) => {
		currentX = marginLeft;

		// Dibujar bordes de las filas
		// page.drawRectangle({
		// 	x: marginLeft,
		// 	y: currentY - rowHeight,
		// 	width: width - marginLeft * 2,
		// 	height: rowHeight,
		// 	color: rgb(1, 1, 1),
		// 	opacity: ventana_idx % 2 == 0 ? 0 : 0.07
		// });

		// Material
		// const materialEncontrado = materiales.find((mat) => mat.id_material === ventana.id_material);
		// const material = materialEncontrado
		// 	? materialEncontrado.nombre_material
		// 	: 'Material no encontrado';
		const tipoEncontrado = tipos.find((t) => t.id_tipo === ventana.id_tipo);
		const tipo = tipoEncontrado ? tipoEncontrado.descripcion_tipo : 'Tipo no encontrado';
		const cristalEncontrado = cristales.find((c) => c.id_cristal === ventana.id_cristal);
		const cristal = cristalEncontrado ? cristalEncontrado.desc_cristal : 'Cristal no encontrado';
		const colorEncontrado = colores.find((c) => c.id_color === ventana.id_color);
		const color = colorEncontrado ? colorEncontrado.nombre_color : 'Color no encontrado';

		const row = [
			tipo,
			color,
			cristal,
			ventana.ancho.toString(),
			ventana.alto.toString(),
			ventana.cantidad.toString(),
			formatoChileno(ventana.precio_unitario),
			formatoChileno(ventana.precio_total)
		];

		row.forEach((cell, index) => {
			const cellX = currentX + 5;
			const columnWidth = columnWidths[index];

			// Alinear texto a la derecha para "PRECIO U" y "TOTAL"
			if (index > headersTabla.length - 6) {
				const textWidth = font.widthOfTextAtSize(cell, tableFontSize);
				page.drawText(cell, {
					x: currentX + columnWidth - textWidth + 10, // Ajuste para alinearlo al borde derecho
					y: currentY - rowGap,
					size: tableFontSize,
					font: font,
					color: rgb(0, 0, 0)
				});
			} else {
				// Texto alineado a la izquierda
				let add_dot = false;
				while (font.widthOfTextAtSize(cell, tableFontSize) > columnWidth) {
					cell = cell.slice(0, cell.length - 1);
					add_dot = true;
				}
				if (add_dot) cell = cell.concat('.');
				page.drawText(cell, {
					x: cellX,
					y: currentY - rowGap,
					size: tableFontSize,
					font: font,
					color: rgb(0, 0, 0)
				});
			}

			currentX += columnWidth;
		});

		currentY -= rowHeight; // Espacio entre filas
	});

	//#region footer
	const totalIvaIncluido = opcion.Ventanas.reduce((sum, ventana) => sum + ventana.precio_total, 0);
	footerValues = [
		valor_despacho,
		valor_instalacion,
		totalIvaIncluido + valor_despacho + valor_instalacion
	];

	const extraWidth = font.widthOfTextAtSize('000000000000000', tableFontSize);
	const footerCellWidth = extraWidth * 2.5;

	// dibujar bordes todo menos valor total
	page.drawRectangle({
		width: footerCellWidth,
		height: (footerText.length - 1) * rowHeight,
		x: width - marginLeft - footerCellWidth,
		y: currentY - (footerText.length - 1) * rowHeight,
		borderColor: rgb(1, 0, 0),
		borderWidth: 0.25
	});

	// dibujar bordes valor total
	page.drawRectangle({
		width: footerCellWidth,
		height: rowHeight,
		x: width - marginLeft - footerCellWidth,
		y: currentY - footerText.length * rowHeight,
		borderColor: rgb(1, 0, 0),
		borderWidth: 1
	});

	footerText.forEach((text, index) => {
		page.drawText(text, {
			x: width - marginLeft - footerCellWidth + 5,
			y: currentY - rowGap,
			size: tableFontSize,
			font: font,
			color: rgb(0, 0, 0)
		});

		const value = footerValues[index].toLocaleString('en-US').split('.')[0];
		const valueWidth = font.widthOfTextAtSize(value, tableFontSize);

		page.drawText(value, {
			x: currentX - valueWidth + 10, // Ajuste para alinearlo al borde derecho
			y: currentY - rowGap,
			size: tableFontSize,
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
	imagenes: ImageGroup[],
	constantes: ConstantData
) => {
	colores = constantes.colores;
	cristales = constantes.cristales;
	materiales = constantes.materiales;
	tipos = constantes.tipos;
	pdfDoc = await PDFDocument.create();

	pdfDoc.registerFontkit(fontkit);
	const fontBytes = await fetch('/Archivo-Regular.ttf').then((res) => res.arrayBuffer());
	font = await pdfDoc.embedFont(fontBytes, { subset: true });

	const boldFontBytes = await fetch('/Archivo-Bold.ttf').then((res) => res.arrayBuffer());
	boldFont = await pdfDoc.embedFont(boldFontBytes, { subset: true });

	page = pdfDoc.addPage(PageSizes.A4);
	width = page.getWidth();
	height = page.getHeight();

	currentY = height - marginTop;
	currentX = marginLeft;

	//#region header
	const imagenesHeader = imagenes.find((value) => value.img_group == 1);
	await drawImageRow(imagenesHeader);
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

	// // Dibujar textos
	drawMultiLineText(rightTexts.join('\n'), {
		alignment: TextAlignment.Right,
		bounds: {
			height,
			width: width / 2,
			x: width / 2 - marginLeft,
			y: currentY
		},
		font: boldFont,
		fontSize: fontSize
	});

	currentY = drawMultiLineText(leftTexts.join('\n'), {
		alignment: TextAlignment.Left,
		bounds: {
			height,
			width: width / 2,
			x: marginLeft,
			y: currentY
		},
		font: boldFont,
		fontSize: fontSize
	});

	//#region imagenes1
	const imagenesGroup2 = imagenes.find((value) => value.img_group == 2);
	await drawImageRow(imagenesGroup2);

	const clienteTexts =
		'SEÑOR(A): {nombre} \nA CONTINUACIÓN ENTREGAMOS PROPUESTA PARA SU PROYECTO:'.replace(
			'{nombre}',
			presupuesto.nombre_cliente
		);

	currentY = drawMultiLineText(clienteTexts, {
		alignment: TextAlignment.Left,
		bounds: { width, height, x: currentX, y: currentY },
		font: boldFont,
		fontSize: fontSize
	});
	currentY -= verticalGap;

	//#region opciones
	for (let opcionIndex = 0; opcionIndex < presupuesto.Opciones.length; opcionIndex++) {
		const opcion = presupuesto.Opciones[opcionIndex];

		const optRowSize = boldFont.widthOfTextAtSize('AAAAAAAAAA', fontSize + 2);
		const optColSize = boldFont.heightAtSize(fontSize);

		let opcionHeight = opcion.Ventanas.length * rowHeight;
		opcionHeight += (footerText.length + 1) * rowHeight;
		opcionHeight += optColSize * 2;

		if (currentY - opcionHeight < 0) {
			page = pdfDoc.addPage(PageSizes.A4);
			currentY = height - marginTop;
		}

		const currentMat = materiales.find(
			(elem) => elem.id_material == opcion.Ventanas[0].id_material
		);

		currentX = marginLeft;

		// const optionMargin = boldFont.widthOfTextAtSize('OPCIÓN X  ', fontSize);
		// page.drawText('OPCIÓN ', {
		// 	x: marginLeft,
		// 	y: currentY,
		// 	size: fontSize,
		// 	font: boldFont
		// });

		// currentX += optionMargin;

		const materialText = currentMat?.nombre_material ?? 'Material no encontrado';
		// const materialSize = boldFont.widthOfTextAtSize(materialText + 'AA', fontSize);

		// page.drawText(materialText, { x: currentX, y: currentY, size: fontSize, font: boldFont });
		// currentX += boldFont.widthOfTextAtSize(materialText, fontSize) + marginLeft;

		const upperRow = [
			'OPCIÓN ' + (opcionIndex + 1) + '    ' + materialText,
			currentMat?.texto_calidad ?? '',
			currentMat?.texto_termopanel ?? ''
		];

		drawOptionHeaderRow(upperRow, width - currentX - marginLeft * 2, fontSize);
		currentY -= optColSize;

		currentY += verticalGap / 2;

		drawTable(opcion, presupuesto.valor_despacho, presupuesto.valor_instalacion);
		currentY -= verticalGap;
	}

	const imagenesGroup3 = imagenes.find((value) => value.img_group == 3);
	await drawImageRow(imagenesGroup3);

	drawMultiLineText(presupuesto.texto_libre, {
		alignment: TextAlignment.Left,
		bounds: { width: width - marginLeft * 2, height: 10000, x: 10, y: 10 },
		font: font,
		fontSize: fontSize
	});
	//#region guardarPDF
	const pdfBytes = await pdfDoc.save();
	const blob = new Blob([pdfBytes], { type: 'application/pdf' });
	const url = URL.createObjectURL(blob);
	console.log('done');
	return url;
};
