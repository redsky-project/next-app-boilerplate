'use client';

import type { JSX } from 'react';

import { Separator } from '@/core/components/shadcn/ui/separator';
import { Button, CodeBlockClient } from '@components/ui';

interface IRouterBackExProps {
	//test?: string;
}

export default function RouterBackEx({}: IRouterBackExProps): JSX.Element {
	return (
		<>
			<div className="flex min-w-0 flex-1 flex-col">
				<div className="h-(--top-spacing) shrink-0" />
				<div className="mx-auto flex w-full  min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
					<div className="flex flex-col gap-2">
						<div className="flex items-start justify-between">
							<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">$router.back</h1>
							<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
								&nbsp;
							</div>
						</div>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						<strong>$router.back()</strong> 메서드는 <strong>클라이언트 전용</strong> 이며 현재 페이지에서 이전 페이지로 이동하는 메서드입니다.
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
									$router.back() 이전 페이지 이동
								</h3>
								<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
									&nbsp;
								</div>
							</div>
							<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
								버튼을 클릭하면 이전 페이지로 history back 됩니다.
							</p>
							<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
								<code className="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] wrap-break-word outline-none font-bold">
								$router.back();
								</code>
							</p>
						</div>
						<div className="w-full flex-1 py-4">
							<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
								<div className="grid gap-4">
									<div className="bg-green-50 dark:bg-green-950 p-4 rounded-md">
										<p className="text-sm font-semibold mb-2">✅ 이동 완료!</p>
										<p className="text-sm">
											이전 페이지에서 <strong>scroll: false</strong>로 이동했다면 스크롤 위치가 유지되어야 합니다.
											<br />
											<strong>scroll: true</strong>로 이동했다면 페이지 맨 위에서 시작합니다.
										</p>
									</div>
									
									<div className="flex flex-col gap-2">
										<Button onClick={() => $router.back()}>
											⬅️ 이전 페이지로 돌아가기
										</Button>
									</div>
								</div>
							</div>
							<CodeBlockClient
								lang="tsx"
								code={`'use client'

import { Button } from '@components/ui';

function SamplePage() {
	return (
		<>
			<Button onClick={() => $router.back()}>
				이전 페이지로 돌아가기
			</Button>
		</>
	);
}`}
							/>
						</div>
						{/* example 블럭요소 END */}
						
					</div>
				</div>
			</div>
		</>
	);
}
