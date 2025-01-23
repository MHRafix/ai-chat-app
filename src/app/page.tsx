'use client';

import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { SendIcon } from 'lucide-react';

export default function Home() {
	return (
		<div className='lg:w-8/12 mb-4 px-5 py-8 rounded-lg bg-[#F4F4F4]'>
			<div className='flex justify-center gap-2 items-center'>
				<Input
					className='w-full'
					type='text'
					placeholder='Message to MindHacker'
				/>
				<Button variant={'outline'}>
					<SendIcon size={20} />
				</Button>
			</div>
		</div>
	);
}
