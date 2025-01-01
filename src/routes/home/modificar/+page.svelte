<script lang="ts">
	import EditorMateriales from '$lib/components/EditorMateriales.svelte';
	import type { Color, Cristal, Material, Tipo } from '@prisma/client';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();
	const constantData = data; // horrible pero necesito usar data dentro de un fetch

	let constantSelected = $state('');
	let constantes = ['Materiales', 'Cristales', 'Tipos', 'Imágenes', 'Colores'];

	let editTipoModal = $state(false);
	let tipoSelected: Tipo = $state({
		id_tipo: 0,
		descripcion_tipo: '',
		id_material: 0,
		formula_ancho: '',
		formula_alto: '',
		cantidad_cristal: '',
		porcentaje_quinc: 0,
		largo_perfil: 0,
		minimo: 0,
		maximo: 0,
		ganancia: 0
	});

	let materiales: Material[] = data.materiales;
	let tipos: Tipo[] = data.tipos;
	let cristales: Cristal[] = data.cristales;
	let colores: Color[] = data.colores;

	function formatoChileno(valor: number) {
		return new Intl.NumberFormat('es-CL', {
			style: 'currency',
			currency: 'CLP',
			minimumFractionDigits: 0
		}).format(valor);
	}

	function openEditTipoModal(tipo: Tipo) {
		editTipoModal = true;
		tipoSelected = tipo;
	}

	function closeEditTipoModal() {
		editTipoModal = false;
	}

	function editTipo() {
		let bodyReq = {
			id: tipoSelected.id_tipo,
			tipo: tipoSelected
		};

		fetch('/api/tipo', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bodyReq)
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
				}
				return response.json();
			})
			.then(async (data) => {
				editTipoModal = true;
				console.log('Respuesta del servidor:', data);
			})
			.catch((error) => {
				console.error('Error durante la solicitud:', error);
			});
	}
</script>

<div
	class="min-h-screen w-full p-8 gap-5 flex flex-col bg-gray-100 xl:w-[60%] lg:w-[50%] md:w-[70%] mx-auto overflow-scroll">
	<div class="flex flex-row items-center">
		<button
			onclick={() => {
				location.assign('/home');
			}}
			aria-label="home"
			class="hover:underline">Home</button>
		<div class="iconify mdi--keyboard-arrow-right size-5"></div>
		<span class=" text-slate-400">Modificar</span>
	</div>
	<select
		bind:value={constantSelected}
		class="p-2 rounded-md bg-white border w-44 truncate overflow-hidden whitespace-nowrap">
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
			<thead class="w-full bg-gray-200 text-gray-700">
				<tr>
					<th>ID</th>
					<th>Descripción</th>
					<th>Material</th>
					<th>Ancho</th>
					<th>Alto</th>
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
					<tr
						onclick={() => {
							openEditTipoModal(tipo);
						}}
						class=" hover:bg-gray-200">
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
	{/if}

	<!-- editTipo Modal -->
	{#if editTipoModal}
		<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white rounded-lg shadow-xl p-8">
				<!-- Botón de cierre -->
				<div class="flex justify-end">
					<button
						onclick={closeEditTipoModal}
						class="text-gray-500 hover:text-gray-800 font-bold text-lg iconify mdi--close size-6"
						aria-label="X">
					</button>
				</div>

				<p class="w-full text-xl text-center font-bold">Modificar Tipo</p>

				<!-- Contenido del modal -->
				<div class="flex flex-col gap-2 text-center mt-2 items-center">
					<table>
						<thead class="w-full bg-gray-200 text-gray-700">
							<tr>
								<th>ID</th>
								<th>Descripción</th>
								<th>Material</th>
								<th>Ancho</th>
								<th>Alto</th>
								<th>Cant. cristal</th>
								<th>% Quincallería</th>
								<th>Largo perfil</th>
								<th>Mínimo</th>
								<th>Máximo</th>
								<th>Ganancia</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="border">{tipoSelected.id_tipo}</td>
								<td class="border">{tipoSelected.descripcion_tipo}</td>
								<td class="border">{tipoSelected.id_material}</td>
								<td class="border"
									><input
										type="text"
										bind:value={tipoSelected.formula_ancho}
										placeholder="Fórmula ancho" /></td>
								<td class="border"
									><input
										type="text"
										bind:value={tipoSelected.formula_alto}
										placeholder="Fórmula alto" /></td>
								<td class="border"
									><input
										type="text"
										bind:value={tipoSelected.cantidad_cristal}
										placeholder="Cantidad cristal" /></td>
								<td class="border"
									><input
										type="number"
										bind:value={tipoSelected.porcentaje_quinc}
										placeholder="% Quincallería" /></td>
								<td class="border"
									><input
										type="number"
										bind:value={tipoSelected.largo_perfil}
										placeholder="Largo perfil" /></td>
								<td class="border"
									><input
										type="number"
										bind:value={tipoSelected.minimo}
										placeholder="Mínimo" /></td>
								<td class="border"
									><input
										type="number"
										bind:value={tipoSelected.maximo}
										placeholder="Máximo" /></td>
								<td class="border"
									><input
										type="number"
										bind:value={tipoSelected.ganancia}
										placeholder="Ganancia" /></td>
							</tr>
						</tbody>
					</table>

					<!-- Botón para realizar otra acción o cerrar -->
					<button
						onclick={editTipo}
						class="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-500">
						Guardar cambios
					</button>
				</div>
			</div>
		</div>
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
