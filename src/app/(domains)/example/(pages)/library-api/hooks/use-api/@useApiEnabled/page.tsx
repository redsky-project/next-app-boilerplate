'use client';

import { JSX } from 'react';

import { Textarea } from '@/core/components/shadcn/ui/textarea';
import { Button, CodeBlockClient } from '@components/ui';
import { useApi } from '@hooks/api';
import { IPost } from '@/app/(domains)/example/_types';

export interface IUseApiEnabledProps {
	// test?: string;
}

export default function UseApiEnabled({}: IUseApiEnabledProps): JSX.Element {
	// basic useApi example ========================================================
	// 버튼 클릭 시 데이터를 가져오게 하기 위한 enabled 옵션 사용
	const {
		data: postsData,
		error: postsError,
		isLoading: postsLoading,
		refetch: postsRefetch,
	} = useApi<IPost[]>('@routes/example/api/posts', { queryOptions: { enabled: false } });
	//==============================================================================

	// textarea onChange handler
	const handlerTextarea = () => {
		//
	};
	return (
		<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
			<Button onClick={() => postsRefetch()}>Fetch</Button>
			<Textarea
				value={
					postsLoading
						? 'Loading...'
						: postsError
							? 'Error: ' + JSON.stringify(postsError)
							: JSON.stringify(postsData || [], null, 2) || 'No data'
				}
				placeholder="Response Data (https://koreanjson.com/posts)"
				onChange={handlerTextarea}
				className="min-h-[40px] border-0 rounded-none border-b border-neutral-200 focus-visible:ring-0 font-mono text-sm dark:border-neutral-800 max-h-52 overflow-auto"
			/>
			<CodeBlockClient
				code={`import { JSX } from 'react';
import { useApi } from '@hooks/api';

// KoreanJSON API - Posts(업무 폴더 내부의 _types 폴더에 선언된 타입 사용)
// https://koreanjson.com/posts
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
  // 버튼 클릭 시 데이터를 가져오게 하기 위한 enabled 옵션 사용
	const {
		data: postsData,
		error: postsError,
		isLoading: postsLoading,
		refetch: postsRefetch,
	} = useApi<IPost[]>('/posts', { queryOptions: { enabled: false } });

	return (
	  <>
			<Button onClick={() => postsRefetch()}>Fetch</Button>
			<div>
				{
					postsLoading
						? 'Loading...'
						: postsError
							? 'Error: ' + JSON.stringify(postsError)
							: JSON.stringify(postsData || [], null, 2) || 'No data'
				}
			</div>
		</>
	);
}`}
				lang="tsx"
			/>
		</div>
	);
}
