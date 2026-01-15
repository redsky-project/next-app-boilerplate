import { JSX } from 'react';
import ModalPage from '../../_components/ModalPage';

export interface IPostModalPageProps {
	searchParams: any;
}

export default async function PostModalPage({ searchParams }: IPostModalPageProps): Promise<JSX.Element> {
	console.log('>>>>>>>>>>>>>> searchParams::', searchParams);
	const { id } = await searchParams;

	return <ModalPage id={id} />;
}
