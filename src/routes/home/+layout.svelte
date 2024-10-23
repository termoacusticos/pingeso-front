<script>
	import Sidebar from '$lib/components/Sidebar.svelte';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div class="flex flex-row w-full bg-gray-100">
	<!-- <Navbar /> -->
	<Sidebar />
	{@render children?.()}
</div>
