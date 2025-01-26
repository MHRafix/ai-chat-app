'use client';
import authenticationApiRepository from '@/api/repository/auth.repo';
import { ISignupPayload } from '@/api/types-model/auth.types';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { ToastAction } from '@/components/shadcn-ui/toast';
import { useToast } from '@/hooks/use-toast';
import ProtectWithoutSession from '@/lib/protectors/ProtectWithoutSession';
import { yupResolver } from '@hookform/resolvers/yup';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { Loader2 } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const SignupPage: NextPage = () => {
	const router = useRouter(); // router instance

	const { toast } = useToast();

	// signin form
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: { email: '' },
		resolver: yupResolver(Signin_Form_Validation_Schema),
	});

	// execute after success
	const onSuccess = (res: { _id: string; token: string }) => {
		Cookies.set(
			'user',
			JSON.stringify({
				token: res?.token,
				_id: res?._id,
			}),
			{
				expires: 60 / (24 * 60),
				sameSite: 'strict',
			}
		);

		router?.push('/');
	};

	// signin mutation
	const { mutate, isPending } = useMutation({
		mutationKey: ['Signup_Mutation'],
		mutationFn: (payload: ISignupPayload) =>
			authenticationApiRepository.signup(payload),
		onSuccess(res: any) {
			onSuccess(res?.data);
			toast({
				variant: 'default',
				title: 'Registration successful',
			});
		},
		onError(error: AxiosError) {
			toast({
				variant: 'destructive',
				title: 'Failed to login',
				action: <ToastAction altText='Try again'>Try again</ToastAction>,
			});
		},
	});

	// handle sign in
	const handleSignup = async (payload: ISignupPayload) => {
		mutate(payload);
	};

	return (
		<div className=' w-full flex justify-center items-center '>
			<div className='bg-slate-200 p-5 xs:w-11/12 lg:w-5/12 drop-shadow-xl rounded-md'>
				<h1 className='mb-5 text-2xl font-bold'>Registration Now</h1>
				<form onSubmit={handleSubmit(handleSignup)}>
					<Input
						disabled={isPending}
						{...register('name')}
						placeholder='Your name'
						style={{
							fontFamily: 'Nunito sans, sans-serif !important',
						}}
						className='mb-5 py-5 border-solid border-[1px] border-slate-500'
						required
						type='text'
					/>

					<Input
						disabled={isPending}
						{...register('email')}
						placeholder='Your email'
						style={{
							fontFamily: 'Nunito sans, sans-serif !important',
						}}
						className='mb-5 py-5 border-solid border-[1px] border-slate-500'
						required
						type='email'
					/>

					<Input
						disabled={isPending}
						{...register('password')}
						placeholder='Your Password'
						style={{
							fontFamily: 'Nunito sans, sans-serif !important',
						}}
						className='mb-5 py-5 border-solid border-[1px] border-black'
						required
					/>

					<Button
						type='submit'
						color='violet'
						className='mb-5 w-full py-6 text-xl'
					>
						{isPending ? (
							<Loader2 className='animate-spin' size={30} />
						) : (
							'Register now'
						)}
					</Button>
				</form>

				<Link href='/'>
					<Button className='mb-5 w-full py-6 text-xl'>
						Continue without account
					</Button>
				</Link>

				<div className='text-right mt-3'>
					<Link href='/auth/signin'>
						<Button color='teal' disabled={isPending}>
							Login now
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProtectWithoutSession(SignupPage);

export const Signin_Form_Validation_Schema = Yup.object().shape({
	name: Yup.string().required().label('Name'),
	email: Yup.string().email().required().label('Email'),
	password: Yup.string().min(4).max(20).required().label('Password'),
});
