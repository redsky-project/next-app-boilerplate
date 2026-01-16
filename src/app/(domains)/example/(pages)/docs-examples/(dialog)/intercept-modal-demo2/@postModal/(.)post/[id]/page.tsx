import { JSX } from 'react';
import { serverApi } from '@fetch/server-api';
// 공통 Dialog 컴포넌트
import PostDetailModal from '@/app/(domains)/example/_components/dialog/PostDetailModal';

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

	return <PostDetailModal data={postData} />;
}
