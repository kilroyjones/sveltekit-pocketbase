// Modules and libraries
import { redirect } from '@sveltejs/kit';

// Types and constants
import type { Actions } from '@sveltejs/kit';

/**
 * Clears the autStore and redirects to the home page
 */
export const actions = {
	default: async ({ locals }) => {
		locals.pocketbase.authStore.clear();
		locals.user = null;
		throw redirect(302, '/');
	}
} satisfies Actions;
