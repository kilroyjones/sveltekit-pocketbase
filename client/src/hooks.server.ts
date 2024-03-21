/**
 * Source: https://github.com/jianyuan/pocketbase-sveltekit-auth/
 */

import { pb } from '$lib/db/client';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Check the request from the user to see if there is a cookie
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	// If the cookie exists, check if the token is still valid and if not the
	// clear it so the user will need to re-login.
	try {
		console.log(pb.authStore.isValid);
		if (pb.authStore.isValid) {
			await pb.collection('users').authRefresh();
		}
	} catch (_) {
		pb.authStore.clear();
	}

	/**
	 * We pass pb to used within *.server.ts files We pass user to be used within
	 * layout.server.ts and subsequently layout.svelte and other files to identify
	 * our user.
	 */
	event.locals.pb = pb;
	event.locals.user = pb.authStore.model;
	console.log('HOOKS', event.locals);

	// Pass the event through other middleware as need be
	const response = await resolve(event);

	/**
	 * Pass the cookie back to the user or clear it if no longer valid
	 * TODO:
	 *  - Make sure secure
	 */
	if (event.locals.pb.authStore.isValid) {
		response.headers.set(
			'set-cookie',
			event.locals.pb.authStore.exportToCookie({
				maxAge: 60 * 60 * 24 * 180
			})
		);
	} else {
		response.headers.set(
			'set-cookie',
			event.locals.pb.authStore.exportToCookie({
				maxAge: 0,
				expires: new Date(0)
			})
		);
	}

	return response;
};
