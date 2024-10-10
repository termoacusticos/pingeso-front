<script lang="ts">
	export let isExpanded = false;
	export let buttonName;
	export let icon: string;
	export let href;
</script>

<a
	{href}
	class="flex flex-row space-x-2 items-center my-2 px-1 transition-all hover:bg-teal-500 rounded"
>
	<!-- sin este size 8 afuera, el icono salta un poco (?) -->
	<div class="size-8">
		<span class={'size-8 iconify ' + icon}> </span>
	</div>
	{#if isExpanded}
		<p class="flex w-full animate-fade">
			{buttonName}
		</p>
	{/if}
</a>
