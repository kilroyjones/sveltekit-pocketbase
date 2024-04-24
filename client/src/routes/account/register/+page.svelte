<script lang="ts">
	// Modules
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	// Compoents
	import Google from '$lib/components/svgs/Google.svelte';

	// Types and constants
	import type { ActionResult } from '@sveltejs/kit';
	import type { ErrorRegisterUser } from '$lib/types';
	import type { PageData } from './$types';

	let username = 'a';
	let email = 'ad@asdf';
	let password = 'adsf';
	let confirmPassword = 'asdfasdfasdf';
	let errors: ErrorRegisterUser = {};

	/**
	 *
	 * TODO: Use the data on authproviders from page.server.ts
	 * @param event
	 */
	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		try {
			const formData = new FormData(event.currentTarget);
			const response = await fetch(event.currentTarget.action, {
				method: 'POST',
				body: formData
			});
			const result: ActionResult = deserialize(await response.text());

			// Results which don't trigger the "catch", but still fail

			if (result.type == 'redirect') {
				await invalidateAll();
				await applyAction(result);
			} else if (result.type == 'failure') {
				errors = result.data as unknown as ErrorRegisterUser;
			} else {
				errors = { other: 'Error registering user.' };
			}
		} catch (error: any) {
			errors = { other: 'Error registering user.' };
		}
	}
</script>

<div class="flex flex-col items-center min-h-screen lg:mt-20 md:mt-20">
	<div class="w-full max-w-md px-8 py-6 text-center test rounded-xl bg-base-100">
		<h3 class="mt-4 mb-4 text-3xl font-bold text-center">Register</h3>

		<form
			action="?/email"
			class="gap-2 p-4 rounded form-control"
			method="POST"
			on:submit|preventDefault={handleSubmit}
		>
			<div>
				<label for="username" class="mb-1 std-input-label">Username</label>
				<input
					type="text"
					placeholder="Username"
					name="username"
					class="std-input-field"
					bind:value={username}
				/>
				<p class="mt-1 std-input-error">{errors.username || ''}</p>
			</div>

			<div>
				<label for="email" class="mb-1 std-input-label">Email</label>
				<input
					type="email"
					placeholder="Email"
					name="email"
					class="std-input-field"
					bind:value={email}
				/>
				<p class="mt-1 std-input-error">{errors.email || ''}</p>
			</div>

			<div>
				<label for="password" class="mb-1 std-input-label">Password</label>
				<input
					type="password"
					placeholder="Password"
					name="password"
					class="std-input-field"
					bind:value={password}
				/>
				<p class="mt-1 std-input-error">{errors.password || ''}</p>
			</div>

			<div>
				<label for="passwordConfirm" class="mb-1 std-input-label">Password confirmation</label>
				<input
					type="password"
					placeholder="Confirm Password"
					name="passwordConfirm"
					class="std-input-field"
					bind:value={confirmPassword}
				/>
				<p class="mt-1 std-input-error">{errors.passwordConfirm || ''}</p>
			</div>

			<div class="flex justify-center">
				<p class="mt-1 std-input-error">{errors.other || ''}</p>
			</div>

			<div class="flex justify-center">
				<button class="px-6 py-2 leading-5 std-input-button">Register</button>
			</div>

			<div class="pt-4">
				<hr />
			</div>

			<form
				action="?/google"
				class="gap-2 p-4 rounded form-control"
				method="POST"
				on:submit|preventDefault={handleSubmit}
			>
				<Google buttonText={'Register with Google'}></Google>
			</form>
		</form>
	</div>
</div>
