import { IChatMessage } from '@/app/page';
import SystemAvatar from '@/assets/chatgptlogo2.png';
import UserAvatar from '@/assets/nouserlogo.png';
import Image from 'next/image';
import React from 'react';

const MessageCard: React.FC<{ message: IChatMessage }> = ({ message }) => {
	return (
		<div
			className={
				message?.role === 'user'
					? `!w-full bg-[#71f5cd4b] p-3 rounded-md my-5`
					: `!w-full bg-[#ffffff] my-5 p-3 rounded-md`
			}
		>
			<div
				className={`flex ${
					message.role === 'user' ? 'items-center' : 'items-start'
				} `}
			>
				<div className='flex-shrink-0'>
					<Image
						className='rounded-full w-10 h-10'
						src={message.role === 'user' ? UserAvatar : SystemAvatar}
						alt='user'
						width={30}
						height={30}
					/>
				</div>
				<div className='ml-3'>
					<p className='text-lg font-medium text-slate-700'>
						{message?.content}
					</p>
				</div>
			</div>
		</div>
	);
};

export default MessageCard;
