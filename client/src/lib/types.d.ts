// User types
export type RegisterUser = {
	username: string;
	email: string;
	password: string;
	passwordConfirm: string;
};

export type User = {
	username: string;
	email: string;
	avatarUrl: string?;
	avatar: string?;
};

export type UserLogin = {
	email: string;
	password: string;
};

// Form types
export type ErrorDetails = {
	code: number;
	message: string;
	data: Record<string, { code: string; message: string }>;
};

export type ErrorLoginUser = {
	email?: string;
	password?: string;
};

export type ErrorRegisterUser = {
	username?: string;
	email?: string;
	password?: string;
	passwordConfirm?: string;
	other?: string;
};

export type FormErrors = Record<string, string>;
