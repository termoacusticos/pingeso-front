<script lang="ts">
	import type { ImageGroup } from '$lib/types';
	import type { Color, Cristal, Imagen, Material, Tipo } from '@prisma/client';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();

	let constantSelected = $state('');
	let constantes = ['Materiales', 'Cristales', 'Tipos', 'Imágenes', 'Colores'];

	let successModal = $state(false);
	let editTipoModal = $state(false);
	let editCristalModal = $state(false);
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

	let cristalSelected: Cristal = $state({
		id_cristal: -1,
		desc_cristal: '',
		precio_cristal: -1
	})

	let materiales: Material[] = data.materiales;
	let tipos: Tipo[] = $state(data.tipos);
	let cristales: Cristal[] = data.cristales;
	let colores: Color[] = data.colores;
	let imagenes: ImageGroup[] = $state(data.imagenes);
	let imagenNueva: Imagen = $state({ bytes: '', id_imagen: 0, img_group: 1 });

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

	function openEditCristalModal(cristal: Cristal) {
		editCristalModal = true;
	}

	function closeEditCristalModal() {
		editCristalModal = false;
	}

	function cerrarSuccessModal() {
		successModal = false;
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
				editTipoModal = false;
				successModal = true;
				console.log('Respuesta del servidor:', data);
			})
			.catch((error) => {
				console.error('Error durante la solicitud:', error);
			});
	}

	function editCristal() {
		let bodyReq = {
			id: cristalSelected.id_cristal,
			cristal: cristalSelected
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
				editTipoModal = false;
				successModal = true;
				console.log('Respuesta del servidor:', data);
			})
			.catch((error) => {
				console.error('Error durante la solicitud:', error);
			});
	}

	const handleImageUpload = async (event: Event) => {
		const files = (event.target as HTMLInputElement)?.files;
		if (files) {
			for (const file of Array.from(files)) {
				const reader = new FileReader();
				reader.onload = (e) => {
					if (e.target?.result) {
						imagenNueva.bytes = e.target.result.toString();
					}
				};
				reader.readAsDataURL(file);
			}
		}
	};

	async function handleImagePost(img_group: number) {
		imagenNueva.img_group = img_group;
		console.log(imagenNueva);

		await fetch('/api/imagenes', {
			method: 'POST',
			body: JSON.stringify(imagenNueva)
		}).then((response) => {
			return response.json();
		});
		imagenNueva.bytes = '';
		imagenes = await fetch('/api/imagenes', {
			method: 'GET'
		}).then((response) => {
			return response.json();
		});
	}

	async function handleImageDelete(idx: number, imgIdx: number) {
		await fetch('/api/imagenes', {
			method: 'DELETE',
			body: JSON.stringify({ id_imagen: imagenes[idx].imagenes[imgIdx].id_imagen })
		}).then((response) => {
			return response.json();
		});
		imagenes = await fetch('/api/imagenes', {
			method: 'GET'
		}).then((response) => {
			return response.json();
		});
	}
</script>

