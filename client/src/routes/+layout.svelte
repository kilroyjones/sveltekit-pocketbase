<script lang="ts">
	import '../app.css';

	// Modules
	import { user } from '$lib/stores/user.store';

	// Components
	import Navbar from '$lib/components/navbar/Navbar.svelte';

	// Types and variables
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	$: $user = data.user;
</script>

<div class="bg-base-300">
	<Navbar></Navbar>
	<slot />
</div>
