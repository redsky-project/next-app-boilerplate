import { JSX } from 'react';
import PostDetailModal from '@/app/(domains)/example/_components/dialog/PostDetailModal';

export interface IPostModalPageProps {
	searchParams: any;
}

export default async function PostModalPage({ searchParams }: IPostModalPageProps): Promise<JSX.Element> {
	console.log('>>>>>>>>>>>>>> searchParams::', searchParams);
	const { id } = await searchParams;

	return <PostDetailModal id={id} />;
}
