import { useGetSession } from '@/hooks/use-get-session';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ComponentType, FC, useEffect } from 'react';

const ProtectWithoutSession = <P extends object>(
	Component: ComponentType<P>
): FC<P> => {
	const WithAuthenticationRequired: FC<P> = (props) => {
		const router = useRouter();

		const { isLoading, user } = useGetSession();

		useEffect(() => {
			if (user && !isLoading) {
				router.push('/');
			}
		}, [user, isLoading, router]);

		if (isLoading || user) {
			return (
				<div className='flex justify-center w-full h-screen items-center'>
					<Loader2 className='animate-spin' size={60} />
				</div>
			);
		}

		return <Component {...props} />;
	};

	return WithAuthenticationRequired;
};

export default ProtectWithoutSession;
