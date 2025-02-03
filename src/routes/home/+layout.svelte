<script lang="ts">
	import type { Snippet } from 'svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { LayoutData } from './$types';

	interface Props {
		children: Snippet;
		data: LayoutData;
	}

	let { children, data }: Props = $props();
</script>

<div class="relative flex flex-col w-full bg-gray-100">
	<!-- <Navbar /> -->
	<Sidebar is_admin={data.is_admin} />
	{@render children()}
</div>
