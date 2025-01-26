import { AxiosInstance } from 'axios';
import httpReq from '../axios.config';
import {
	IAuthResponse,
	ISigninPayload,
	ISignupPayload,
	IUser,
} from '../types-model/auth.types';

class AuthenticationApiRepository {
	constructor(private httpReq: AxiosInstance) {}

	/**
	 * signin api
	 * @param payload
	 * @returns
	 */
	signin(payload: ISigninPayload) {
		return this.httpReq.post<IAuthResponse>(`/user/login`, payload);
	}

	/**
	 * signup api
	 * @param payload
	 * @returns
	 */
	signup(payload: ISignupPayload) {
		return this.httpReq.post<IAuthResponse>(`/user/registration`, payload);
	}

	/**
	 * get loggedInUser api
	 * @param payload
	 * @returns
	 */
	async getLoggedInUser(userId: string) {
		return this.httpReq.get<IUser>(`/user/${userId}`);
	}
}

const authenticationApiRepository = new AuthenticationApiRepository(httpReq);
export default authenticationApiRepository;
