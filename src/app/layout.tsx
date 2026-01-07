import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/assets/styles/app.css';

import DefaultLayout from '@/shared/components/layout/DefaultLayout';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'next-app-boilerplate',
	description: 'Next.js 기반의 앱 보일러플레이트 라이브러리',
};
interface IRootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<DefaultLayout>{children}</DefaultLayout>
			</body>
		</html>
	);
}
