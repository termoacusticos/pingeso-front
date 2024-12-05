<script lang="ts">
	interface Props {
		isExpanded?: boolean;
		buttonName: any;
		icon: string;
		href?: string;
		onclick?: () => void;
	}

	let { isExpanded = false, buttonName, icon, href, onclick }: Props = $props();
</script>

{#if href}
	<a
		{href}
		class="inline-flex space-x-2 items-center my-2 px-1 transition-all hover:bg-teal-500 rounded">
		<!-- sin este size 8 afuera, el icono salta un poco (?) -->
		{@render contenido()}
	</a>
{:else}
	<button
		{onclick}
		class="inline-flex space-x-2 items-center my-2 px-1 transition-all hover:bg-teal-500 rounded">
		{@render contenido()}
	</button>{/if}

{#snippet contenido()}
	<div class="size-8">
		<span class={'size-8 iconify ' + icon}> </span>
	</div>
	{#if isExpanded}
		<p class="flex w-full animate-fade">
			{buttonName}
		</p>
	{/if}
{/snippet}
