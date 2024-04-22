import type { RequestHandler } from './$types';

/**
 *
 * @param param0
 * @returns
 */
export const POST: RequestHandler = async ({ locals, request }) => {
	const req = await request.json();

	if (req.image && locals && locals.user) {
		const user = await locals.pocketbase.collection('users').update(locals.user.id, {
			avatar: req.image
		});

		return new Response('');
	}

	throw new Error('Error updating user');
};
