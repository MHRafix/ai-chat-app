import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const httpReq: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API, // api url
	withCredentials: true,
	headers: {
		'Content-type': 'application/json',
	},
});

httpReq.interceptors.request.use(
	(config: any) => {
		const userInfo = Cookies.get('user') && JSON.parse(Cookies.get('user')!);
		return {
			...config,
			headers: {
				...config.headers,
				Authorization: userInfo?.token ? `Bearer ${userInfo?.token}` : '',
			},
		};
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default httpReq;
