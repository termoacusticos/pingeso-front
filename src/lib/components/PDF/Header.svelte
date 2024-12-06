<script lang="ts">
	const { cliente }: { cliente: ClienteEntity | undefined } = $props();
</script>

<div class="grid grid-cols-6 grid-rows-1 w-full gap-4 place-items-center">
	<img class="col-span-2" src="/logo_negro.png" alt="Termoacústicos" />
	<img class="col-span-3" src="/elige_expertos.png" alt="Expertos en aislación térmica" />
	<img class="" src="/barras.png" alt="Barra de calidad" />
</div>
<div class=" font-bold flex justify-between">
	<span>
		<p>TERMOPANEL SYSTEM LTDA</p>
		<p>77.323.478-7</p>
		<p>SANTA INES 01583, QUINTA NORMAL</p>
		<a class="text-blue-600" href="https://www.termoacusticos.cl">WWW.TERMOACUSTICOS.CL</a>
	</span>
	<span class="text-right">
		<p>ASESOR: ALEJANDRO GONZALEZ</p>
		<p>JEFE COMERCIAL</p>
		<p>+56 9 4963 7515</p>
		<a class="text-blue-600" href="mailto:contacto@termoacusticos.cl">CONTACTO@TERMOACUSTICOS.CL</a>
	</span>
</div>
<!--
<div class="grid grid-cols-3 grid-rows-1 w-full h-36 gap-4 place-items-center">
	<span class="bg-gray-500 h-full w-full"></span>
	<span class="bg-gray-500 h-full w-full"></span>
	<span class="bg-gray-500 h-full w-full"></span>
</div>
<div class=" font-bold">
	<p>SEÑOR(A): {cliente?.nombre ?? 'ERROR'}</p>
	<p>A CONTINUACIÓN ENTREGAMOS PROPUESTA PARA SU PROYECTO:</p>
</div>-->
