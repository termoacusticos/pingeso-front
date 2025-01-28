<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		itemSelected: string;
		columna: string;
		items: string[];
		showDropdown: boolean;
		onSelectItem: any;
	}

	let {
		itemSelected = $bindable(''),
		columna,
		items,
		showDropdown = $bindable(),
		onSelectItem
	}: Props = $props();

	let dropdownElement: HTMLElement | null = null;

	function toggleDropdown() {
		showDropdown = !showDropdown;
	}

	function selectItem(item: string) {
		itemSelected = item;
		showDropdown = !showDropdown;
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
			showDropdown = false; // Cierra el dropdown si el clic está fuera del componente
		}
	}

	// Agrega y elimina el evento de clic global
	onMount(() => {
		document.addEventListener('click', handleClickOutside);
	});

	onDestroy(() => {
		document.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="relative h-fit my-auto flex flex-row sm:mx-0 bg-inherit rounded-lg z-20 w-full"
	bind:this={dropdownElement}>
	<button
		class="flex flex-row h-fit my-auto items-center transition-all text-base hover:bg-opacity-45 bg-white bg-opacity-25 rounded-lg px-2 py-1"
		onclick={toggleDropdown}>
		{columna}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="ml-1"
			width="1em"
			height="1em"
			viewBox="0 0 1024 1024"
			><path
				fill="black"
				d="M831.872 340.864L512 652.672L192.128 340.864a30.59 30.59 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.59 30.59 0 0 0-42.752 0z" /></svg>
	</button>
	<div
		class=" absolute w-full shadow flex flex-col bg-white top-0 left-20 {showDropdown
			? 'block'
			: 'hidden'}">
		{#each items as item}
			<button
				class=" hover:bg-slate-200 p-2"
				onclick={() => {
					selectItem(item);
					onSelectItem();
				}}
				aria-label={item}>{item}</button>
		{/each}
	</div>
</div>
