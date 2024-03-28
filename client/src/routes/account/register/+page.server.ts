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
export const load: PageServerLoad = async ({ cookies, locals }) => {
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

		console.log(provider?.authUrl + env.REDIRECT_URL + provider?.name);
		throw redirect(303, provider?.authUrl + env.REDIRECT_URL + provider?.name);
	}

	// logout: async ({ locals }) => {
	// 	await locals.pocketbase.authStore.clear();
	// 	throw redirect(303, '/login');
	// }
	// google: async ({ cookies, locals, url }) => {
	// 	cookies.set('test', 'test', { path: '/', httpOnly: true });
	// 	console.log('COOKIES', cookies.getAll());
	// 	// redirect(303, '/account/register');
	// 	throw redirect(303, '/account/setCookie');
	// }
} satisfies Actions;

// console.log('FIRST cookies', cookies.getAll());

// const authMethods = await locals.pb?.collection('users').listAuthMethods();
// const redirectURL = `${url.origin}/account/oauth/google`;

// // TODO: Change this to find Google in case multiple providers
// // TODO: Find out what state and provider are here?
// const googleAuthProvider = authMethods.authProviders[0];
// const state = googleAuthProvider.state;
// const verifier = googleAuthProvider.codeVerifier;
// const authProviderRedirect = `${googleAuthProvider.authUrl}${redirectURL}`;
// console.log(state, verifier, redirectURL);

// cookies.set('state', state, {
// 	secure: true,
// 	httpOnly: true,
// 	path: '/'
// });

// cookies.set('verifier', verifier, {
// 	secure: true,
// 	httpOnly: true,
// 	path: '/'
// });

// 	const provider = (await locals.pb.collection('users').listAuthMethods()).authProviders.find(
// 		(p: any) => p.name === 'google'
// 	);
// 	console.log('START:', cookies.getAll());
// 	// console.log('PROVIDER', provider);

// 	cookies.set('provider', JSON.stringify(provider), {
// 		secure: false,
// 		path: '/',
// 		sameSite: 'none'
// 	});

// 	console.log('SET:', cookies.getAll());

// 	if (provider) {
// 		console.log('redirecting');
// 		console.log(provider.authUrl, env.REDIRECT_URL, provider.name);
// 		// throw redirect(302, provider.authUrl + env.REDIRECT_URL + provider.name);
// 		return redirect(302, '/');
// 	}
// 	// TODO: throw other redirect on error
// },

// logout: async ({ locals }) => {
// 	console.log('asdfasdf');
// 	await locals.pb.authStore.clear();
// 	throw redirect(302, '/account/register');
