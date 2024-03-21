import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals }) => {
		console.log('HEREERWERFASDFSAD');
		locals.pb.authStore.clear();
		locals.user = null;
		console.log('redirect');
		throw redirect(301, '/');
	}
} satisfies Actions;
