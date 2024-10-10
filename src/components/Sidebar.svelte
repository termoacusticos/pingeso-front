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
	<ul class="space-y-4 p-4 pt-12">
		<SidebarElement isExpanded={isExpanded} href="/home" buttonName="Inicio" dPath="M4 21V9l8-6l8 6v12h-6v-7h-4v7z"/>
        <SidebarElement isExpanded={isExpanded} href="/home/cotizar" buttonName="Cotizar" dPath="M14.59 2.59c-.38-.38-.89-.59-1.42-.59H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8.83c0-.53-.21-1.04-.59-1.41zM15 16h-2v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H9c-.55 0-1-.45-1-1s.45-1 1-1h2v-2c0-.55.45-1 1-1s1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1m-2-8V3.5L18.5 9H14c-.55 0-1-.45-1-1"/>
        <SidebarElement isExpanded={isExpanded} href="/home/tabla" buttonName="Modificar" dPath="M4 8h16V5H4zm10 11v-9h-4v9zm2 0h4v-9h-4zm-8 0v-9H4v9zM3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1"/>
        <SidebarElement isExpanded={isExpanded} href="/home/configurar" buttonName="Configuración" dPath="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23a.987.987 0 0 0-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41a7.3 7.3 0 0 0 0 1.35l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68m-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5"/>
	</ul>
</div>
