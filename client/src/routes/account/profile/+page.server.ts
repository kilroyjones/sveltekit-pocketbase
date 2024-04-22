// Modules
import { pb } from '$lib/db/client';

// Types and constant
import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { ErrorDetails, ErrorLoginUser, FormErrors, UserLogin } from '$lib/types';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

// Types and constants

/**
 *
 * @returns
 */
export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pocketbase.authStore.model) {
		return redirect(303, '/');
	}
};

/**
 *
 */
export const actions = {
	updateAvatar: async ({ request }) => {
		const data = Object.fromEntries(await request.formData()) as UserLogin;

		try {
			await pb.collection('users').authWithPassword(data.email, data.password);
		} catch (err: any) {
			// Here we parse the response from pocketbase and match the form of the object
			// to the ErrorRegisterUser type which is used on the form to provide validation
			// information in case of errors.
			const errorDetails: ErrorDetails = err.response;
			const errors: ErrorLoginUser = Object.entries(errorDetails.data).reduce<FormErrors>(
				(acc, [key, { message }]) => {
					acc[key] = message;
					return acc;
				},
				{} as ErrorLoginUser
			);
			return fail(400, errors);
		}
		throw redirect(307, '/');
	}
} satisfies Actions;
