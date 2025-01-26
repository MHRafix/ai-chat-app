export interface IUser {
	_id: string;
	name: string;
	email: string;
}

export interface ISigninPayload {
	email: string;
	password: string;
}

export interface ISignupPayload extends ISigninPayload {
	name: string;
}

export interface IAuthResponse {
	_id: string;
	token: string;
}
