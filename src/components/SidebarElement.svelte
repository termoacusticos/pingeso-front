<script>
	export let isExpanded = false;
	export let buttonName;
	export let dPath;
	export let href;

	function handleMouseEnter() {
		isExpanded = true;
	}

	function handleMouseLeave() {
		isExpanded = false;
	}
</script>

<li
			class="w-full h-full flex flex-row space-x-2 items-center my-2 px-1 transition-all hover:bg-teal-500 rounded"
		>
			<span class="h-full text-xl flex items-center">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path
						fill="white"
						d={dPath}
					/>
				</svg>
			</span>
			{#if isExpanded}
				<a href={href} class="flex w-full h-full animate-fade">
					<button class="w-full h-full text-left flex items-center justify-start">{buttonName}</button>
				</a>
			{/if}
		</li>

