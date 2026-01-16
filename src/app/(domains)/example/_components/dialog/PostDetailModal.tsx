import { JSX } from 'react';
import { serverApi } from '@fetch/server-api';
import InterceptModalWrapper from '@/shared/components/ui/dialog/InterceptModalWrapper';

export interface IPostDetailModalProps {
	id: any;
}

export default async function PostDetailModal({ id }: IPostDetailModalProps): Promise<JSX.Element> {
	const { data: postData } = await serverApi(`https://koreanjson.com/posts/${id}`, {
		method: 'GET',
		cache: 'no-store',
	});
	return (
		<InterceptModalWrapper
			options={{
				title: '상세 팝업',
			}}
		>
			<pre>{JSON.stringify(postData, null, 2)}</pre>
		</InterceptModalWrapper>
	);
}
