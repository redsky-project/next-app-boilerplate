'use client';

import { JSX } from 'react';

import { Textarea } from '@/core/components/shadcn/ui/textarea';
import { CodeBlockClient } from '@components/ui';
import { useApiData } from '@hooks/api';
import { IPost } from '@/app/(domains)/example/_types';

export interface IBasicUseApiDataDemoProps {
	// test?: string;
}

export default function BasicUseApiDataDemo({}: IBasicUseApiDataDemoProps): JSX.Element {
	// basic useApi example ========================================================
	// 내부 API 호출(/posts)
	// 현재는 내부 API가 없어서 Route Handler를 사용한 방법으로 호출 하였음. 내부 API가 있다면 useApi<IPost[]>(`/posts`) 이와같이 사용.
	const { data: postsData } = useApiData<IPost[]>(`@routes/example/api/posts`);

	// textarea onChange handler
	const handlerTextarea = () => {
		//
	};
	return (
		<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
			<div className="max-h-52 overflow-auto">
				<Textarea
					value={JSON.stringify(postsData || [], null, 2) || 'No data'}
					placeholder="Response Data (/posts)"
					onChange={handlerTextarea}
					className="min-h-[40px] border-0 rounded-none border-b border-neutral-200 focus-visible:ring-0 font-mono text-sm dark:border-neutral-800 resize-none"
				/>
			</div>
			<CodeBlockClient
				code={`import { JSX } from 'react';
import { useApiData } from '@hooks/api';

// 내부 API - Posts(업무 폴더 내부의 _types 폴더에 선언된 타입 사용)
export interface IPost {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	UserId: number;
}

// 페이지 컴포넌트의 Props 타입 정의
export interface ISamplePageProps {
	// test?: string;
}

// 페이지 컴포넌트 함수
export default function SamplePage({}: ISamplePageProps): JSX.Element {
	// useApiData('/posts')를 통해 캐시된 데이터를 가져옵니다.
	const { data: postsData } = useApiData<IPost[]>('/posts');

	return (
		<div>
			{JSON.stringify(postsData || [], null, 2) || 'No data'}
		</div>
	);
}`}
				lang="tsx"
			/>
		</div>
	);
}
