// ===============================
// 게시글 상세 모달 페이지 (/example/docs-examples/intercept-modal-demo/detail/post 로 브라우저에서 바로 접근하면 보이는 화면.)
// ===============================

import { JSX } from 'react';
import PostDetailModal from '@/app/(domains)/example/_components/dialog/PostDetailModal';
import InterceptModalDemoPage from '../../_components/InterceptModalDemoPage';

// ✅ 이 설정 추가
export const dynamic = 'force-dynamic';
// → "이 페이지는 동적이에요" 라고 Next.js에게 명시적으로 알려줌
// → 빌드 성공, 매 요청마다 서버에서 렌더링

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
