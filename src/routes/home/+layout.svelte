<script lang="ts">
	import type { Snippet } from 'svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	interface Props {
		children: Snippet;
		is_admin: boolean;
	}

	let { children, is_admin }: Props = $props();
</script>

<div class="relative flex flex-col w-full bg-gray-100">
	<!-- <Navbar /> -->
	<Sidebar {is_admin} />
	{@render children()}
</div>
