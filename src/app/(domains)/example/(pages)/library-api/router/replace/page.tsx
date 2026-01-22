'use client';

import type { JSX } from 'react';

import { Separator } from '@/core/components/shadcn/ui/separator';
import { Button, CodeBlockClient } from '@components/ui';
//import { $router } from '@router';
//import { FunctionList } from './FunctionList';
//import { ToCamelCase } from './_components/ToCamelCase';

interface IRouterReplaceExProps {
	//test?: string;
}

export default function RouterReplaceEx({}: IRouterReplaceExProps): JSX.Element {
	return (
		<>
			<div className="flex min-w-0 flex-1 flex-col">
				<div className="h-(--top-spacing) shrink-0" />
				<div className="mx-auto flex w-full  min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
					<div className="flex flex-col gap-2">
						<div className="flex items-start justify-between">
							<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">$router.replace</h1>
							<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
								&nbsp;
							</div>
						</div>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						  페이지 이동을 위한 <strong>redirect</strong>와 <strong>router.replace</strong>를 통합한 <strong>$router</strong> 전역 객체의 <strong>replace()</strong> 메서드입니다.
						</p>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<strong>클라이언트 환경에서는</strong> 내부적으로 Next.js의 <strong>useRouter</strong>를 자동으로 사용하여 SPA 네비게이션을 지원하고, <strong>서버 환경에서는</strong> 내부적으로 <strong>redirect</strong>를 사용하여 페이지 이동을 지원합니다.
						</p>
					</div>
					<div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
						<Separator className="my-6" />
						{/* example 블럭요소 START */}
						<div className="flex flex-col gap-2 pt-6">
							<div className="flex items-start justify-between">
								<h3
									data-shorcut="true"
									className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
								>
									$router.replace() 페이지 이동
								</h3>
								<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
									&nbsp;
								</div>
							</div>
							<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
								버튼을 클릭하면 페이지가 이동됩니다.
							</p>
							<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
								<code className="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] wrap-break-word outline-none font-bold">
								$router.replace('/example/library-api/router/push-next');
								</code>
							</p>
						</div>
						<div className="w-full flex-1 py-4">
							<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
								{/* scroll 테스트 섹션 */}
								<div className="grid gap-4">
									<div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md">
										<p className="text-sm font-semibold mb-2">📌 scroll 옵션 테스트 방법:</p>
										<ol className="text-sm space-y-1 list-decimal list-inside">
											<li>페이지를 <strong>아래로 스크롤</strong>하여 이 버튼이 보이게 하세요</li>
											<li><strong>scroll: false</strong> 버튼 클릭 → 다음 페이지에서 스크롤 위치 유지됨</li>
											<li><strong>scroll: true</strong> 버튼 클릭 → 다음 페이지 맨 위로 스크롤됨</li>
										</ol>
									</div>
									
									<div className="flex flex-col gap-2">
										<Button onClick={() => $router.replace('/example/library-api/router/push-next', { scroll: false })}>
											$router.replace() scroll: false로 이동 (스크롤 위치 유지)
										</Button>
										<Button onClick={() => $router.replace('/example/library-api/router/push-next', { scroll: true })}>
											$router.replace() scroll: true로 이동 (맨 위로)
										</Button>
									</div>
								</div>
							</div>
							<CodeBlockClient
								lang="tsx"
								code={`'use client'

import { Button } from '@components/ui';
import { $router } from '@router';

function SamplePage() {
	return (
		<>
			<Button onClick={() => $router.replace('/example/library-api/router/push-next', { scroll: false })}>
				$router.replace() scroll: false로 이동 (스크롤 위치 유지)
			</Button>
			<Button onClick={() => $router.replace('/example/library-api/router/push-next', { scroll: true })}>
				$router.replace() scroll: true로 이동 (맨 위로)
			</Button>
		</>
	);
}`}
							/>
						</div>
						{/* example 블럭요소 END */}
						
						{/* 스크롤 공간 확보를 위한 더미 콘텐츠 */}
						<div className="mt-8 space-y-4">
							<h3 className="text-xl font-semibold">스크롤 테스트를 위한 추가 콘텐츠</h3>
							{Array.from({ length: 20 }).map((_, i) => (
								<div key={i}
									data-scroll-test="true"
									className="p-4 border rounded-md">
									<p className="text-sm">섹션 {i + 1}: 이 콘텐츠는 페이지를 길게 만들어 스크롤 테스트를 가능하게 합니다.</p>
									<p className="text-xs text-muted-foreground mt-2">
										위로 스크롤하여 버튼을 클릭하고 scroll 옵션의 차이를 확인하세요.
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
