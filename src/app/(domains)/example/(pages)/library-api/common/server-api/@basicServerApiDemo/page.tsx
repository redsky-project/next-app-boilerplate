import { JSX } from 'react';

import { CodeBlockClient } from '@components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/shadcn/ui/card';
import { serverApi } from '@fetch/server-api';
import { IPost } from '@/app/(domains)/example/_types';

export interface IBasicServerApiDemoProps {
	// test?: string;
}

export default async function BasicServerApiDemo({}: IBasicServerApiDemoProps): Promise<JSX.Element> {
	// basic serverApi example ========================================================
	// serverApi 호출 (Server Component이므로 async/await 직접 사용 가능)
	// 캐싱 옵션: 60초 동안 캐시 유지 (ISR)
	const { data: postsData } = await serverApi<IPost[]>(
		'https://koreanjson.com/posts',
		{ method: 'GET' },
		{ revalidate: 60 },
	);
	//==============================================================================

	return (
		<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
			<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base h-40 overflow-y-auto">
				<code>{JSON.stringify(postsData || [], null, 2) || 'No data'}</code>
			</p>
			<CodeBlockClient
				code={`import { JSX } from 'react';
import { serverApi } from '@fetch/server-api';

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
	// basic serverApi example ========================================================
	// serverApi 호출 (Server Component이므로 async/await 직접 사용 가능)
	// 캐싱 옵션: 60초 동안 캐시 유지 (ISR)
	const { data: postsData } = await serverApi<IPost[]>(
		'/posts',
		{ method: 'GET' },
		{ revalidate: 60 },
	);
	//==============================================================================

	return (
		<div>
			<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base h-40 overflow-y-auto">
				<code>{JSON.stringify(postsData || [], null, 2) || 'No data'}</code>
			</p>
		</div>
	);
}`}
				lang="tsx"
			/>
			<div className="grid gap-4 md:grid-cols-2 mt-4 overflow-y-auto h-200">
				{postsData?.map((post) => (
					<Card
						key={post.id}
						className="flex flex-col"
					>
						<CardHeader>
							<CardTitle className="text-lg leading-tight">
								<span className="text-muted-foreground mr-2">#{post.id}</span>
								{post.title}
							</CardTitle>
						</CardHeader>
						<CardContent className="flex-1">
							<p className="text-sm text-muted-foreground">{post.content}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
