'use client';

import { JSX, useState } from 'react';

import { Separator } from '@/core/components/shadcn/ui/separator';
import { Textarea } from '@/core/components/shadcn/ui/textarea';
import { CodeBlock } from '@components/ui';

export interface IUseApiExProps {
	// test?: string;
}

export default function UseApiEx({}: IUseApiExProps): JSX.Element {
	// basic useApi example ========================================================
	//const { data: basicUseApiData } = useApi<IPost[]>(`${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/posts`);
	const [basicUseApiData] = useState<any[]>([]);
	//==============================================================================
	// textarea onChange handler
	const handlerTextarea = () => {
		//
	};
	return (
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="h-(--top-spacing) shrink-0" />
			<div className="mx-auto flex w-full  min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
				<div className="flex flex-col gap-2">
					<div className="flex items-start justify-between">
						<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">useApi</h1>
						<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
							&nbsp;
						</div>
					</div>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						<strong>TanStack Query(React Query)</strong> 기반으로 구축된 <strong>REST API 호출용 커스텀 훅</strong>
						입니다.
					</p>
				</div>
				<div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
					<Separator className="my-6" />
					{/* example 블럭요서 START */}
					<div className="flex flex-col gap-2 pt-6">
						<div className="flex items-start justify-between">
							<h2
								data-shorcut="true"
								className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
							>
								Basic useApi
							</h2>
							<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
								&nbsp;
							</div>
						</div>
						<ul className="list-disc list-inside text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<li>
								Client Component의 함수 본문(최 상단)에 <strong>useApi</strong> 훅 코드를 추가합니다.
							</li>
							<li>
								Client Component가 렌더링될 때 <strong>useApi</strong>가 <strong>자동으로 API 요청</strong>을
								수행합니다.
							</li>
							<li>
								다음 예제는{' '}
								<code className="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] break-words outline-none">
									https://jsonplaceholder.typicode.com/posts
								</code>
								로 데이터를 가져오기 위한 요청을 보냅니다.
							</li>
						</ul>
					</div>
					<div className="w-full flex-1 py-4">
						<Textarea
							value={JSON.stringify(basicUseApiData || [], null, 2)}
							placeholder="Response Data (https://jsonplaceholder.typicode.com/posts)"
							onChange={handlerTextarea}
							className="h-60 rounded-t-md rounded-b-none border-b-0"
						/>
						<CodeBlock
							code={`// ========================================================
// 페이지 만들기 기본 템플릿
// ========================================================
import { JSX } from 'react';

// 페이지 컴포넌트의 Props 타입 정의
export interface ISamplePageProps {
	// test?: string;
}

// 페이지 컴포넌트 함수
export default function SamplePage({}: ISamplePageProps): JSX.Element {
	return (<div>기본 템플릿 페이지입니다.</div>);
}`}
							lang="tsx"
						/>
					</div>
					{/* example 블럭요서 END */}
				</div>
			</div>
		</div>
	);
}