<div
	class="min-h-screen w-full p-8 gap-5 flex flex-col bg-gray-100 2xl:w-[80%] xl:w-full lg:w-[50%] md:w-[70%] mx-auto overflow-scroll">
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
			<thead class="w-full bg-gray-200 text-gray-700">
				<tr>
					<th class="px-1 py-2">ID</th>
					<th>Nombre Material</th>
				</tr>
			</thead>
			<tbody class="w-full">
				{#each materiales as material}
					<tr onselect={() => {}} class=" hover:bg-gray-100">
						<td>{material.id_material}</td>
						<td>{material.nombre_material}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}

	{#if constantSelected == 'Cristales'}
		<table class="table-auto w-full rounded-lg bg-white shadow">
			<thead class="w-full bg-gray-200 text-gray-700 text-left">
				<tr>
					<th class="px-1 py-2">ID</th>
					<th>Descripción Cristal</th>
					<th>Precio</th>
				</tr>
			</thead>
			<tbody class="w-full">
				{#each cristales as cristal}
					<tr onselect={() => {}} class=" hover:bg-gray-100">
						<td class="px-1 py-1">{cristal.id_cristal}</td>
						<td>{cristal.desc_cristal}</td>
						<td>{formatoChileno(cristal.precio_cristal)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<button
			onselect={() => {}}
			class="w-full py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold">
			Agregar Cristal</button>
	{/if}

	{#if constantSelected == 'Tipos'}
		<table class="table-auto w-full rounded-lg bg-white shadow">
			<thead class="w-full bg-gray-200 text-gray-700">
				<tr>
					<th class="px-1 py-2">ID</th>
					<th class="px-1 py-2">Descripción</th>
					<th class="px-1 py-2 text-left">Material</th>
					<th class="px-1 py-2 text-left">Ancho</th>
					<th class="px-1 py-2 text-left">Alto</th>
					<th class="px-1 py-2 text-left">Cantidad cristal</th>
					<th class="px-1 py-2 text-left">% Quincallería</th>
					<th class="px-1 py-2 text-left">Largo perfil</th>
					<th class="px-1 py-2 text-left">Mínimo</th>
					<th class="px-1 py-2 text-left">Máximo</th>
					<th class="px-1 py-2 text-left">Ganancia</th>
				</tr>
			</thead>
			<tbody class="w-full">
				{#each tipos as tipo}
					<tr
						onclick={() => {
							openEditTipoModal(tipo);
						}}
						class=" hover:bg-gray-100">
						<td class="px-1 py-1">{tipo.id_tipo}</td>
						<td class="px-1 py-1">{tipo.descripcion_tipo}</td>
						<td class="px-1 py-1">{tipo.id_material}</td>
						<td class="px-1 py-1">{tipo.formula_ancho}</td>
						<td class="px-1 py-1">{tipo.formula_alto}</td>
						<td class="px-1 py-1">{tipo.cantidad_cristal}</td>
						<td class="px-1 py-1">{tipo.porcentaje_quinc}</td>
						<td class="px-1 py-1">{tipo.largo_perfil}</td>
						<td class="px-1 py-1">{tipo.minimo}</td>
						<td class="px-1 py-1">{tipo.maximo}</td>
						<td class="px-1 py-1">{tipo.ganancia}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}

	<!-- editTipo Modal -->
	{#if editTipoModal}
	<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
		<div class="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-[80%]">
		  <!-- Botón de cierre -->
		  <div class="flex justify-end">
			<button
			  onclick={closeEditTipoModal}
			  class="text-gray-500 hover:text-gray-800 font-bold text-lg iconify mdi--close size-6"
			  aria-label="X">
			</button>
		  </div>
	  
		  <p class="w-full text-xl text-center font-bold">Modificar Tipo</p>
	  
		  <!-- Contenedor para la tabla con scroll horizontal -->
		  <div class="overflow-x-auto mt-4">
			<table class="table-fixed w-full border-collapse border border-gray-300">
			  <thead class="bg-gray-200 text-gray-700 w-full">
				<tr>
				  <th class="px-1 py-2 border w-16">ID</th>
				  <th class="border w-32">Descripción</th>
				  <th class="border w-32">Material</th>
				  <th class="border w-32">Ancho</th>
				  <th class="border w-32">Alto</th>
				  <th class="border min-w-28 w-28">Cant. cristal</th>
				  <th class="border w-20">% Quincallería</th>
				  <th class="border w-24">Largo perfil</th>
				  <th class="border w-32">Mínimo</th>
				  <th class="border w-32">Máximo</th>
				  <th class="border w-32">Ganancia</th>
				</tr>
			  </thead>
			  <tbody class="w-full">
				<tr>
				  <td class="border px-1 py-2">{tipoSelected.id_tipo}</td>
				  <td class="border line-clamp-0">{tipoSelected.descripcion_tipo}</td>
				  <td class="border">{tipoSelected.id_material}</td>
				  <td class="border">
					<input
					  type="text"
					  bind:value={tipoSelected.formula_ancho}
					  placeholder="Fórmula ancho"
					  class="w-full" />
				  </td>
				  <td class="border">
					<input
					  type="text"
					  bind:value={tipoSelected.formula_alto}
					  placeholder="Fórmula alto"
					  class="w-full" />
				  </td>
				  <td class="border">
					<input
					  type="text"
					  bind:value={tipoSelected.cantidad_cristal}
					  placeholder="Cantidad cristal"
					  class="w-full" />
				  </td>
				  <td class="border">
					<input
					  type="number"
					  bind:value={tipoSelected.porcentaje_quinc}
					  placeholder="% Quincallería"
					  class="w-full" />
				  </td>
				  <td class="border">
					<input
					  type="number"
					  bind:value={tipoSelected.largo_perfil}
					  placeholder="Largo perfil"
					  class="w-full" />
				  </td>
				  <td class="border">
					<input
					  type="number"
					  bind:value={tipoSelected.minimo}
					  placeholder="Mínimo" 
					  class="w-full"/>
				  </td>
				  <td class="border">
					<input
					  type="number"
					  bind:value={tipoSelected.maximo}
					  placeholder="Máximo"
					  class="w-full" />
				  </td>
				  <td class="border">
					<input
					  type="number"
					  bind:value={tipoSelected.ganancia}
					  placeholder="Ganancia"
					  class="w-full" />
				  </td>
				</tr>
			  </tbody>
			</table>
		  </div>
	  
		  <!-- Botón para guardar cambios -->
		  <button
			onclick={editTipo}
			class="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-500 mt-4">
			Guardar cambios
		  </button>
		</div>
	  </div>
	{/if}

	{#if successModal}
		<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white rounded-lg shadow-xl w-96 p-8">
				<!-- Botón de cierre -->
				<div class="flex justify-end">
					<button
						onclick={cerrarSuccessModal}
						class="text-gray-500 hover:text-gray-800 font-bold text-lg iconify mdi--close size-6"
						aria-label="X">
					</button>
				</div>

				<div class="w-full iconify mdi--success-circle bg-teal-500 size-16"></div>

				<!-- Contenido del modal -->
				<div class="flex flex-col gap-2 text-center mt-2 items-center">
					<h2 class="text-2xl font-extrabold text-gray-800">¡Éxito!</h2>
					<p class="text-gray-700">Modificación realizada correctamente</p>

					<!-- Botón para realizar otra acción o cerrar -->
					<button
						onclick={cerrarSuccessModal}
						class="bg-transparent text-gray-700 mt-2 w-fit font-medium py-2 px-4 rounded hover:underline">
						Cerrar
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

	{#if constantSelected == 'Imágenes'}
		<!-- Renderizar imágenes cargadas -->
		{#each imagenes as grupo, idx}
			<h1>Imágenes cabezal {idx + 1}:</h1>
			<div class="grid grid-rows-2">
				<div class="grid grid-cols-3 gap-4">
					{#each grupo.imagenes as img, imgIdx}
						<div>
							<button
								onclick={() => {
									handleImageDelete(idx, imgIdx);
								}}>X</button>
							<img src={img.bytes} alt={`Imagen cabezal ${idx + 1}-${imgIdx}`} />
						</div>
					{/each}
				</div>
				<div class="flex flex-col items-center gap-2 my-8 border">
					<h1 class="text-xl font-semibold">Agregar imagen nueva</h1>
					<input
						type="file"
						accept="image/*"
						onchange={async (e) => {
							await handleImageUpload(e);
							setTimeout(async () => {
								await handleImagePost(idx + 1);
							}, 1000);
						}}
						class="border border-gray-300 px-4 py-2 rounded focus:outline-none" />
				</div>
			</div>
		{/each}
	{/if}
</div>
