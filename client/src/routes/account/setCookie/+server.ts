import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ locals, url, cookies }) => {
	const headers = new Headers({
		'Set-Cookie': `test=test; Path=/; HttpOnly; Secure; SameSite=Lax`,
		Location: '/account/register' // Redirect after setting the cookie
	});
	console.log('sadfasdf');
	return new Response(null, { status: 303, headers });
};
