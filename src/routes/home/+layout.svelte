<script>
	import Navbar from '../../components/Navbar.svelte';
	import Sidebar from '../../components/Sidebar.svelte';
</script>

<div class="flex flex-row w-full bg-gray-100">
	<!-- <Navbar /> -->
	<Sidebar />
	<slot />
</div>
