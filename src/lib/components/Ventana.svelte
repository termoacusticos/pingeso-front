<script lang="ts">
	interface Props {
		ventana: VentanaEntity;
		index: number;
		mostrar_eliminar: boolean;
		eliminarVentana: (index: number) => void;
	}
	let { ventana = $bindable(), index, mostrar_eliminar, eliminarVentana }: Props = $props();

	const tiposDeVentanas = ['Corrediza', 'Batiente', 'Fija', 'Oscilobatiente'];
	const tipoDeVidrios = ['Simple', 'Doble', 'Triple'];
</script>

<div class="bg-white p-4 rounded shadow space-y-4">
	<div class="flex justify-between items-center">
		<h2 class="text-lg font-semibold text-gray-800">Ventana {index + 1}</h2>
		{#if mostrar_eliminar}
			<button class="text-red-500 font-bold" onclick={() => eliminarVentana(index)}>
				Eliminar
			</button>
		{/if}
	</div>

	<!-- Seleccionar Tipo de Ventana -->
	<div>
		<label for="tipo" class="block text-sm font-medium text-gray-700">Tipo de Ventana</label>
		<select
			id="tipo"
			class="mt-1 block w-full p-2 border border-gray-300 rounded"
			bind:value={ventana.tipo}>
			<option value="">Seleccionar tipo</option>
			{#each tiposDeVentanas as tipo}
				<option value={tipo}>{tipo}</option>
			{/each}
		</select>
	</div>

	<!-- Ingresar Item-->
	<div class="flex space-x-4">
		<div class="w-full">
			<label for="item" class="block text-sm font-medium text-gray-700">Item</label>
			<input
				type="text"
				id="item"
				class="mt-1 block w-full p-2 border border-gray-300 rounded"
				bind:value={ventana.item} />
		</div>
	</div>

	<!-- Ingresar Cantidad -->
	<div class="flex space-x-4">
		<div class="w-full">
			<label for="cantidad" class="block text-sm font-medium text-gray-700">Cantidad</label>
			<input
				type="number"
				id="cantidad"
				class="mt-1 block w-full p-2 border border-gray-300 rounded"
				bind:value={ventana.cantidad} />
		</div>
	</div>

	<!-- Seleccionar Color -->
	<div>
		<label for="color" class="block text-sm font-medium text-gray-700">Vidrio</label>
		<select
			id="color"
			class="mt-1 block w-full p-2 border border-gray-300 rounded"
			bind:value={ventana.color}>
			<option value="">Seleccionar vidrio</option>
			{#each tipoDeVidrios as vidrio}
				<option value={vidrio}>{vidrio}</option>
			{/each}
		</select>
	</div>

	<!-- Medidas de la Ventana -->
	<div class="flex space-x-4">
		<div class="w-1/2">
			<label for="alto" class="block text-sm font-medium text-gray-700">Alto (cm)</label>
			<input
				type="number"
				id="alto"
				class="mt-1 block w-full p-2 border border-gray-300 rounded"
				bind:value={ventana.alto} />
		</div>
		<div class="w-1/2">
			<label for="ancho" class="block text-sm font-medium text-gray-700">Ancho (cm)</label>
			<input
				type="number"
				id="ancho"
				class="mt-1 block w-full p-2 border border-gray-300 rounded"
				bind:value={ventana.ancho} />
		</div>
	</div>

	<div class="flex space-x-4">
		<div class="w-full">
			<label for="precio" class="block text-sm font-medium text-gray-700">Precio</label>
			<input
				type="number"
				id="precio"
				class="mt-1 block w-full p-2 border border-gray-300 rounded"
				bind:value={ventana.precio} />
		</div>
	</div>
</div>

<div class="bg-white text-sm">
	<div class="flex flex-row items-center p-4 border-b border-gray-200 space-x-4">
		<p class="text-lg font-semibold text-gray-800">#{index + 1}</p>
		<!-- Material Selector -->
		<div>
			<select bind:value={ventana.material} class="p-2 border rounded-md">
				{#each materialOptions as option}
					<option>{option}</option>
				{/each}
			</select>
		</div>

		<!-- Tipo Selector -->
		<div>
			<select bind:value={ventana.tipo} class="p-2 border rounded-md">
				{#each tipoOptions as option}
					<option>{option}</option>
				{/each}
			</select>
		</div>

		<!-- Item Selector -->
		<div>
			<select bind:value={ventana.item} class="p-2 border rounded-md">
				{#each itemOptions as option}
					<option>{option}</option>
				{/each}
			</select>
		</div>

		<!-- Cantidad Input -->
		<div>
			<input
				type="number"
				bind:value={ventana.cantidad}
				min="1"
				class="p-2 border rounded-md w-16" />
		</div>

		<!-- Color Input -->
		<div>
			<select bind:value={ventana.color} class="p-2 border rounded-md">
				{#each coloresOptions as option}
					<option>{option}</option>
				{/each}
			</select>
		</div>

		<!-- Dimensiones Alto y Ancho -->
		<div>
			<input type="number" bind:value={ventana.alto} min="0" class="p-2 border rounded-md w-16" />
		</div>

		<div>
			<input type="number" bind:value={ventana.ancho} min="0" class="p-2 border rounded-md w-16" />
		</div>

		<!-- Precio Unitario -->
		<div>
			<input
				type="number"
				bind:value={ventana.precio_unitario}
				min="0"
				class="p-2 border rounded-md w-24" />
		</div>

		<!-- Precio Total -->
		<div>
			<input
				type="number"
				value={ventana.precio_total}
				readonly
				class="p-2 border rounded-md w-24 bg-gray-100" />
		</div>

		{#if mostrar_eliminar}
			<button class="text-red-500" aria-label="delete" onclick={() => eliminarVentana(index)}>
				<span class="size-8 iconify mdi--delete align-middle"></span>
			</button>
		{:else}
			<span class="size-8 iconify mdi--delete opacity-30"></span>
		{/if}
	</div>
</div>
