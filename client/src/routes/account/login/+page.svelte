<script lang="ts">
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/db/client';
	// Types and constants
	import type { ActionResult } from '@sveltejs/kit';

	let email = 'al@al.com';
	let password = 'password';
	let error = '';

	const handleSubmit = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
		const formData = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'redirect') {
			// console.log('COOKIE', document.cookie);
			// pb.authStore.loadFromCookie(document.cookie);
			await invalidateAll();
			await applyAction(result);
		} else if (result.type == 'failure') {
			error = 'Invalid username or password';
		} else {
			// TODO handle other type coming back?
		}
	};

	const handleKeyboardInput = (event: KeyboardEvent) => {
		error = '';
	};
</script>

<div class="flex flex-col items-center justify-center min-h-screen -mt-20">
	<div class="w-full max-w-md px-8 py-6 mt-4 text-left">
		<h3 class="text-2xl font-bold text-center">Login</h3>
		<form action="?/login" class="gap-2 p-4 rounded form-control" on:submit={handleSubmit}>
			<div>
				<label for="email" class="block text-sm font-medium">Email</label>
				<input
					type="email"
					placeholder="Email"
					name="email"
					class="std-input-field"
					on:keydown={handleKeyboardInput}
					bind:value={email}
				/>
			</div>

			<div class="mt-4">
				<label for="password" class="block text-sm font-medium">Password</label>
				<input
					type="password"
					placeholder="Password"
					name="password"
					class="std-input-field"
					on:keydown={handleKeyboardInput}
					bind:value={password}
				/>
			</div>
			<div class="flex justify-center mt-2">
				<p class="std-input-error">{error}</p>
			</div>
			<div class="flex justify-center mt-1">
				<button class="px-6 py-2 leading-5 duration-200 transform rounded-md btn btn-primary"
					>Login</button
				>
			</div>
		</form>
	</div>
</div>

<style>
	/* You can add additional global styles if needed */
</style>
