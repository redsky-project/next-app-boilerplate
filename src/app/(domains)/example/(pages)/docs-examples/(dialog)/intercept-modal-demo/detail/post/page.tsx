// ===============================
// 게시글 상세 모달 페이지 (/example/docs-examples/intercept-modal-demo/detail/post 로 브라우저에서 바로 접근하면 보이는 화면.)
// ===============================

import { JSX } from 'react';
import PostDetailModal from '@/app/(domains)/example/_components/dialog/PostDetailModal';
import InterceptModalDemoPage from '../../_components/InterceptModalDemoPage';

export interface IPostModalPageProps {
	searchParams: any;
}

export default async function PostModalPage({ searchParams }: IPostModalPageProps): Promise<JSX.Element> {
	console.log('>>>>>>>>>>>>>> searchParams::', searchParams);
	const { id } = await searchParams;

	return (
		<>
			<InterceptModalDemoPage />
			<PostDetailModal id={id} />
		</>
	);
}
