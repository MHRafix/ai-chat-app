'use client';

import chatApiRepository from '@/api/repository/chat.repo';
import MiniLogo from '@/assets/chatgptlogo.png';
import ChatInputForm from '@/components/custom/chat-page/ChatInputForm';
import MessageCard from '@/components/custom/chat-page/MessageCard';
import WelcomeMessage from '@/components/custom/chat-page/WelcomeMessage';
import { AvatarFallback } from '@/components/shadcn-ui/avatar';
import { Button } from '@/components/shadcn-ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import { useGetSession } from '@/hooks/use-get-session';
import { Avatar } from '@radix-ui/react-avatar';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
	// chat messages
	const [allMessages, setAllMessages] = useState<IChatMessage[]>([]);

	// recent chat messages
	const [recentChats, setRecentChats] = useState<any[]>([]);

	// router
	const router = useRouter();

	// user session
	const { user } = useGetSession();

	// fetch logged in user chats
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['all-chats-of-user'],
		queryFn: () =>
			chatApiRepository
				.getUserChats(user?._id!)
				.then((res) => setRecentChats(res)),
		enabled: false,
	});

	// prevent continuous fetching
	useEffect(() => {
		if (user?.email) {
			refetch();
		}
	}, [user]);

	return (
		<div className='w-full'>
			<div className='bg-[#ffffff] '>
				{' '}
				<div className='lg:w-10/12 mx-auto h-[10vh] gap-2 flex justify-between items-center px-5'>
					<div className='flex justify-end items-center gap-2'>
						<Image src={MiniLogo} alt='logo' width={65} height={65} />
						<p className='text-xl text-center font-extrabold'>Info Hacker</p>
					</div>

					{user?.email ? (
						<div>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<Avatar>
										<AvatarFallback className='w-12 h-12 text-white text-lg bg-slate-600'>
											{user?.name?.slice(0, 2).toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={() => {
											router.push('/auth/signin');
											Cookies.remove('user');
										}}
									>
										Logout
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					) : (
						<Link href='/auth/signin'>
							<Button variant={'default'}>Login now</Button>
						</Link>
					)}
				</div>
			</div>
			<div
				className={`px-4 lg:w-10/12 mx-auto gap-5 h-[75.5vh] lg:flex justify-between ${
					allMessages?.length > 0 ? 'items-start' : 'items-center'
				}`}
			>
				{/* chat message list and welcome message */}
				<div
					className={`overflow-y-auto flex justify-center ${
						allMessages?.length > 0 ? 'items-start' : 'items-center'
					} lg:w-8/12 h-full`}
				>
					{' '}
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

				<div
					className={`overflow-y-auto flex justify-between items-start lg:w-3/12 bg-white m-5 p-5 rounded-md h-[96%]`}
				>
					<div className='w-full'>
						<h1 className='font-bold text-lg'>Recent chats</h1>
						<>
							{recentChats?.map((chats, idx: number) => (
								<div
									key={idx}
									className='py-3 px-2 font-bold rounded-md my-2 text-sm bg-slate-200 w-full'
								>
									{chats?.chatMessages[0]?.content?.slice(0, 100)}
								</div>
							))}
						</>

						<>
							{isLoading ? (
								<>
									{new Array(10).fill(10).map((_, idx) => (
										<Skeleton key={idx} className='my-2 h-12 w-full' />
									))}
								</>
							) : (
								<>
									<>
										{!user?.email && (
											<h3>Recent chats only available for logged in user.</h3>
										)}
										{recentChats.length < 1 && (
											<h1>No recent chats available.</h1>
										)}
									</>
								</>
							)}
						</>
					</div>
				</div>
			</div>

			{/* chat input form */}
			<ChatInputForm
				allMessages={allMessages}
				onChangeMessage={(messages: IChatMessage[]) => setAllMessages(messages)}
				onRefetch={refetch}
			/>
		</div>
	);
}

export interface IChatMessage {
	role: string;
	content: string;
}
