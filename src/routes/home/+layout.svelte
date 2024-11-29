<script lang="ts">
	import type { Snippet } from 'svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="relative flex flex-row w-full bg-gray-100">
	<!-- <Navbar /> -->
	<Sidebar />
	{@render children()}
</div>
