/**
 * Modified from: https://github.com/jianyuan/pocketbase-sveltekit-auth/
 */
import PocketBase from 'pocketbase';

//  Type and variables
import type { Handle } from '@sveltejs/kit';
import { PUBLIC_DATABASE_URL } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pocketbase = new PocketBase(PUBLIC_DATABASE_URL);
	event.locals.pocketbase.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	/**
	 *
	 */
	try {
		if (event.locals.pocketbase.authStore.isValid) {
			await event.locals.pocketbase.collection('users').authRefresh();
		}
		event.locals.user = structuredClone(event.locals.pocketbase.authStore.model);
	} catch (__error: any) {
		event.locals.pocketbase.authStore.clear();
		event.locals.user = null;
	}

	const response = await resolve(event);
	const expires = new Date();

	// Set expiration time on the cookie
	expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24 * 7);

	response.headers.append(
		'set-cookie',
		event.locals.pocketbase.authStore.exportToCookie({ secure: true, expires, sameSite: 'none' })
	);

	return response;
};
