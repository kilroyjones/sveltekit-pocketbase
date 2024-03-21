<script lang="ts">
	// Modules
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	// Types and constants
	import type { ActionResult } from '@sveltejs/kit';
	import type { ErrorRegisterUser } from '$lib/types';

	let username = 'a';
	let email = 'ad@asdf';
	let password = 'adsf';
	let confirmPassword = 'asdfasdfasdf';
	let errors: ErrorRegisterUser = {};

	/**
	 *
	 */
	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const formData = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'redirect') {
			await invalidateAll();
			await applyAction(result);
		} else if (result.type == 'failure') {
			errors = result.data as unknown as ErrorRegisterUser;
		} else {
			// TODO handle other type coming back?
		}
	}
</script>

<div class="flex flex-col items-center min-h-screen lg:mt-20 md:mt-20">
	<div class="w-full max-w-md px-8 text-left">
		<h3 class="text-2xl font-bold text-center">Sign up</h3>
		<form
			action="?/register"
			class="gap-2 p-4 rounded form-control"
			method="POST"
			on:submit|preventDefault={handleSubmit}
		>
			<div>
				<label for="username" class="block text-sm font-medium">Username</label>
				<input
					type="text"
					placeholder="Username"
					name="username"
					class="std-input-field"
					bind:value={username}
				/>
				<p class="std-input-error">{errors.username || ''}</p>
			</div>

			<div>
				<label for="email" class="block text-sm font-medium">Email</label>
				<input
					type="email"
					placeholder="Email"
					name="email"
					class="std-input-field"
					bind:value={email}
				/>
				<p class="std-input-error">{errors.email || ''}</p>
			</div>
			<div>
				<label for="password" class="block text-sm font-medium">Password</label>
				<input
					type="password"
					placeholder="Password"
					name="password"
					class="std-input-field"
					bind:value={password}
				/>
				<p class="std-input-error">{errors.password || ''}</p>
			</div>

			<div>
				<label for="passwordConfirm" class="block text-sm font-medium">Password confirmation</label>
				<input
					type="password"
					placeholder="Confirm Password"
					name="passwordConfirm"
					class="std-input-field"
					bind:value={confirmPassword}
				/>
				<p class="std-input-error">{errors.passwordConfirm || ''}</p>
			</div>

			<div class="flex justify-center">
				<button class="px-6 py-2 leading-5 duration-200 transform rounded-md btn btn-primary"
					>Register</button
				>
			</div>
		</form>
	</div>
</div>
