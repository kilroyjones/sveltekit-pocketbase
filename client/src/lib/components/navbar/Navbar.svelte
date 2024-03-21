<script lang="ts">
	import LoggedIn from './LoggedIn.svelte';
	import LoggedOut from './LoggedOut.svelte';
	import ToggleLightDarkMode from './ToggleLightDarkMode.svelte';

	export let isLoggedIn: boolean = false;
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="text-xl btn btn-ghost">templateUI</a>
		<div class="flex-none">
			<ToggleLightDarkMode></ToggleLightDarkMode>
		</div>
	</div>
	<div class="flex-none">
		{#if isLoggedIn}
			<LoggedIn></LoggedIn>
		{:else}
			<LoggedOut></LoggedOut>
		{/if}
	</div>
</div>
