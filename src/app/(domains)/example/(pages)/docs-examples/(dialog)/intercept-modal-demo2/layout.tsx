import { JSX, type ReactNode } from 'react';

export interface IInterceptModalDemo2LayoutProps {
	children: ReactNode;
	postModal: ReactNode; // postModal 패러럴 라우터
}

export default function InterceptModalDemo2Layout({
	children,
	postModal,
}: IInterceptModalDemo2LayoutProps): JSX.Element {
	return (
		<>
			{children}
			{postModal}
		</>
	);
}
