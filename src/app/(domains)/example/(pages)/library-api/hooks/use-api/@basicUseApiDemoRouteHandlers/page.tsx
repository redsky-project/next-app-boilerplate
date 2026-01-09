'use client';

import { JSX } from 'react';

import { Textarea } from '@/core/components/shadcn/ui/textarea';
import { CodeBlockClient } from '@components/ui';
import { useApi } from '@hooks/api';
import { IPost } from '@/app/(domains)/example/_types';

export interface IBasicUseApiDemoRouteHandlersProps {
	// test?: string;
}

export default function BasicUseApiDemoRouteHandlers({}: IBasicUseApiDemoRouteHandlersProps): JSX.Element {
	// basic useApi example ========================================================
	// /example/api/posts route handler 사용 예제
	const { data: postsData, error: postsError, isLoading: postsLoading } = useApi<IPost[]>('@routes/example/api/posts');

	// textarea onChange handler
	const handlerTextarea = () => {
		//
	};
	return (
		<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
			<div className="max-h-52 overflow-auto">
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
					className="min-h-[40px] border-0 rounded-none border-b border-neutral-200 focus-visible:ring-0 font-mono text-sm dark:border-neutral-800 resize-none"
				/>
			</div>
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
	// '/example/api/posts' Route Handler 사용 예제
	const {
		data: postsData,
		error: postsError,
		isLoading: postsLoading
	} = useApi<IPost[]>('@routes/example/api/posts');

	return (
		<div>
			{
				postsLoading
					? 'Loading...'
					: postsError
						? 'Error: ' + JSON.stringify(postsError)
						: JSON.stringify(postsData || [], null, 2) || 'No data'
			}
		</div>
	);
}`}
				lang="tsx"
			/>
		</div>
	);
}
