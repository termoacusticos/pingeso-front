<script lang="ts">
	import { preventDefault } from 'svelte/legacy';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let valor = 0;

	console.log('==== data.saludo ====');
	console.log(data.saludo);

	let usuario = $state('');
	let password = $state('');

	function handleSubmit() {}
</script>

<div class="flex flex-col w-full h-full gap-4 my-10 justify-center bg-teal-700 animate-fade-up">
	<img
		class=" object-contain h-20"
		src="/src/public/img/logo_termo.png"
		alt="Termoacústicos logo" />
	<p class="w-full text-center text-white font-light text-xl">Bienvenido!</p>
	<div class="flex flex-col mx-auto gap-7 bg-white justify-center items-center p-7 rounded-lg">
		<p class=" font-bold text-xl">Sistema de Cotización</p>
		<form
			class="flex flex-col gap-2"
			onsubmit={preventDefault(handleSubmit)}
			action=""
			method="post">
			<div>
				<label class=" text-slate-600 text-sm" for="">Usuario</label>
				<input
					class="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					bind:value={usuario}
					type="text"
					placeholder="Usuario" />
			</div>
			<div>
				<label class=" text-slate-600 text-sm" for="">Contraseña</label>
				<input
					class="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					bind:value={password}
					type="password"
					placeholder="Contraseña" />
			</div>
			<a class="flex w-full" href="/home"
				><button
					type="submit"
					class="w-full h-full bg-amber-500 hover:bg-amber-400 rounded-lg py-2 px-3 text-white font-bold mt-2"
					>Ingresar</button
				></a>
		</form>
	</div>
</div>
