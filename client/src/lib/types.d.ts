export type User = {
	email: string;
	password: string;
};

export type RegisterUser = {
	username: string;
	email: string;
	password: string;
	passwordConfirm: string;
};

export type ErrorRegisterUser = {
	username?: string;
	email?: string;
	password?: string;
	passwordConfirm?: string;
};

export type ErrorLoginUser = {
	email?: string;
	password?: string;
};

export type FormErrors = Record<string, string>;

export type ErrorDetails = {
	code: number;
	message: string;
	data: Record<string, { code: string; message: string }>;
};
