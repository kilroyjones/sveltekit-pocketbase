import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

/**
 * GET handler
 *
 * This handles the end of the login or registering with Google.
 *
 * 1. The provider information stored in the cookie is checked.
 * 2. We use the authWithOAuthCode function to complete the authorization.
 * 3. We then check if the resulting information exists and update the
 *    user information.
 *
 */
export const GET: RequestHandler = async ({ locals, url, cookies }) => {
	const provider = JSON.parse(cookies.get('provider') || '{}');

	if (provider.state !== url.searchParams.get('state')) {
		throw new Error("State parameters don't match");
	}

	try {
		/**
		 * After the user has been redirected to the Google login screen they'll be
		 * directed here and we complete the auth process.
		 */
		const result = await locals.pocketbase
			.collection('users')
			.authWithOAuth2Code(
				provider.name,
				url.searchParams.get('code') || '',
				provider.codeVerifier,
				env.REDIRECT_URL + provider.name
			);

		/**
		 * Pocketbase doesn't save all the data from Google so we add it here.
		 */
		if (result.meta && result.record) {
			let user = await locals.pocketbase.collection('users').update(result.record.id, {
				avatarUrl: result.meta.avatarUrl,
				name: result.meta.name,
				username: result.meta.rawUser.given_name
			});

			if (user == undefined) {
				throw error;
			}
		} else {
			throw error;
		}
	} catch (error) {
		return redirect(302, '/errors');
	}

	throw redirect(302, '/');
};
