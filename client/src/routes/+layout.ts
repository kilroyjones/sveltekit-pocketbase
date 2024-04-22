// Run client side only as we need access to the cookie
export const ssr = false;

// Modules
import { pb } from '$lib/db/client';

// Types and constants
import type { LayoutLoad } from './$types';

/**
 * Loads cookie as per pocketbase's requirements for auth
 */
export const load: LayoutLoad = async () => {
	pb.authStore.loadFromCookie(document.cookie);
	pb.authStore.onChange(() => {
		document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
	}, true);
};
