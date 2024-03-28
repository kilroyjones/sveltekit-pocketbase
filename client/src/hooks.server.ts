/**
 * Source: https://github.com/jianyuan/pocketbase-sveltekit-auth/
 */

import { pb } from '$lib/db/client';
import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { PUBLIC_DATABASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('Hitting hooks');
	event.locals.pocketbase = new PocketBase(PUBLIC_DATABASE_URL);
	event.locals.pocketbase.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
		event.locals.pocketbase.authStore.isValid &&
			(await event.locals.pocketbase.collection('users').authRefresh());
		event.locals.user = structuredClone(event.locals.pocketbase.authStore.model);
	} catch (_) {
		// clear the auth store on failed refresh
		event.locals.pocketbase.authStore.clear();
		event.locals.user = null;
	}

	const response = await resolve(event);
	const expires = new Date();

	expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24 * 7);

	response.headers.append(
		'set-cookie',
		event.locals.pocketbase.authStore.exportToCookie({ secure: true, expires, sameSite: 'none' })
	);

	return response;
	// If the cookie exists, check if the token is still valid and if not the
	// clear it so the user will need to re-login.
	// try {
	// 	if (pb.authStore.isValid) {
	// 		await pb.collection('users').authRefresh();
	// 	}
	// } catch (_) {
	// 	pb.authStore.clear();
	// }

	// return response;
	// /**
	//  * We pass pb to used within *.server.ts files We pass user to be used within
	//  * layout.server.ts and subsequently layout.svelte and other files to identify
	//  * our user.
	//  */
	// event.locals.pb = pb;
	// event.locals.user = pb.authStore.model;

	// console.log('HOOKS', event.cookies.getAll());
	// // Pass the event through other middleware as need be
	// const response = await resolve(event);

	// /**
	//  * Pass the cookie back to the user or clear it if no longer valid
	//  * TODO:
	//  *  - Make sure secure
	//  */

	// response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({}));
	// if (event.locals.pb.authStore.isValid) {
	// } else {
	// 	response.headers.set(
	// 		'set-cookie',
	// 		event.locals.pb.authStore.exportToCookie({
	// 			sameSite: 'Lax',
	// 			maxAge: 0,
	// 			expires: new Date(0)
	// 		})
	// 	);
	// }

	return response;
};
