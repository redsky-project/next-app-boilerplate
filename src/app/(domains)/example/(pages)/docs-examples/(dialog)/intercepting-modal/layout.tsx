import { JSX, type ReactNode } from 'react';

export interface IInterceptingModalExLayoutProps {
	children: ReactNode;
	postModal: ReactNode; // postModal 패러럴 라우터
}

export default function InterceptingModalExLayout({
	children,
	postModal,
}: IInterceptingModalExLayoutProps): JSX.Element {
	return (
		<>
			{children}
			{postModal}
		</>
	);
}
