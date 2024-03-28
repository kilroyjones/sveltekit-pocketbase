// Modules
import { get, writable } from 'svelte/store';

// Types and variabless
import type { AuthModel } from 'pocketbase';

export const user = writable<AuthModel | undefined>();

/**
 * Returns user or undefined
 */
export const getState = () => {
	return get(user);
};

/**
 * Returns username or undefined
 */
export const getUsername = () => {
	const currentUser = get(user);
	if (currentUser) {
		return currentUser.username;
	}
};

/**
 * Sets the current
 */
export const setState = (userData: AuthModel | undefined) => {
	user.set(userData);
};

export const UserStore = {
	setState,
	getState,
	getUsername
};
