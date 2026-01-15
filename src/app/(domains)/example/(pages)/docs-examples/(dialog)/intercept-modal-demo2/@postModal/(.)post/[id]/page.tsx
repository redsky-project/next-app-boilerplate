import { JSX } from 'react';
// 공통 Dialog 컴포넌트
import PostDetailModal from '@/app/(domains)/example/_components/dialog/PostDetailModal';

export interface IPostModalPageProps {
	params: any;
}

export default async function PostModalPage({ params }: IPostModalPageProps): Promise<JSX.Element> {
	console.log('>>>>>>>>>>>>>> params::', params);
	const { id } = await params;

	return <PostDetailModal id={id} />;
}
