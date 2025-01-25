import MiniLogo from '@/assets/chatgptlogo.png';
import Image from 'next/image';
import React from 'react';

const WelcomeMessage: React.FC = () => {
	return (
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
				Please enter your message to interact with the InfoHacker AI chatbot.
				Here type your message and press Enter to send.
			</p>
		</div>
	);
};

export default WelcomeMessage;
