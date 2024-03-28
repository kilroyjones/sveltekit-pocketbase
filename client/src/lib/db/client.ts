/**
 * Opted for using a client imported as needed as opposed to importing via
 * locals within load functions. Still, this will only be used within
 * server-side files.
 *
 * TODO:
 * - Add url as env variable
 */
import { PUBLIC_DATABASE_URL } from '$env/static/public';

import PocketBase from 'pocketbase';

export const pb = new PocketBase(PUBLIC_DATABASE_URL);
