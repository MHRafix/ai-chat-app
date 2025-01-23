import { Card, CardContent } from '@/components/shadcn-ui/card';

export default function ChatArea() {
	return (
		<Card className='w-full'>
			<CardContent className='flex flex-col items-center'>
				<h1 className='text-xl font-bold mb-4'>What can I help with?</h1>
			</CardContent>
		</Card>
	);
}
