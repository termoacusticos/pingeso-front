import { getPerfilesTipo, getQuincalleriasTipo } from "$lib/repositories/tipo";
import { Err } from "neverthrow";

export async function calcularCostoTotal(db: D1Database, ventana: VentanaEntity, input: number, cristal: CristalEntity, porcentaje: number){
    const perfiles = await getPerfilesTipo(db, ventana.id_tipo)
    const quincallerias = await getQuincalleriasTipo(db, ventana.id_tipo)

    let costoTotal = 0;

    if (!perfiles || perfiles.length === 0){
        throw new Error("No se encontraron perfiles para este tipo de ventana");
    }

    if (!quincallerias || quincallerias.length === 0){
        throw new Error("No se encontraron quincallerías para este tipo de ventana");
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

        const kilos = (dimension_perfil/1000)*cantidad_perfil*perfil.kg_ml;
        const costoPerfil = kilos*input;

        costoTotal += costoPerfil;
    }

    for (const quincalleria of quincallerias){
        const formulaCant = quincalleria.formula;

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

        const costoQuincalleria = cantidad_quincalleria*quincalleria.precio;

        costoTotal += costoQuincalleria;
    }

    const cantidadCristal = 2 * ventana.cantidad;
    const anchoCristal = (ventana.ancho/2) - 65;
    const altoCristal = ventana.alto - 124;
    const m2 = (anchoCristal/1000)*(altoCristal/1000)*cantidadCristal;
    const costoCristal = m2*cristal.precio;

    costoTotal += costoCristal;

    costoTotal = costoTotal + (costoTotal * (porcentaje/100));

    ventana.precio_total = costoTotal;

    return ventana;
}

function evalFormula(formula: string, parametros: Record<string, number>){
    let formulaEvaluada = formula;
    for (const [variable, valor] of Object.entries(parametros)){
        const regex = new RegExp(`\\b${variable}\\b`, "g");
        formulaEvaluada = formulaEvaluada.replace(regex, valor.toString());
    }

    return eval(formulaEvaluada);
}