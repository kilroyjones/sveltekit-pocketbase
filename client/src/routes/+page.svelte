<script lang="ts">
	import { goto } from '$app/navigation';
	import { isLoggedIn } from '$lib/stores/user.store';
</script>

<div class="min-h-screen hero bg-base-200 md:-mt-20 lg:-mt-20">
	<div class="text-center hero-content">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Welcome!</h1>
			<p class="py-6">Put some site information here and talk about yourself!</p>
			{#if $isLoggedIn == false}
				<button class="btn btn-primary" on:click={() => goto('/account/register')}>Register</button>
			{:else}
				<button class="btn btn-primary" on:click={() => goto('/account/profile')}>Profile</button>
			{/if}
		</div>
	</div>
</div>
