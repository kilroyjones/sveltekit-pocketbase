// Modules
import { pb } from '$lib/db/client';

// Types and constant
import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { ErrorDetails, ErrorLoginUser, FormErrors, User } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
	if (pb.authStore.isValid) {
		console.log('Here logged');
		throw redirect(301, '/');
	}
	console.log('not logged');
	return {};
};

/**
 *
 */
export const actions = {
	login: async ({ request }) => {
		const data = Object.fromEntries(await request.formData()) as User;

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
		console.log('redirecting login');
		throw redirect(307, '/');
	}
} satisfies Actions;
