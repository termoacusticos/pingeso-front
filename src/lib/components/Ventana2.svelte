<script lang="ts">
	interface Props {
		ventana: Ventana;
		index: number;
		mostrar_eliminar: boolean;
		eliminarVentana: (index: number) => void;
	}
  
	let { ventana = $bindable(), index, mostrar_eliminar, eliminarVentana }: Props = $props();

  const materialOptions = ["Madera", "Aluminio", "PVC"];
  const tipoOptions = ["Corredera", "Abatible", "Oscilobatiente"];
  const itemOptions = ["Ventana Simple", "Ventana Doble", "Ventana Termopanel"];
  const coloresOptions = ["Blanco", "Rojo", "Violeta"]
	
  function calculateTotal() {
      ventana.precio_total = ventana.cantidad * ventana.precio_unitario;
  }
</script>

<tr class="flex flex-row items-center py-2 px-4 border-b border-gray-200 space-x-4">
  <td class="text-lg text-gray-800">#{index + 1}</td>
  
  <!-- Material Selector -->
  <td class="w-full">
    <select bind:value={ventana.material} class="p-2 border rounded-md">
      {#each materialOptions as option}
        <option>{option}</option>
      {/each}
    </select>
  </td>
  
  <!-- Tipo Selector -->
  <td class="w-full">
    <select bind:value={ventana.tipo} class="p-2 border rounded-md">
      {#each tipoOptions as option}
        <option>{option}</option>
      {/each}
    </select>
  </td>
  
  <!-- Item Selector -->
  <td class="w-full">
    <select bind:value={ventana.item} class="p-2 border rounded-md">
      {#each itemOptions as option}
        <option>{option}</option>
      {/each}
    </select>
  </td>
  
  <!-- Cantidad Input -->
  <td class="w-full">
    <input type="number" bind:value={ventana.cantidad} min="1" class="p-2 border rounded-md w-16">
  </td>
  
  <!-- Color Input -->
  <td class="w-full">
    <select bind:value={ventana.color} class="p-2 border rounded-md">
      {#each coloresOptions as option}
        <option>{option}</option>
      {/each}
    </select>
  </td>
  
  <!-- Dimensiones Alto y Ancho -->
  <td class="w-full">
    <input type="number" bind:value={ventana.alto} min="0" class="p-2 border rounded-md w-16">
  </td>
  
  <td class="w-full">
    <input type="number" bind:value={ventana.ancho} min="0" class="p-2 border rounded-md w-16">
  </td>
  
  <!-- Precio Unitario -->
  <td class="w-full">
    <input type="number" bind:value={ventana.precio_unitario} min="0" class="p-2 border rounded-md w-24">
  </td>
  
  <!-- Precio Total -->
  <td class="w-full">
    <input type="number" value={ventana.precio_total} readonly class="p-2 border rounded-md w-24 bg-gray-100">
  </td>
  
  <!-- Delete Button -->
  <td class="w-full">
    {#if mostrar_eliminar}
      <button class="text-red-500" aria-label="delete" onclick={() => eliminarVentana(index)}>
        <span class="size-8 iconify mdi--delete align-middle"></span>
      </button>
    {:else}
      <span class="size-8 iconify mdi--delete opacity-30 align-middle"></span>
    {/if}
  </td>
</tr>