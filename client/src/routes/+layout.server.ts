import type { LayoutServerLoad } from './$types';

/**
 * If the user exists we pull the information and assign it to our store.
 */
export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.user) {
		return {
			user: {
				avatar: locals.user.avatar ? locals.user.avatar : undefined,
				avatarUrl: locals.user.avatarUrl ? locals.user.avatarUrl : undefined,
				email: locals.user.email,
				username: locals.user.username
			}
		};
	}
	return {};
};
