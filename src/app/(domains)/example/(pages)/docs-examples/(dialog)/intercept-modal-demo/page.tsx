import { JSX } from 'react';
import InterceptModalPageComp from './_components/InterceptModalDemoPage';

export const dynamic = 'force-dynamic';

export interface IInterceptModalPageProps {
	//
}

export default function InterceptModalPage({}: IInterceptModalPageProps): JSX.Element {
	return <InterceptModalPageComp />;
}
