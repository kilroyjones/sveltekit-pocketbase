import type { LayoutServerLoad } from './$types';

/**
 *
 */
export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	return {
		user: locals.user
	};
};
