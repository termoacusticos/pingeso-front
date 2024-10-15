<script>
	import SidebarController from './SidebarController.svelte';
	import SidebarElement from './SidebarElement.svelte';

	let isExpanded = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="z-10 h-screen transition-all duration-300 ease-in-out bg-teal-600 text-white grow-0 overflow-hidden p-4"
	class:w-[4.5rem]={!isExpanded}
	class:w-[15rem]={isExpanded}
>
	<ul class="flex flex-col space-y-4 w-full">
		<SidebarController
			bind:isExpanded
			buttonName="Expandir"
			icon="mdi--menu"
			click={() => {
				isExpanded = !isExpanded;
				console.log(isExpanded);
			}}
		></SidebarController>
		<SidebarElement {isExpanded} href="/home" buttonName="Inicio" icon="mdi--home" />
		<SidebarElement {isExpanded} href="/home/cotizar" buttonName="Cotizar" icon="mdi--paper-add" />
		<SidebarElement {isExpanded} href="/home/tabla" buttonName="Modificar" icon="mdi--table" />
		<SidebarElement
			{isExpanded}
			href="/home/configurar"
			buttonName="Configuración"
			icon="mdi--settings"
		/>
	</ul>
</div>
