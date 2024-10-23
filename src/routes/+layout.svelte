<script>
	import '../app.css';
	import Footer from '../lib/components/Footer.svelte';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<main>
	{@render children?.()}
</main>
<Footer />
