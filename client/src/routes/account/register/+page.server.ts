// Modules
import { pb } from '$lib/db/client';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// Types and constants
import type { Actions, PageServerLoad } from './$types';
import type { AuthMethodsList } from 'pocketbase';
import type { ErrorDetails, ErrorRegisterUser, FormErrors, RegisterUser } from '$lib/types';

/**
 * Server load on registration checks if user is already logged in and redirects
 * to home page, otherwise returns auth providers if they exist.
 */
export const load: PageServerLoad = async ({ locals }) => {
	if (locals.pocketbase.authStore.model) {
		return redirect(303, '/');
	}

	const authMethods: AuthMethodsList = await locals.pocketbase
		.collection('users')
		.listAuthMethods();

	if (authMethods.authProviders.length == 0) {
		return { err: true, data: [] };
	}
	return { err: false, data: authMethods.authProviders };
};

/**
 * Registration action
 */
export const actions = {
	/**
	 * Email
	 */
	email: async ({ request }) => {
		const data = Object.fromEntries(await request.formData()) as RegisterUser;
		try {
			await pb.collection('users').create(data);
		} catch (err: any) {
			/**
			 * Parse the response from pocketbase and match the form of the object to
			 * the ErrorRegisterUser type which is used on the form to provide
			 * validation information in case of errors.
			 **/
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
	},

	/**
	 * Google (OAuth)
	 */
	google: async ({ locals, cookies }) => {
		const provider = (
			await locals.pocketbase.collection('users').listAuthMethods()
		).authProviders.find((p: any) => p.name === 'google');

		cookies.set('provider', JSON.stringify(provider), {
			httpOnly: true,
			path: `/`
		});

		if (provider) {
			throw redirect(303, provider?.authUrl + env.REDIRECT_URL + provider?.name);
		}
	}
} satisfies Actions;
