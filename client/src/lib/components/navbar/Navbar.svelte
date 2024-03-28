<script lang="ts">
	// Components
	import LoggedIn from './LoggedIn.svelte';
	import LoggedOut from './LoggedOut.svelte';
	import ToggleLightDarkMode from './ToggleLightDarkMode.svelte';

	// Types and variables
	import { user } from '$lib/stores/user.store';
</script>

<div class="navbar">
	<div class="flex-1">
		<a href="/" class="text-xl btn btn-ghost">templateUI</a>
		<div class="flex-none">
			<ToggleLightDarkMode></ToggleLightDarkMode>
		</div>
	</div>
	<div class="flex-none">
		{#if $user}
			<LoggedIn></LoggedIn>
		{:else}
			<LoggedOut></LoggedOut>
		{/if}
	</div>
</div>
