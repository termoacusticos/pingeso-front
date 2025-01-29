<script>
	import { goto } from '$app/navigation';
	import SidebarController from '$lib/components/SidebarController.svelte';
	import SidebarElement from '$lib/components/SidebarElement.svelte';

	const { is_admin } = $props();

	let isExpanded = $state(true);
</script>

<div class="bg-teal-600 text-white h-16 justify-evenly flex">
	<!--<SidebarController
		bind:isExpanded
		buttonName="Menú"
		icon="mdi--menu"
		click={() => {
			isExpanded = !isExpanded;
			console.log(isExpanded);
		}}></SidebarController>
	-->
	<SidebarElement {isExpanded} href="/home" buttonName="Inicio" icon="mdi--home" />
	<SidebarElement {isExpanded} href="/home/cotizar" buttonName="Cotizar" icon="mdi--document" />
	<SidebarElement {isExpanded} href="/home/historial" buttonName="Historial" icon="mdi--history" />
	{#if is_admin}
		<SidebarElement {isExpanded} href="/home/modificar" buttonName="Modificar" icon="mdi--edit" />
		<SidebarElement
			{isExpanded}
			href="/home/configurar"
			buttonName="Configuración"
			icon="mdi--cog" />
	{/if}
	<SidebarElement
		{isExpanded}
		onclick={async () => {
			await fetch('/api/login', {
				method: 'DELETE'
			});
			goto('/');
		}}
		buttonName="Cerrar Sesión"
		icon="mdi--door-open" />
</div>
