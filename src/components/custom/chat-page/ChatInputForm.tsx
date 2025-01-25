import { IChatResponse } from '@/api/types-model/ai-chat-response.type';
import { IChatMessage } from '@/app/page';
import { Button } from '@/components/shadcn-ui/button';
import { Textarea } from '@/components/shadcn-ui/textarea';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowUp } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface IChatInputFormProps {
	allMessages: IChatMessage[];
	onChangeMessage: (message: IChatMessage[]) => void;
}

const ChatInputForm: React.FC<IChatInputFormProps> = ({
	allMessages,
	onChangeMessage,
}) => {
	// form initial
	const { register, handleSubmit, watch, reset } = useForm<{ message: string }>(
		{
			resolver: yupResolver(
				Yup.object().shape({
					message: Yup.string().required().label('Message'),
				})
			),
		}
	);

	// chat mutation here
	const { mutate: __sendMessageMutation, isPending: __messageSending } =
		useMutation({
			mutationFn: (payload: { message: string }) => sendMessage(payload),
			onSuccess: (res) => {
				onChangeMessage([
					...allMessages,
					{ role: res?.role, content: res.content },
				]);
			},
		});

	// handle send message
	const sendMessage = async (payload: IChatPayload) => {
		reset({ message: '' }); // reset form
		onChangeMessage([
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
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_AI_SECRET}`,
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
		<div className='lg:w-12/12 flex justify-center items-center  bg-[#ffffff] border-t-[1px] border-t-solid border-t-[#cac5c5] px-5 py-8'>
			<form
				onSubmit={handleSubmit(handleMessageSubmit)}
				className='w-full lg:w-10/12 flex justify-center gap-2 items-center relative'
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
					className='!text-lg border-[1px] border-solid border-[#000000]'
				/>
				<Button
					type='submit'
					disabled={!watch('message') || __messageSending}
					variant={'outline'}
					size={'lg'}
					className='lg:py-[30px] py-[20px] px-[20px] absolute right-2'
				>
					<ArrowUp size={30} />
				</Button>
			</form>
		</div>
	);
};

export default ChatInputForm;

export interface IChatPayload {
	message: string;
}
