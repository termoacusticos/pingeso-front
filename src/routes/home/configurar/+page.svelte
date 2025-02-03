<script lang="ts">
	import type { PageData } from './$types';
	import type { Usuario } from '@prisma/client';

	let correo: string = $state('');
	let contraseña: string = $state('');

	async function handleCrear() {
		const usuario: Usuario = { email: correo, id_usuario: 0, is_admin: 0, password: contraseña };
		const resp = await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify(usuario)
		}).then(async (resp) => {
			return await resp.json();
		});
		console.log(resp);
	}
</script>

<div class="w-1/2 items-center grid self-center gap-8 my-4">
	<h2 class="text-xl text-center">Agregar usuario</h2>
	<div class="grid grid-cols-2 w-full gap-y-4">
		<label for="email">Correo: </label>
		<input type="text" id="email" bind:value={correo} />
		<label for="password">Contraseña: </label>
		<input id="password" type="password" bind:value={contraseña} />
	</div>
	<button class="bg-blue-300 p-4 hover:bg-blue-200 rounded-md mx-auto" onclick={handleCrear}
		>Crear usuario</button>
</div>
