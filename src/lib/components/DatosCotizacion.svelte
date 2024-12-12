<script lang="ts">
	import type { ClienteUI } from "$lib/types";

    interface Props {
        cliente: ClienteUI;   
    }

    let { cliente = $bindable() }: Props = $props();
</script>

<div class="flex flex-col w-[50%] space-y-3 bg-white px-7 pt-7 pb-8 rounded-lg shadow">
    <h1 class="text-xl font-medium">Datos Cliente</h1>
    <div class="flex w-full gap-5">
        <input 
        type="text" 
        placeholder="Nombre del cliente" 
        class="px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        bind:value={cliente.nombre}>
        <input 
            type="text" 
            placeholder="RUT (sin puntos, con guión)" 
            maxlength="10"
            minlength="10"
            class="px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            bind:value={cliente.rut_cliente}>
    </div>
    <input 
        type="text" 
        placeholder="Correo electrónico" 
        class="px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        bind:value={cliente.email}>
    <input 
        type="text" 
        placeholder="Teléfono" 
        class="px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        bind:value={cliente.telefono}>
    <input 
        type="text" 
        placeholder="Dirección" 
        class="px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        bind:value={cliente.direccion}>
</div>
