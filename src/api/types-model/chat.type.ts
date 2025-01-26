import { IUser } from './auth.types';

export interface IChat {
	_id: string;
	user: IUser;
	chatMessages: IChatMessage[];
}

export interface IChatMessage {
	role: string;
	content: string;
}
