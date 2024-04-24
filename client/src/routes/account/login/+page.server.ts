// Modules
import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';

// Types and constant
import type { Actions } from '@sveltejs/kit';
import type { ErrorDetails, ErrorLoginUser, FormErrors, UserLogin } from '$lib/types';
import type { PageServerLoad } from './$types';

/**
 * Checks if the authStore is valid
 * @returns
 */
export const load: PageServerLoad = async ({ locals }) => {
	if (locals.pocketbase.authStore.isValid) {
		throw redirect(302, '/');
	}
	return {};
};

export const actions = {
	/**
	 * Email and password auth.
	 *
	 * @param param0 (locals, request)
	 * @returns
	 */
	login: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData()) as UserLogin;

		try {
			await locals.pocketbase.collection('users').authWithPassword(data.email, data.password);
		} catch (err: any) {
			const errorDetails: ErrorDetails = err.response;
			// Here we parse the potential multiple errors that could occur and
			// package them up to be returned as errors.
			const errors: ErrorLoginUser = Object.entries(errorDetails.data).reduce<FormErrors>(
				(acc, [key, { message }]) => {
					acc[key] = message;
					return acc;
				},
				{} as ErrorLoginUser
			);
			return fail(400, errors);
		}

		// Runs if no failures
		throw redirect(307, '/');
	},

	/**
	 * Google OAuth2
	 *
	 * We get the provider from list of possible providers (set in Pocketbase) by
	 * name and then set the cookie. If valid, we concat Google's auth url with
	 * the redirect set in Google console as well as our provider name see
	 * /account/oauth/google route.
	 *
	 * @param param0
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
			// Redirects the user to Google's login
			throw redirect(302, provider.authUrl + env.REDIRECT_URL + provider.name);
		}

		throw redirect(302, '/errors');
	}
} satisfies Actions;
