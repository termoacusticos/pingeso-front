<script lang="ts">
	import { goto } from '$app/navigation';
	import { materiales, colores, cristales, tipos } from '$lib/store.js';
	import type { Material } from '@prisma/client';
	const { data } = $props();
	let usuario = $state('');
	let password = $state('');
	let error = $state('');

	materiales.set(data.materiales);
	colores.set(data.colores);
	cristales.set(data.cristales);
	tipos.set(data.tipos);

	async function handleSubmit(event: Event) {
		event.preventDefault();
		error = '';

		if (!usuario || !password) {
			error = 'Por favor, complete todos los campos.';
			return;
		}

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: usuario, password })
			});

			if (!response.ok) {
				const { error: serverError } = (await response.json()) as { error: string };
				error = serverError || 'Error en el inicio de sesión.';
				return;
			}

			// const { token } = (await response.json()) as { token: string };
			// localStorage.setItem('authToken', token);
			goto('/home/historial'); // Redirige al usuario a la página principal
		} catch (err) {
			error = 'Hubo un problema con la solicitud.';
		}
	}
</script>

<div class="flex flex-row w-full h-screen gap-4 justify-center bg-teal-700">
	<img class="w-full object-cover h-screen" src="/termopaneles.png" alt="Termoacústicos logo" />

	<div class="flex flex-col w-full h-screen gap-4 my-10 justify-center bg-teal-700 animate-fade-up">
		<img class=" object-contain h-20" src="/logo_termo.png" alt="Termoacústicos logo" />
		<p class="w-full text-center text-white font-light text-xl">Bienvenido!</p>
		<div class="flex flex-col mx-auto gap-7 bg-white justify-center items-center p-7 rounded-lg">
			<p class=" font-bold text-xl">Sistema de Cotización</p>
			<form class="flex flex-col gap-2" onsubmit={handleSubmit}>
				<div>
					<label class=" text-slate-600 text-sm" for="usuario">Usuario</label>
					<input
						class="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						bind:value={usuario}
						id="usuario"
						type="text"
						placeholder="Usuario" />
				</div>
				<div>
					<label class=" text-slate-600 text-sm" for="password">Contraseña</label>
					<input
						class="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						bind:value={password}
						id="password"
						type="password"
						placeholder="Contraseña" />
				</div>
				<button
					type="submit"
					class="w-full h-full bg-amber-500 hover:bg-amber-400 rounded-lg py-2 px-3 text-white font-bold mt-2"
					>Ingresar</button>
			</form>
			{#if error}
				<p class="error">{error}</p>
			{/if}
		</div>
	</div>
</div>
