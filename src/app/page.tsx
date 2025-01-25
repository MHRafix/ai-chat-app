'use client';

import { IChatResponse } from '@/api/types-model/ai-chat-response.type';
import MiniLogo from '@/assets/chatgptlogo.png';
import SystemAvatar from '@/assets/chatgptlogo2.png';
import UserAvatar from '@/assets/nouserlogo.png';
import { Button } from '@/components/shadcn-ui/button';
import { Textarea } from '@/components/shadcn-ui/textarea';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const OpenAiAPIKey = process.env.NEXT_PUBLIC_OPEN_AI_SECRET;

export default function Home() {
	// const [message, setMessage] = useState<string>('');
	const [allMessages, setAllMessages] = useState<IChatMessage[]>([]);

	// form
	const { register, handleSubmit, watch, reset } = useForm<{ message: string }>(
		{
			resolver: yupResolver(
				Yup.object().shape({
					message: Yup.string().required().label('Message'),
				})
			),
		}
	);

	// chat mutation
	const { mutate: __sendMessageMutation, isPending: __messageSending } =
		useMutation({
			mutationFn: (payload: { message: string }) => sendMessage(payload),
			onSuccess: (res) => {
				setAllMessages([
					...allMessages,
					{ role: res?.role, content: res.content },
				]);
				// setMessage('');
				reset({ message: '' });
			},
		});

	// handle send message
	const sendMessage = async (payload: IChatPayload) => {
		setAllMessages([
			...allMessages,
			{
				role: 'user',
				content: payload?.message,
			},
		]);

		// axios request to API
		const { data } = await axios.post<IChatResponse>(
			process.env.NEXT_PUBLIC_OPEN_AI_API_URL!,
			{
				model: 'gpt-3.5-turbo',
				messages: [
					...allMessages,
					{
						role: 'user',
						content: payload?.message,
					},
				],
			},
			{
				headers: {
					Authorization: `Bearer ${OpenAiAPIKey}`,
					'Content-Type': 'application/json',
				},
			}
		);
		return data?.choices?.[0]?.message;
	};

	// handle message form submit
	const handleMessageSubmit = (payload: IChatPayload) => {
		__sendMessageMutation(payload);
	};

	return (
		<div className='w-full'>
			<div className='lg:w-12/12 mx-auto h-[8vh] bg-[#F4F4F4] flex justify-end items-center px-5'></div>
			<div
				className={`overflow-y-auto px-4 lg:w-10/12 mx-auto h-[77vh] flex justify-center ${
					allMessages?.length > 0 ? 'items-start' : 'items-center'
				}`}
			>
				{allMessages?.length > 0 ? (
					<div className='!w-full'>
						{allMessages.map((message, index) => (
							<div
								key={index}
								className={
									message?.role === 'user'
										? `!w-full bg-[#71f5cd4b] p-3 rounded-md my-5`
										: `!w-full bg-[#ffffff] my-5 p-3 rounded-md`
								}
							>
								<div className='flex items-center'>
									<div className='flex-shrink-0'>
										<Image
											className='rounded-full w-10 h-10'
											src={message.role === 'user' ? UserAvatar : SystemAvatar}
											alt='user'
											width={40}
											height={40}
										/>
									</div>
									<div className='ml-3'>
										<p className='text-lg font-medium text-slate-700'>
											{message?.content}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className='text-center w-[400px]'>
						<Image
							className='mx-auto mb-3'
							src={MiniLogo}
							alt='logo'
							width={100}
							height={100}
						/>

						<h1 className='text-2xl text-center font-extrabold mb-3'>
							Welcome to InfoHacker!
						</h1>
						<p className='text-sm text-slate-700 font-medium leading-6 text-center'>
							Please enter your message to interact with the InfoHacker AI
							chatbot. Here type your message and press Enter to send.
						</p>
					</div>
				)}
			</div>
			<div className='lg:w-12/12 mx-auto flex justify-center items-end h-[15vh] bg-[#ebf0f4] border-t-[1px] border-t-solid border-t-[#cac5c5] px-5 py-8'>
				<form
					onSubmit={handleSubmit(handleMessageSubmit)}
					className='w-10/12 flex justify-center gap-2 items-center relative'
				>
					<Textarea
						placeholder='Message to InfoHacker'
						{...register('message')}
						cols={20}
						rows={2}
						onKeyDown={(event) => {
							if (event.key === 'Enter' && !event.shiftKey) {
								event.preventDefault(); // prevent adding a new line
								handleSubmit(handleMessageSubmit)(); // trigger form submission
							}
						}}
						className='!text-lg'
					/>
					<Button
						type='submit'
						disabled={!watch('message') || __messageSending}
						variant={'outline'}
						size={'lg'}
						className='py-[30px] absolute right-2'
					>
						<ArrowUp size={30} />
					</Button>
				</form>
			</div>
		</div>
	);
}

interface IChatMessage {
	role: string;
	content: string;
}

interface IChatPayload {
	message: string;
}

// {
// 	"model": "gpt-3.5-turbo",
// 	"messages": [
// 			{
// 					"role": "user",
// 					"content": "Who is Osama Bin Laden ?"
// 			}, {
// 							"role": "assistant",
// 							"content": "Osama Bin Laden was a Saudi Arabian militant and the founder of the terrorist organization al-Qaeda. He is known for being the mastermind behind the September 11, 2001 attacks on the United States.\n\nBin Laden fought in various conflicts, including the Soviet-Afghan War in the 1980s, where he joined the mujahideen fighters who were resisting the Soviet occupation of Afghanistan. He also fought against the United States and its allies in various regions, including in Afghanistan and Pakistan. Bin Laden's actions and beliefs were aimed at promoting his extremist version of Islam and carrying out attacks against Western interests.",
// 							"refusal": null
// 					},
// 			{
// 					"role": "user",
// 					"content": "How many wives he was ?"
// 			},
// 			{
// 							"role": "assistant",
// 							"content": "Osama Bin Laden was known to have multiple wives. It is reported that he had at least five wives over the course of his life. He had children with several of his wives, and some of them were also involved in his extremist activities. Bin Laden's family members, including his wives and children, were known to have lived with him in various locations, including in Afghanistan and Pakistan.",
// 							"refusal": null
// 					},
// 					{ "role": "user",
// 							"content": "where lived in PK?"
// 					}
// 	]
// }
