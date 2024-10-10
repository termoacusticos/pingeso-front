<script>
	import SidebarElement from './SidebarElement.svelte';

	let isExpanded = false;

	function handleMouseEnter() {
		isExpanded = true;
	}

	function handleMouseLeave() {
		isExpanded = false;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="fixed z-10 h-screen transition-all duration-300 ease-in-out bg-teal-600 text-white"
	class:w-16={!isExpanded}
	class:w-64={isExpanded}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	<ul class="space-y-4 p-4 pt-12 w-full">
		<SidebarElement {isExpanded} href="/home" buttonName="Inicio" icon="mdi--home" />
		<SidebarElement {isExpanded} href="/home/cotizar" buttonName="Cotizar" icon="mdi--home" />
		<SidebarElement {isExpanded} href="/home/tabla" buttonName="Modificar" icon="mdi--home" />
		<SidebarElement
			{isExpanded}
			href="/home/configurar"
			buttonName="Configuración"
			icon="mdi--home"
		/>
	</ul>
</div>
