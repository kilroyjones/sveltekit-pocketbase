// Run client side only as we need access to the cookie
export const ssr = false;

// Modules
import { pb } from '$lib/db/client';
import { UserStore } from '$lib/stores/user.store';

// Types and constants
import type { LayoutLoad } from './$types';

/**
 * Loads cookie as per pocketbase's requirements for auth
 */
export const load: LayoutLoad = async () => {
	console.log('HOME', document.cookie);
	pb.authStore.loadFromCookie(document.cookie);
	pb.authStore.onChange(() => {
		document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
	}, true);
};
