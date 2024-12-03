import { getFormulaCantByCod, getFormulaDimByCod } from "$lib/repositories/perfil";
import { getPerfilesTipo } from "$lib/repositories/tipo";
import { Err } from "neverthrow";

export async function calcularCostoTotal(db: D1Database, ventana: VentanaEntity){
    const perfiles = await getPerfilesTipo(db, ventana.id_tipo)

    let costoTotal = 0;

    if (!perfiles || perfiles.length === 0){
        throw new Error("No se encontraron perfiles para este tipo de ventana");
    }

    for(const perfil of perfiles){
        const formulaDimResult = await getFormulaDimByCod(db, perfil.codigo);

        if(formulaDimResult.isErr()){
            throw new Error("Error al obtener la fórmula del perfil con código ${perfil.codigo}: ${formulaResult.error}");
        }

        const formulaDim = formulaDimResult.value.formula_dim;

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

        const formulaCantResult = await getFormulaCantByCod(db, perfil.codigo)

        if(formulaCantResult.isErr()){
            throw new Error('Error al obtener la fórmula de cantidad para el perfil con código ${perfil.codigo}: ${formulaCantResult.error}');
        }

        const formulaCant = formulaCantResult.value.formula_cant;

        const parametrosCant = {
            Z: ventana.cantidad
        }

        let cantidad_perfil;

        try {
            cantidad_perfil = evalFormula(formulaCant, parametrosCant);
        }catch (error){
            throw new Error("Error al calcular la cantidad para el perfil con código ${perfil.codigo}: ${error.message}");
        }
    }
}

function evalFormula(formula: string, parametros: Record<string, number>){
    let formulaEvaluada = formula;
    for (const [variable, valor] of Object.entries(parametros)){
        const regex = new RegExp(`\\b${variable}\\b`, "g");
        formulaEvaluada = formulaEvaluada.replace(regex, valor.toString());
    }

    return eval(formulaEvaluada);
}