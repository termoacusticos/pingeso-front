<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let valor = 0;

	console.log('==== data.saludo ====');
	console.log(data.saludo);

	onMount(() => {
		console.log('==== EN EL BROWSER ====');
	});
</script>

<div class="p-4 m-6 bg-blue-600 hover:bg-red-300">{data.saludo}</div>

<button
	class="bg-green-300 p-4 m-[38px] active:scale-125 transition-transform"
	on:click={() => {
		console.log('==== JS EN EL BROWSER ====');
		valor++;
		console.log(valor);
	}}>{valor}</button
>
