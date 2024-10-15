<script lang="ts">
	export let isExpanded = false;
	export let buttonName;
	export let icon: string;
	export let click: () => void;
</script>

<button
	on:click={click}
	class="inline-flex space-x-2 items-center my-2 px-1 transition-all hover:bg-teal-500 rounded"
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
</button>
