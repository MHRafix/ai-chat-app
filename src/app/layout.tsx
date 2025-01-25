'use client';

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
			<QueryClientProvider client={queryClient}>
				<body>
					{' '}
					{/* <SidebarProvider>
							<AppLayoutWrapper /> */}
					<main className='w-full h-screen flex justify-center'>
						{' '}
						{children}
						{/* <SidebarTrigger /> */}
					</main>
					{/* </SidebarProvider> */}
				</body>
			</QueryClientProvider>
		</html>
	);
}
