<script lang="ts">
	import EditorMateriales from "$lib/components/EditorMateriales.svelte";
	import type { Color, Cristal, Material, Tipo } from "@prisma/client";

    interface Props {
		data: any;
	}

	let { data }: Props = $props();
	const constantData = data; // horrible pero necesito usar data dentro de un fetch

    let constantSelected = $state('');
    let constantes = ["Materiales", "Cristales", "Tipos", "Imágenes", "Colores"]

    let materiales: Material[] = data.materiales;
	let tipos: Tipo[] = data.tipos;
	let cristales: Cristal[] = data.cristales;
    let colores: Color[] = data.colores;

    function formatoChileno(valor: number) {
		return new Intl.NumberFormat("es-CL", {
		style: "currency",
		currency: "CLP",
		minimumFractionDigits: 0
		}).format(valor);
	}

</script>

<div class="min-h-screen w-full p-8 bg-gray-100 xl:w-[60%] lg:w-[50%] md:w-[70%] mx-auto overflow-scroll">
    <select
        bind:value={constantSelected}
        class="p-2 rounded-md bg-white border w-44 truncate overflow-hidden whitespace-nowrap"
    >
        <option selected disabled value="">Selecciona un tipo</option>
        {#each constantes as option}
            <option class="w-auto">{option}</option>
        {/each}
    </select>

    {#if constantSelected == 'Materiales'}
        <table class="table-auto w-full rounded-lg bg-white shadow">
            <thead class="w-full bg-slate-200">
                <tr>
                    <th>ID</th>
                    <th>Nombre Material</th>
                </tr>
            </thead>
            <tbody class="w-full"> 
                {#each materiales as material}
                    <tr onselect={() => {}} class=" hover:bg-slate-200">
                        <td>{material.id_material}</td>
                        <td>{material.nombre_material}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <button 
            onselect={() => {}}
            class="w-full bg-teal-600 hover:bg-teal-500 transition-all text-white rounded-lg font-bold">
            Agregar Material</button>
    {/if}

    {#if constantSelected == 'Cristales'}
        <table class="table-auto w-full rounded-lg bg-white shadow">
            <thead class="w-full bg-slate-200">
                <tr>
                    <th>ID</th>
                    <th>Descripción Cristal</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody class="w-full"> 
                {#each cristales as cristal}
                    <tr onselect={() => {}} class=" hover:bg-slate-200">
                        <td>{cristal.id_cristal}</td>
                        <td>{cristal.desc_cristal}</td>
                        <td>{formatoChileno(cristal.precio_cristal)}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <button 
            onselect={() => {}}
            class="w-full bg-teal-600 hover:bg-teal-500 transition-all text-white rounded-lg font-bold">
            Agregar Cristal</button>
    {/if}

    {#if constantSelected == 'Tipos'}
        <table class="table-auto w-full rounded-lg bg-white shadow">
            <thead class="w-full bg-slate-200">
                <tr>
                    <th>ID</th>
                    <th>Descripción</th>
                    <th>Material</th>
                    <th>Fórmula ancho</th>
                    <th>Fórmula alto</th>
                    <th>Cantidad cristal</th>
                    <th>% Quincallería</th>
                    <th>Largo perfil</th>
                    <th>Mínimo</th>
                    <th>Máximo</th>
                    <th>Ganancia</th>
                </tr>
            </thead>
            <tbody class="w-full"> 
                {#each tipos as tipo}
                    <tr onselect={() => {}} class=" hover:bg-slate-200">
                        <td>{tipo.id_tipo}</td>
                        <td>{tipo.descripcion_tipo}</td>
                        <td>{tipo.id_material}</td>
                        <td>{tipo.formula_ancho}</td>
                        <td>{tipo.formula_alto}</td>
                        <td>{tipo.cantidad_cristal}</td>
                        <td>{tipo.porcentaje_quinc}</td>
                        <td>{tipo.largo_perfil}</td>
                        <td>{tipo.minimo}</td>
                        <td>{tipo.maximo}</td>
                        <td>{tipo.ganancia}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <button 
            onselect={() => {}}
            class="w-full bg-teal-600 hover:bg-teal-500 transition-all text-white rounded-lg font-bold">
            Agregar Tipo</button>
    {/if}

    {#if constantSelected == 'Colores'}
        <table class="table-auto w-full rounded-lg bg-white shadow">
            <thead class="w-full bg-slate-200">
                <tr>
                    <th>ID</th>
                    <th>Nombre Color</th>
                </tr>
            </thead>
            <tbody class="w-full"> 
                {#each colores as color}
                    <tr onselect={() => {}} class=" hover:bg-slate-200">
                        <td>{color.id_color}</td>
                        <td>{color.nombre_color}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <button 
            onselect={() => {}}
            class="w-full bg-teal-600 hover:bg-teal-500 transition-all text-white rounded-lg font-bold">
            Agregar Color</button>
    {/if}
</div>