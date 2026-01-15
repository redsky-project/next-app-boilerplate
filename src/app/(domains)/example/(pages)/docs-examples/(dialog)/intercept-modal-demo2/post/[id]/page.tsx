import { JSX } from 'react';
import InterceptModalDemo2PageComp from '../../_components/InterceptModalDemo2Page';
// 공통 Dialog 컴포넌트
import PostDetailModal from '@/app/(domains)/example/_components/dialog/PostDetailModal';

export const dynamic = 'force-dynamic';

export interface IPostModalPageProps {
	params: any;
}

export default async function PostModalPage({ params }: IPostModalPageProps): Promise<JSX.Element> {
	console.log('>>>>>>>>>>>>>> params::', params);
	const { id } = await params;

	return (
		<>
			<InterceptModalDemo2PageComp />
			<PostDetailModal id={id} />
		</>
	);
}
