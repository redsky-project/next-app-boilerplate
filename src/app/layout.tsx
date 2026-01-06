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
	title: 'entec-next-assets',
	description: 'Next.js 기반의 Frontend Assets 라이브러리',
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
