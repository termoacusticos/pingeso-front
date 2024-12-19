import type { ConstantData } from "$lib/types";
import type { PageServerLoad } from "./$types";



export const load: PageServerLoad = async ({ fetch }) => {
    const constantes: ConstantData = await fetch('/api/constantes', {
        method: 'GET'
    }).then((response) => {
        return response.json();
    });
    
    return {
		materiales: constantes.materiales,
		colores: constantes.colores,
		cristales: constantes.cristales,
		tipos: constantes.tipos,
	};
}

