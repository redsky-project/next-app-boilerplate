import { JSX } from 'react';
import { serverApi } from '@fetch/server-api';
import InterceptModalDemo2PageComp from '../../_components/InterceptModalDemo2Page';
// 공통 Dialog 컴포넌트
import PostDetailModal from '@/app/(domains)/example/_components/dialog/PostDetailModal';

// ✅ 이 설정 추가
export const dynamic = 'force-dynamic';
// → "이 페이지는 동적이에요" 라고 Next.js에게 명시적으로 알려줌
// → 빌드 성공, 매 요청마다 서버에서 렌더링

export interface IPostModalPageProps {
	params: any;
}

export default async function PostModalPage({ params }: IPostModalPageProps): Promise<JSX.Element> {
	console.log('>>>>>>>>>>>>>> params::', params);
	const { id } = await params;
	const { data: postData } = await serverApi(`https://koreanjson.com/posts/${id}`, {
		method: 'GET',
		cache: 'no-store',
	});

	return (
		<>
			<InterceptModalDemo2PageComp />
			<PostDetailModal data={postData} />
		</>
	);
}
