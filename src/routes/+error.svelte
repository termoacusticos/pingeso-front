<script lang="ts">
	import { page } from '$app/stores';
</script>

<div
	class="flex flex-col mx-auto my-32 gap-7 bg-white justify-center items-center p-7 rounded-lg w-fit">
	<h1 class="text-4xl">Ocurrió un problema!</h1>
	<p class="text-2xl">{$page.status} - {$page.error?.message}</p>
</div>
