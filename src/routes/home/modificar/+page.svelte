<script lang="ts">
	import type { ImageGroup } from '$lib/types';
	import type { Color, Cristal, Imagen, Material, Perfil, Quincalleria, Tipo } from '@prisma/client';
	import { error } from '@sveltejs/kit';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();

	let constantSelected = $state('');
	let constantes = ['Materiales', 'Cristales', 'Tipos', 'Imágenes', 'Colores', 'Perfiles', 'Quincallerías'];

	let successModal = $state(false);
	let errorMessage = $state('');
	let editMaterialModal = $state(false);
	let editTipoModal = $state(false);
	let editCristalModal = $state(false);
	let addCristalModal = $state(false);
	let editColorModal = $state(false);
	let addColorModal = $state(false);

	let materialSelected: Material = $state({
		id_material: 0,
		nombre_material: '',
		texto_calidad: '',
		texto_termopanel: ''
	});

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
		id_cristal: 0,
		desc_cristal: '',
		precio_cristal: 0
	});
	let newCristal: Cristal = $state({
		id_cristal: -1,
		desc_cristal: '',
		precio_cristal: 0
	});

	let colorSelected: Color = $state({
		id_color: 0,
		nombre_color: ''
	});
	let newColor: Color = $state({
		id_color: -1,
		nombre_color: ''
	});

	let materiales: Material[] = $state(data.materiales);
	let tipos: Tipo[] = $state(data.tipos);
	let cristales: Cristal[] = $state(data.cristales);
	let colores: Color[] = $state(data.colores);
	let imagenes: ImageGroup[] = $state(data.imagenes);
	let imagenNueva: Imagen = $state({ bytes: '', id_imagen: 0, img_group: 1 });
	let perfiles: Perfil[] = $state(data.perfiles);
	let quincallerias: Quincalleria[] = $state(data.quincallerias);

	function formatoChileno(valor: number) {
		return new Intl.NumberFormat('es-CL', {
			style: 'currency',
			currency: 'CLP',
			minimumFractionDigits: 0
		}).format(valor);
	}

	function openEditMaterialModal(material: Material) {
		editMaterialModal = true;
		materialSelected = material;
	}

	function closeEditMaterialModal() {
		editMaterialModal = false;
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
		cristalSelected = cristal;
	}

	function closeEditCristalModal() {
		editCristalModal = false;
	}

	function openAddCristalModal() {
		addCristalModal = true;

		newCristal = {
			id_cristal: -1,
			desc_cristal: '',
			precio_cristal: 0
		};
		errorMessage = '';
	}

	function closeAddCristalModal() {
		addCristalModal = false;
		errorMessage = '';
	}

	function openEditColorModal(color: Color) {
		editColorModal = true;
		colorSelected = color;
	}

	function closeEditColorModal() {
		editColorModal = false;
	}

	function openAddColorModal() {
		addColorModal = true;

		newColor = {
			id_color: -1,
			nombre_color: ''
		};
		errorMessage = '';
	}

	function closeAddColorModal() {
		addColorModal = false;
		errorMessage = '';
	}

	function cerrarSuccessModal() {
		successModal = false;
	}

	function editMaterial() {
		let bodyReq = {
			id: materialSelected.id_material,
			materialData: materialSelected
		};

		fetch('/api/material', {
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
				editMaterialModal = false;
				successModal = true;
				console.log('Respuesta del servidor:', data);
			})
			.catch((error) => {
				console.error('Error durante la solicitud:', error);
			});
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
			cristalData: cristalSelected
		};

		fetch('/api/cristal', {
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
				editCristalModal = false;
				successModal = true;
				console.log('Respuesta del servidor:', data);
			})
			.catch((error) => {
				console.error('Error durante la solicitud:', error);
			});
	}

	function addCristal() {
		if (!newCristal.desc_cristal.trim()) {
			errorMessage = 'La descripción del cristal es requerida';
			return;
		}

		if (newCristal.precio_cristal <= 0) {
			errorMessage = 'El precio debe ser mayor a 0';
			return;
		}

		fetch('/api/cristal', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({cristalData: newCristal})
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
				}
				return response.json();
			})
			.then(async (data) => {
				// Update the crystals list with the new data
				cristales = [...cristales, data as Cristal];
				addCristalModal = false;
				successModal = true;
				console.log('Cristal agregado:', data);
			})
			.catch((error) => {
				errorMessage = 'Error al agregar el cristal. Por favor intente nuevamente.';
				console.error('Error durante la solicitud:', error);
			});
	}

	function editColor() {
		let bodyReq = {
			id: colorSelected.id_color,
			colorData: colorSelected
		};

		fetch('/api/color', {
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
				editColorModal = false;
				successModal = true;
				console.log('Respuesta del servidor:', data);
			})
			.catch((error) => {
				console.error('Error durante la solicitud:', error);
			});
	}

	function addColor() {
		if (!newColor.nombre_color.trim()) {
			errorMessage = 'El nombre del color es requerido';
			return;
		}

		fetch('/api/color', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({colorData: newColor})
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
				}
				return response.json();
			})
			.then(async (data) => {
				// Update the colors list with the new data
				colores = [...colores, data as Color];
				addColorModal = false;
				successModal = true;
				console.log('Color agregado:', data);
			})
			.catch((error) => {
				errorMessage = 'Error al agregar el color. Por favor intente nuevamente.';
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
					<th class="py-3 px-4 text-left">ID</th>
					<th class="py-3 px-4 text-left">Nombre Material</th>
					<th class="py-3 px-4 text-left">Calidad</th>
					<th class="py-3 px-4 text-left">Termopanel</th>
				</tr>
			</thead>
			<tbody class="w-full">
				{#each materiales as material}
					<tr
						onclick={() => {
							openEditMaterialModal(material);
						}}
						class=" hover:bg-gray-100">
						<td class="py-2 px-4 text-left">{material.id_material}</td>
						<td class="py-2 px-4 text-left">{material.nombre_material}</td>
						<td class="py-2 px-4 text-left">{material.texto_calidad}</td>
						<td class="py-2 px-4 text-left">{material.texto_termopanel}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}

	<!--editMaterial Modal-->
	{#if editMaterialModal}
		<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div class="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-[80%]">
				<!-- Botón de cierre -->
				<div class="flex justify-end">
					<button
						onclick={closeEditMaterialModal}
						class="text-gray-500 hover:text-gray-800 font-bold text-lg iconify mdi--close size-6"
						aria-label="X">
					</button>
				</div>
				<p class="w-full text-xl text-center font-bold">Modificar Material</p>

				<!-- Contenedor para la tabla con scroll horizontal -->
				<div class="overflow-x-auto mt-4">
					<table class="table-fixed w-full border-collapse border border-gray-300">
						<thead class="bg-gray-200 text-gray-700 w-full">
							<tr>
								<th class="px-1 py-2 border w-16">ID</th>
								<th class="border w-48">Nombre Material</th>
								<th class="border w-32">Calidad</th>
								<th class="border w-32">Termopanel</th>
							</tr>
						</thead>
						<tbody class="w-full">
							<tr>
								<td class="border px-1 py-2">{materialSelected.id_material}</td>
								<td class="border">
									<input
										type="text"
										bind:value={materialSelected.nombre_material}
										placeholder="Nombre del material"
										class="w-full" />
								</td>
								<td class="border">
									<input
										type="text"
										bind:value={materialSelected.texto_calidad}
										placeholder="Calidad"
										class="w-full" />
								</td>
								<td class="border">
									<input
										type="text"
										bind:value={materialSelected.texto_termopanel}
										placeholder="Termopanel"
										class="w-full" />
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- Botón para guardar cambios -->
				<button
					onclick={editMaterial}
					class="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-500 mt-4">
					Guardar cambios
				</button>
			</div>
		</div>
	{/if}

	{#if constantSelected == 'Cristales'}
		<table class="table-auto w-full rounded-lg bg-white shadow">
			<thead class="w-full bg-gray-200 text-gray-700 text-left">
				<tr>
					<th class="py-3 px-4 text-left">ID</th>
					<th class="py-3 px-4 text-left">Descripción Cristal</th>
					<th class="py-3 px-4 text-left">Precio</th>
				</tr>
			</thead>
			<tbody class="w-full">
				{#each cristales as cristal}
					<tr
						onclick={() => {
							openEditCristalModal(cristal);
						}}
						class=" hover:bg-gray-100">
						<td class="py-2 px-4 text-left">{cristal.id_cristal}</td>
						<td class="py-2 px-4 text-left">{cristal.desc_cristal}</td>
						<td class="py-2 px-4 text-left">{formatoChileno(cristal.precio_cristal)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<button
			onclick={() => {
				openAddCristalModal();
			}}
			class="w-full py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold">
			Agregar Cristal</button>
	{/if}

	<!-- editCristal Modal -->
	{#if editCristalModal}
		<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div class="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-[80%]">
				<!-- Close button -->
				<div class="flex justify-end">
					<button
						onclick={closeEditCristalModal}
						class="text-gray-500 hover:text-gray-800 font-bold text-lg iconify mdi--close size-6"
						aria-label="X">
					</button>
				</div>

				<p class="w-full text-xl text-center font-bold">Modificar Cristal</p>

				<!-- Contenedor para la tabla con scroll horizontal -->
				<div class="overflow-x-auto mt-4">
					<table class="table-fixed w-full border-collapse border border-gray-300">
						<thead class="bg-gray-200 text-gray-700 w-full">
							<tr>
								<th class="px-1 py-2 border w-16">ID</th>
								<th class="border w-48">Descripción Cristal</th>
								<th class="border w-32">Precio</th>
							</tr>
						</thead>
						<tbody class="w-full">
							<tr>
								<td class="border px-1 py-2">{cristalSelected.id_cristal}</td>
								<td class="border">
									<input
										type="text"
										bind:value={cristalSelected.desc_cristal}
										placeholder="Descripción cristal"
										class="w-full" />
								</td>
								<td class="border">
									<input
										type="number"
										bind:value={cristalSelected.precio_cristal}
										placeholder="Precio"
										class="w-full" />
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- Botón para guardar cambios -->
				<button
					onclick={editCristal}
					class="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-500 mt-4">
					Guardar cambios
				</button>
			</div>
		</div>
	{/if}

	<!-- addCristal Modal -->
	{#if addCristalModal}
		<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div class="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-[500px]">
				<!-- Close button -->
				<div class="flex justify-end">
					<button
						onclick={closeAddCristalModal}
						class="text-gray-500 hover:text-gray-800 font-bold text-lg iconify mdi--close size-6"
						aria-label="X">
					</button>
				</div>

				<p class="w-full text-xl text-center font-bold mb-6">Agregar Nuevo Cristal</p>

				<!-- Form container -->
				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-2">
						<label for="desc_cristal" class="font-medium text-gray-700"
							>Descripción del Cristal</label>
						<input
							type="text"
							id="desc_cristal"
							bind:value={newCristal.desc_cristal}
							placeholder="Ingrese la descripción"
							class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
					</div>

					<div class="flex flex-col gap-2">
						<label for="precio_cristal" class="font-medium text-gray-700">Precio</label>
						<input
							type="number"
							id="precio_cristal"
							bind:value={newCristal.precio_cristal}
							placeholder="Ingrese el precio"
							class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
					</div>

					<!-- Error message -->
					{#if errorMessage}
						<p class="text-red-500 text-sm">{errorMessage}</p>
					{/if}

					<!-- Save button -->
					<button
						onclick={addCristal}
						class="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-500 transition-colors mt-4">
						Agregar Cristal
					</button>
				</div>
			</div>
		</div>
	{/if}

	{#if constantSelected == 'Tipos'}
		<table class="table-auto w-full rounded-lg bg-white shadow">
			<thead class="w-full bg-gray-200 text-gray-700">
				<tr>
					<th class="px-2 py-3 text-left">ID</th>
					<th class="px-1 py-2 text-left">Descripción</th>
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
										class="w-full" />
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
			<thead class="w-full bg-gray-200 text-gray-700">
				<tr>
					<th class="py-3 px-4 text-left">ID</th>
					<th class="py-3 px-4 text-left">Nombre Color</th>
				</tr>
			</thead>
			<tbody class="w-full">
				{#each colores as color}
					<tr
						onclick={() => {
							openEditColorModal(color);
						}}
						class=" hover:bg-gray-100">
						<td class="py-2 px-4 text-left">{color.id_color}</td>
						<td class="py-2 px-4 text-left">{color.nombre_color}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<button
			onclick={() => {
				openAddColorModal();
			}}
			class="w-full bg-teal-600 hover:bg-teal-500 transition-all text-white rounded-lg font-bold">
			Agregar Color</button>
	{/if}

	<!-- editColor Modal -->
	{#if editColorModal}
		<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div class="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-[80%]">
				<!-- Close button -->
				<div class="flex justify-end">
					<button
						onclick={closeEditColorModal}
						class="text-gray-500 hover:text-gray-800 font-bold text-lg iconify mdi--close size-6"
						aria-label="X">
					</button>
				</div>

				<p class="w-full text-xl text-center font-bold">Modificar Color</p>

				<!-- Table container with horizontal scroll -->
				<div class="overflow-x-auto mt-4">
					<table class="table-fixed w-full border-collapse border border-gray-300">
						<thead class="bg-gray-200 text-gray-700 w-full">
							<tr>
								<th class="px-1 py-2 border w-16">ID</th>
								<th class="border w-48">Nombre Color</th>
							</tr>
						</thead>
						<tbody class="w-full">
							<tr>
								<td class="border px-1 py-2">{colorSelected.id_color}</td>
								<td class="border">
									<input
										type="text"
										bind:value={colorSelected.nombre_color}
										placeholder="Nombre del color"
										class="w-full" />
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- Save changes button -->
				<button
					onclick={editColor}
					class="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-500 mt-4">
					Guardar cambios
				</button>
			</div>
		</div>
	{/if}

	<!-- addColor Modal -->
	{#if addColorModal}
		<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div class="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-[500px]">
				<!-- Close button -->
				<div class="flex justify-end">
					<button
						onclick={closeAddColorModal}
						class="text-gray-500 hover:text-gray-800 font-bold text-lg iconify mdi--close size-6"
						aria-label="X">
					</button>
				</div>

				<p class="w-full text-xl text-center font-bold mb-6">Agregar Nuevo Color</p>

				<!-- Form container -->
				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-2">
						<label for="desc_cristal" class="font-medium text-gray-700"
							>Nombre del color</label>
						<input
							type="text"
							id="desc_cristal"
							bind:value={newColor.nombre_color}
							placeholder="Ingrese el nombre"
							class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
					</div>

					<!-- Error message -->
					{#if errorMessage}
						<p class="text-red-500 text-sm">{errorMessage}</p>
					{/if}

					<!-- Save button -->
					<button
						onclick={addColor}
						class="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-500 transition-colors mt-4">
						Agregar Color
					</button>
				</div>
			</div>
		</div>
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

	<!--Tabla perfiles-->
	{#if constantSelected == 'Perfiles'}
		<table class="table-auto w-full rounded-lg bg-white shadow">
			<thead class="w-full bg-gray-200 text-gray-700">
				<tr>
					<th class="py-3 px-4 text-left">ID</th>
					<th class="py-3 px-4 text-left">Código Perfil</th>
					<th class="py-3 px-4 text-left">Dimensión</th>
					<th class="py-3 px-4 text-left">Cantidad</th>
					<th class="py-3 px-4 text-left">Kg/ml</th>
					<th class="py-3 px-4 text-left">Precio</th>
				</tr>
			</thead>
			<tbody class="w-full">
				{#each perfiles as perfil}
					<tr
						onselect={() => {}}
						class=" hover:bg-gray-100">
						<td class="py-2 px-4 text-left">{perfil.id_perfil}</td>
						<td class="py-2 px-4 text-left">{perfil.codigo_per}</td>
						<td class="py-2 px-4 text-left">{perfil.formula_dim}</td>
						<td class="py-2 px-4 text-left">{perfil.formula_cant}</td>
						<td class="py-2 px-4 text-left">{perfil.kg_ml_per}</td>
						<td class="py-2 px-4 text-left">{formatoChileno(perfil.valor)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
	<!--Tabla quincallerias-->
	{#if constantSelected == 'Quincallerías'}
		<table class="table-auto w-full rounded-lg bg-white shadow">
			<thead class="w-full bg-gray-200 text-gray-700">
				<tr>
					<th class="py-3 px-4 text-left">ID</th>
					<th class="py-3 px-4 text-left">Descripción</th>
					<th class="py-3 px-4 text-left">Fórmula</th>
					<th class="py-3 px-4 text-left">Precio</th>
				</tr>
			</thead>
			<tbody class="w-full">
				{#each quincallerias as quincalleria}
					<tr
						onselect={() => {}}
						class=" hover:bg-gray-100">
						<td class="py-2 px-4 text-left">{quincalleria.id_quincalleria}</td>
						<td class="py-2 px-4 text-left">{quincalleria.desc_quin}</td>
						<td class="py-2 px-4 text-left">{quincalleria.formula_quin}</td>
						<td class="py-2 px-4 text-left">{formatoChileno(quincalleria.precio_quin)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}

</div>
