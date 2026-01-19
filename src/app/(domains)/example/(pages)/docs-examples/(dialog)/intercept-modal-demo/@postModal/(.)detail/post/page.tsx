import { JSX } from 'react';
import { serverApi } from '@fetch/api';
import PostDetailModal from '@/app/(domains)/example/_components/dialog/PostDetailModal';

export interface IPostModalPageProps {
	searchParams: any;
}

export default async function PostModalPage({ searchParams }: IPostModalPageProps): Promise<JSX.Element> {
	console.log('>>>>>>>>>>>>>> searchParams::', searchParams);
	const { id } = await searchParams;
	const { data: postData } = await serverApi(`https://koreanjson.com/posts/${id}`, {
		method: 'GET',
		cache: 'no-store',
	});

	return <PostDetailModal data={postData} />;
}
