import { redirect } from '@sveltejs/kit';
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
		const res = await locals.pocketbase
			.collection('users')
			.authWithOAuth2Code(
				provider.name,
				url.searchParams.get('code') || '',
				provider.codeVerifier,
				env.REDIRECT_URL + provider.name
			);

		if (res.meta && res.record) {
			const user = await locals.pocketbase.collection('users').update(res.record.id, {
				avatarUrl: res.meta.avatarUrl,
				name: res.meta.name,
				username: res.meta.rawUser.given_name
			});

			if (user) {
				throw redirect(303, '/');
			}
		}
		throw redirect(303, '/account/error');
	} catch (error) {
		console.error(error);
		return redirect(303, '/');
	}
};
