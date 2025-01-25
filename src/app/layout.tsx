// import { AppLayoutWrapper } from '@/components/custom/AppShell/AppLayoutWrapper';
// import { ModeToggler } from '@/components/custom/theme/ModeToggler';
// import { ThemeProvider } from '@/components/custom/theme/theme-provider';
// import { SidebarProvider } from '@/components/shadcn-ui/sidebar';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
// 	title: 'Create Next App',
// 	description: 'Generated by create next app',
// };

// const queryClient = new QueryClient();

// export default function RootLayout({
// 	children,
// }: Readonly<{
// 	children: React.ReactNode;
// }>) {
// 	return (
// 		<html lang='en'>
// 			<ThemeProvider
// 				attribute='class'
// 				defaultTheme='system'
// 				enableSystem
// 				disableTransitionOnChange
// 			>
// 				{' '}
// 				<QueryClientProvider client={queryClient}>
// 					<body>
// 						{' '}
// 						<SidebarProvider>
// 							<AppLayoutWrapper />
// 							<main className='w-full h-screen flex items-end justify-center'>
// 								{' '}
// 								<ModeToggler />
// 								{children}
// 								{/* <SidebarTrigger /> */}
// 							</main>
// 						</SidebarProvider>
// 					</body>
// 				</QueryClientProvider>
// 			</ThemeProvider>
// 		</html>
// 	);
// }

'use client';

import { AppLayoutWrapper } from '@/components/custom/AppShell/AppLayoutWrapper';
import { ModeToggler } from '@/components/custom/theme/ModeToggler';
import { ThemeProvider } from '@/components/custom/theme/theme-provider';
import { SidebarProvider } from '@/components/shadcn-ui/sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import './globals.css';

// Create a query client
const queryClient = new QueryClient();

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange
			>
				{' '}
				<QueryClientProvider client={queryClient}>
					<body>
						{' '}
						<SidebarProvider>
							<AppLayoutWrapper />
							<main className='w-full h-screen flex items-end justify-center'>
								{' '}
								<ModeToggler />
								{children}
								{/* <SidebarTrigger /> */}
							</main>
						</SidebarProvider>
					</body>
				</QueryClientProvider>
			</ThemeProvider>
		</html>
	);
}
