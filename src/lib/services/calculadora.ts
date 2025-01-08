import { getPerfilesTipo, getQuincalleriasTipo, getTipoById } from '$lib/repositories/tipo';
import type { VentanaModel } from '$lib/types';
import { getCristalById } from '$lib/repositories/cristal';
import { getMaterialById } from '$lib/repositories/material';
import { evaluate } from 'mathjs';

export async function calcularCostoVentana(ventana: VentanaModel) {
	const tipo = await getTipoById(ventana.id_tipo);
	if (!tipo) {
		throw new Error('No se encontró el tipo de ventana');
	}
	console.log(tipo);

	const material = await getMaterialById(tipo.id_material);

	let costoTotal = 0;
	let costoUnitario = 0;

	if (
		tipo.Material.nombre_material === 'ALUMINIO PREMIUM XELENTIA' ||
		tipo.Material.nombre_material === 'ALUMINIO ESTÁNDAR BÁSICO'
	) {
		const perfiles = await getPerfilesTipo(ventana.id_tipo);
		const quincallerias = await getQuincalleriasTipo(ventana.id_tipo);
		const cristal = await getCristalById(ventana.id_cristal);

		if (!perfiles || perfiles.length === 0) {
			throw new Error('No se encontraron perfiles para este tipo de ventana');
		}

		if (!quincallerias || quincallerias.length === 0) {
			throw new Error('No se encontraron quincallerías para este tipo de ventana');
		}

		if (!cristal) {
			throw new Error('No se encontró el cristal para esta ventana');
		}

		for (const perfil of perfiles) {
			const formulaDim = perfil.formula_dim;

			const parametrosDim = {
				X: ventana.ancho,
				Y: ventana.alto
			};

			let dimension_perfil;

			try {
				dimension_perfil = evalFormula(formulaDim, parametrosDim);
			} catch (error) {
				throw new Error(
					`Error al calcular la dimensión para el perfil con código ${perfil.codigo_per}`
				);
			}

			const formulaCant = perfil.formula_cant;

			const parametrosCant = {
				Z: ventana.cantidad
			};

			let cantidad_perfil;

			try {
				cantidad_perfil = evalFormula(formulaCant, parametrosCant);
			} catch (error) {
				throw new Error(
					`Error al calcular la cantidad para el perfil con código ${perfil.codigo_per}`
				);
			}

			if (perfil.kg_ml_per === null) {
				throw new Error(
					`El perfil con código ${perfil.codigo_per} tiene un valor nulo para kg_ml_per`
				);
			}
			const kilos = (dimension_perfil / 1000) * cantidad_perfil * perfil.kg_ml_per;
			const costoPerfil = kilos * perfil.valor;

			costoTotal += costoPerfil;
		}
		for (const quincalleria of quincallerias) {
			const formulaCant = quincalleria.formula_quin;

			const parametrosCant = {
				X: ventana.ancho,
				Y: ventana.alto,
				Z: ventana.cantidad
			};

			let cantidad_quincalleria;

			try {
				cantidad_quincalleria = evalFormula(formulaCant, parametrosCant);
			} catch (error) {
				throw new Error(
					'Error al calcular la cantidad para la quincallería con código ${quincalleria.id}: ${error.message}'
				);
			}

			const costoQuincalleria = cantidad_quincalleria * quincalleria.precio_quin;
			costoTotal += costoQuincalleria;
		}
		const cantidadCristal = evalFormula(tipo.cantidad_cristal, { Z: ventana.cantidad });
		const anchoCristal = evalFormula(tipo.formula_ancho, { X: ventana.ancho });
		const altoCristal = evalFormula(tipo.formula_alto, { Y: ventana.alto });
		const m2 = (anchoCristal / 1000) * (altoCristal / 1000) * cantidadCristal;
		const costoCristal = m2 * cristal.precio_cristal;
		costoTotal += costoCristal;
	} else if (tipo.Material.nombre_material === 'PVC EUROPEO') {
		const perfiles = await getPerfilesTipo(ventana.id_tipo);
		const cristal = await getCristalById(ventana.id_cristal);

		if (!perfiles || perfiles.length === 0) {
			throw new Error('No se encontraron perfiles para este tipo de ventana');
		}

		if (!cristal) {
			throw new Error('No se encontró el cristal para esta ventana');
		}

		let totalPerfiles = 0;
		for (const perfil of perfiles) {
			totalPerfiles += perfil.valor;

			const formulaDim = perfil.formula_dim;

			const parametrosDim = {
				X: ventana.ancho,
				Y: ventana.alto
			};

			let dimension_perfil;

			try {
				dimension_perfil = evalFormula(formulaDim, parametrosDim);
			} catch (error) {
				throw new Error(
					'Error al calcular la dimensión para el perfil con código ${perfil.codigo}: ${error.message}'
				);
			}

			const formulaCant = perfil.formula_cant;

			const parametrosCant = {
				Z: ventana.cantidad
			};

			let cantidad_perfil;

			try {
				cantidad_perfil = evalFormula(formulaCant, parametrosCant);
			} catch (error) {
				throw new Error(
					'Error al calcular la cantidad para el perfil con código ${perfil.codigo}: ${error.message}'
				);
			}

			const costoPerfil = dimension_perfil * cantidad_perfil * (perfil.valor / 5.8);
			costoTotal += costoPerfil;
		}

		const porcentajeQuinc = tipo.porcentaje_quinc ?? 0;
		const costoQuincalleria = (porcentajeQuinc / 100) * totalPerfiles;

		costoTotal += costoQuincalleria;

		console.log(costoQuincalleria);

		const cantidadCristal = evalFormula(tipo.cantidad_cristal, { Z: ventana.cantidad });
		const anchoCristal = evalFormula(tipo.formula_ancho, { X: ventana.ancho });
		const altoCristal = evalFormula(tipo.formula_alto, { Y: ventana.alto });

		const auxCristal = (anchoCristal * altoCristal) / 1000000;
		const costoCristal = cristal.precio_cristal * auxCristal * cantidadCristal;

		costoTotal += costoCristal;
	}

	const gananciaFinal = ventana.ganancia ?? tipo.ganancia ?? 0;
	costoTotal = costoTotal * (1 + gananciaFinal / 100);
	costoUnitario = costoTotal / ventana.cantidad;

	ventana.precio_total = costoTotal;
	ventana.precio_unitario = costoUnitario;

	return { costoTotal, costoUnitario };
}

function evalFormula(formula: string, parametros: Record<string, number>) {
	let formulaEvaluada = formula;
	for (const [variable, valor] of Object.entries(parametros)) {
		const regex = new RegExp(`\\b${variable}\\b`, 'g');
		formulaEvaluada = formulaEvaluada.replace(regex, valor.toString());
	}

	return evaluate(formulaEvaluada);
}
