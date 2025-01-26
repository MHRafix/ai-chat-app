import { IChatMessage } from '@/app/page';
import { AxiosInstance } from 'axios';
import httpReq from '../axios.config';
import { IChat } from '../types-model/chat.type';

class ChatApiRepository {
	constructor(private httpReq: AxiosInstance) {}

	/**
	 * chat create api
	 * @param payload
	 * @returns
	 */
	createChat(payload: { user: string; chatMessages: IChatMessage[] }) {
		return this.httpReq.post<IChat>(`/chat/create-chat`, payload);
	}

	/**
	 * get user chat api
	 * @param payload
	 * @returns
	 */
	async getUserChats(userId: string) {
		const res = await this.httpReq.get<IChat[]>(
			`/chat/get-all-chats/${userId}`
		);
		return res?.data;
	}

	/**
	 * update chat api
	 * @param payload
	 * @returns
	 */
	async updateChat(chatId: string, payload: any) {
		const res = await this.httpReq.put<any>(`/chat/${chatId}`, payload);
		return res;
	}

	/**
	 * chat delete api
	 * @param chatId string
	 * @returns
	 */
	deleteChat(chatId: string) {
		return this.httpReq.delete<{ isSuccess: Boolean }>(`/chat/${chatId}`);
	}
}

const chatApiRepository = new ChatApiRepository(httpReq);
export default chatApiRepository;
