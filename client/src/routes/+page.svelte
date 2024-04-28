<script lang="ts">
	// Modules
	import { goto } from '$app/navigation';

	// Types and variables
	import { user } from '$lib/stores/user.store';
</script>

<div class="min-h-screen hero md:-mt-20 lg:-mt-20">
	<div class="text-center hero-content">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Welcome!</h1>
			<p class="py-6">Put some site information here!</p>
			{#if $user}
				<button class="btn btn-primary" on:click={() => goto('/account/profile')}>Profile</button>
			{:else}
				<button class="mr-4 btn btn-primary" on:click={() => goto('/account/login')}>Login</button>
				<button class="btn btn-primary" on:click={() => goto('/account/register')}>Register</button>
			{/if}
		</div>
	</div>
</div>
