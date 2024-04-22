// Modules
import { get, writable } from 'svelte/store';

// Types and variabless
import type { User } from '$lib/types';

export const user = writable<User | undefined>();
