'use client';

import MiniLogo from '@/assets/chatgptlogo.png';
import ChatInputForm from '@/components/custom/chat-page/ChatInputForm';
import MessageCard from '@/components/custom/chat-page/MessageCard';
import WelcomeMessage from '@/components/custom/chat-page/WelcomeMessage';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
	const [allMessages, setAllMessages] = useState<IChatMessage[]>([]); // chat messages

	return (
		<div className='w-full'>
			<div className='lg:w-12/12 h-[10vh] bg-[#ffffff] gap-2 flex justify-center items-center px-5'>
				<Image src={MiniLogo} alt='logo' width={65} height={65} />
				<p className='text-xl text-center font-extrabold'>Info Hacker</p>
			</div>
			<div
				className={`overflow-y-auto px-4 lg:w-10/12 mx-auto h-[75.5vh] flex justify-center ${
					allMessages?.length > 0 ? 'items-start' : 'items-center'
				}`}
			>
				{/* chat message list and welcome message */}
				{allMessages?.length > 0 ? (
					<div className='!w-full'>
						{allMessages.map((message: IChatMessage, index: number) => (
							<MessageCard key={index} message={message} />
						))}
					</div>
				) : (
					<WelcomeMessage />
				)}
			</div>

			{/* chat input form */}
			<ChatInputForm
				allMessages={allMessages}
				onChangeMessage={(messages: IChatMessage[]) => setAllMessages(messages)}
			/>
		</div>
	);
}

export interface IChatMessage {
	role: string;
	content: string;
}
