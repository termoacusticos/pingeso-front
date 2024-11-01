<script>
	import SidebarController from '$lib/components/SidebarController.svelte';
	import SidebarElement from '$lib/components/SidebarElement.svelte';

	let isExpanded = $state(false);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="z-10 min-h-screen transition-all duration-300 ease-in-out bg-teal-600 text-white grow-0 overflow-hidden p-4"
	class:w-[4.5rem]={!isExpanded}
	class:w-[15rem]={isExpanded}>
	<ul class="flex flex-col space-y-4 w-full">
		<SidebarController
			bind:isExpanded
			buttonName="Expandir"
			icon="mdi--menu"
			click={() => {
				isExpanded = !isExpanded;
				console.log(isExpanded);
			}}></SidebarController>
		<SidebarElement {isExpanded} href="/home" buttonName="Inicio" icon="mdi--home" />
		<SidebarElement {isExpanded} href="/home/cotizar" buttonName="Cotizar" icon="mdi--document" />
		<SidebarElement {isExpanded} href="/home/tabla" buttonName="Modificar" icon="mdi--edit" />
		<SidebarElement
			{isExpanded}
			href="/home/configurar"
			buttonName="Configuración"
			icon="mdi--cog" />
	</ul>
</div>
