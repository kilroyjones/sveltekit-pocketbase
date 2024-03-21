<script lang="ts">
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import '../app.css';
	import { UserStore, isLoggedIn } from '$lib/stores/user.store';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	console.log('USER', data.user);
	$: UserStore.setState(data.user);
</script>

<Navbar isLoggedIn={$isLoggedIn}></Navbar>
<slot />
