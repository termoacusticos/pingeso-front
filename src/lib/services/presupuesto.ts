import { getPerfilesTipo, getQuincalleriasTipo } from "$lib/repositories/tipo";
import { Err } from "neverthrow";
import type { VentanaModel } from "$lib/types";
import { getCristalById } from "$lib/repositories/cristal";


export async function calcularCostoTotal(db: D1Database, ventana: VentanaModel, porcentaje: number){
    const perfiles = await getPerfilesTipo(ventana.id_tipo)
    const quincallerias = await getQuincalleriasTipo(ventana.id_tipo)
    const cristal = await getCristalById(ventana.id_cristal)

    let costoTotal = 0;
    let costoUnitario = 0;

    if (!perfiles || perfiles.length === 0){
        throw new Error("No se encontraron perfiles para este tipo de ventana");
    }

    if (!quincallerias || quincallerias.length === 0){
        throw new Error("No se encontraron quincallerías para este tipo de ventana");
    }

    if (!cristal){
        throw new Error("No se encontró el cristal para esta ventana");
    }

    for(const perfil of perfiles){
        const formulaDim = perfil.formula_dim;

        const parametrosDim = {
            X: ventana.ancho,
            Y: ventana.alto
        };

        let dimension_perfil;

        try {
            dimension_perfil = evalFormula(formulaDim, parametrosDim)
        } catch (error){
            throw new Error ("Error al calcular la dimensión para el perfil con código ${perfil.codigo}: ${error.message}");
        }

        const formulaCant = perfil.formula_cant;

        const parametrosCant = {
            Z: ventana.cantidad
        }

        let cantidad_perfil;

        try {
            cantidad_perfil = evalFormula(formulaCant, parametrosCant);
        }catch (error){
            throw new Error("Error al calcular la cantidad para el perfil con código ${perfil.codigo}: ${error.message}");
        }

        const kilos = (dimension_perfil/1000)*cantidad_perfil*perfil.kg_ml_per;
        const costoPerfil = kilos*perfil.valor;

        costoTotal += costoPerfil;
    }

    for (const quincalleria of quincallerias){
        const formulaCant = quincalleria.formula_quin;

        const parametrosCant = {
            X: ventana.ancho,
            Y: ventana.alto,
            Z: ventana.cantidad
        }

        let cantidad_quincalleria;

        try {
            cantidad_quincalleria = evalFormula(formulaCant, parametrosCant);
        }catch (error){
            throw new Error("Error al calcular la cantidad para la quincallería con código ${quincalleria.id}: ${error.message}");
        }

        const costoQuincalleria = cantidad_quincalleria*quincalleria.precio_quin;

        costoTotal += costoQuincalleria;
    }

    const cantidadCristal = 2 * ventana.cantidad;
    const anchoCristal = (ventana.ancho/2) - 65;
    const altoCristal = ventana.alto - 124;
    const m2 = (anchoCristal/1000)*(altoCristal/1000)*cantidadCristal;
    const costoCristal = m2*cristal.precio_cristal;

    costoTotal += costoCristal;

    costoTotal = costoTotal + (costoTotal * (porcentaje/100));
    costoUnitario = costoTotal / ventana.cantidad;

    ventana.precio_total = costoTotal;
    ventana.precio_unitario = costoUnitario;

    return { costoTotal, costoUnitario };
}

function evalFormula(formula: string, parametros: Record<string, number>){
    let formulaEvaluada = formula;
    for (const [variable, valor] of Object.entries(parametros)){
        const regex = new RegExp(`\\b${variable}\\b`, "g");
        formulaEvaluada = formulaEvaluada.replace(regex, valor.toString());
    }

    return eval(formulaEvaluada);
}