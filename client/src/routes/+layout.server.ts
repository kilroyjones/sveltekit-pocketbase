import type { LayoutServerLoad } from './$types';

/**
 *
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
