// Modules
import { pb } from '$lib/db/client';
import { fail, redirect } from '@sveltejs/kit';

// Types and constants
import type { Actions } from './$types';
import type { FormErrors, ErrorDetails, RegisterUser, ErrorRegisterUser } from '$lib/types';

export const actions = {
	register: async ({ request }) => {
		const data = Object.fromEntries(await request.formData()) as RegisterUser;
		try {
			await pb.collection('users').create(data);
		} catch (err: any) {
			// Here we parse the response from pocketbase and match the form of the object
			// to the ErrorRegisterUser type which is used on the form to provide validation
			// information in case of errors.
			const errorDetails: ErrorDetails = err.response;
			const errors: ErrorRegisterUser = Object.entries(errorDetails.data).reduce<FormErrors>(
				(acc, [key, { message }]) => {
					acc[key] = message;
					return acc;
				},
				{} as ErrorRegisterUser
			);
			return fail(400, errors);
		}
		throw redirect(301, '/account/login');
	}
} satisfies Actions;
