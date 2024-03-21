import type { AuthModel } from 'pocketbase';
import { get, writable } from 'svelte/store';

export const user = writable<AuthModel | undefined>();
export const isLoggedIn = writable<boolean>(false);

export const setState = (userData: AuthModel | undefined) => {
	user.set(userData);
	if (get(user) != undefined) {
		isLoggedIn.set(true);
	} else {
		isLoggedIn.set(false);
	}
};

export const getState = () => {
	return get(user);
};

export const getUsername = () => {
	const _user = get(user);
	if (_user) {
		return _user.username;
	}
};

export const UserStore = {
	setState,
	getState,
	getUsername
};
