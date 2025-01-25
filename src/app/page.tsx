'use client';

import { IChatResponse } from '@/api/types-model/ai-chat-response.type';
import { Button } from '@/components/shadcn-ui/button';
import { Textarea } from '@/components/shadcn-ui/textarea';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowUp, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const OpenAiAPIKey = process.env.NEXT_PUBLIC_OPEN_AI_SECRET;

export default function Home() {
	const [message, setMessage] = useState<string>('');
	const [allMessages, setAllMessages] = useState<any[]>([]);

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
				setAllMessages([...allMessages, res.choices]);
				setMessage('');
				reset({ message: '' });
			},
		});

	// handle send message
	const sendMessage = async (payload: { message: string }) => {
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
		return data;
	};

	// handle message form submit
	const handleMessageSubmit = (payload: { message: string }) => {
		__sendMessageMutation(payload);
	};

	return (
		<div className='lg:w-8/12 mb-4 px-5 py-8 rounded-lg bg-[#F4F4F4]'>
			<form
				onSubmit={handleSubmit(handleMessageSubmit)}
				className='flex justify-center gap-2 items-center relative'
			>
				<Textarea
					// className='w-full !py-8 !text-xl'
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
				/>{' '}
				<Button
					type='submit'
					disabled={!watch('message') || __messageSending}
					variant={'outline'}
					size={'lg'}
					className='py-[30px]'
				>
					{__messageSending ? (
						<>
							<Loader2 className='mr-2 h-8 w-8 animate-spin' />
						</>
					) : (
						<ArrowUp size={30} />
					)}
				</Button>
			</form>
		</div>
	);
}
