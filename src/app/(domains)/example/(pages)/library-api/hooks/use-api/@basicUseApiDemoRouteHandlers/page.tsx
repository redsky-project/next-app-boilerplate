'use client';

import { JSX } from 'react';

import { Textarea } from '@/core/components/shadcn/ui/textarea';
import { CodeBlockClient, Icon, Alert, AlertDescription, AlertTitle } from '@components/ui';
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
			<Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
				<Icon
					name="MessageCircleWarning"
					className="text-blue-600 dark:text-blue-400"
				/>
				<AlertTitle className="text-blue-900 dark:text-blue-100">
					<strong>Route Handlers</strong>란?
				</AlertTitle>
				<AlertDescription className="text-blue-800 dark:text-blue-200">
					<div className="flex flex-col gap-2">
						{/*<p className="text-sm">...</p>*/}
						<ul className="list-disc list-inside text-sm space-y-1">
							<li>
								<strong>API 앤드포인트 생성 : </strong>App Router(app 디렉토리)에서 서버 측 API 엔드포인트를 생성할 수
								있게 해주는 기능입니다.
							</li>
							<li>
								<strong>REST API 지원 : </strong>Web Request와 Response API를 기반으로 동작하며, GET, POST, PUT, DELETE
								등 다양한 HTTP 메서드를 처리할 수 있고, Edge Runtime과 Node.js Runtime 모두에서 실행 가능합니다.
							</li>
							<li>
								route.ts 파일을 사용하여 HTTP 요청을 처리하고 응답을 반환하는 커스텀 요청 핸들러를 만들 수 있습니다.
							</li>
						</ul>
					</div>
				</AlertDescription>
			</Alert>
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
