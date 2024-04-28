// Modules and libraries
import { redirect } from '@sveltejs/kit';

// Types and constants
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/**
 * Check is the authStore exists or not.
 * @returns
 */
export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pocketbase.authStore.model) {
		return redirect(302, '/');
	}
};

/**
 * Form action which handles uploading the new avatar.
 * Redirects to errors if failed.
 */
export const actions = {
	updateAvatar: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData()) as { avatar: string };

		if (data.avatar && locals && locals.user) {
			const user = await locals.pocketbase.collection('users').update(locals.user.id, {
				avatar: data.avatar
			});

			throw redirect(307, '');
		}

		throw new Error('/errors');
	}
} satisfies Actions;
