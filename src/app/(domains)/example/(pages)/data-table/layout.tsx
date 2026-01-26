import { JSX, ReactNode } from 'react';
import { Separator } from '@/core/components/shadcn/ui/separator';

export interface IDataTableLayoutProps {
	basicDataTable: ReactNode;
}

export default function DataTableLayout({ basicDataTable }: IDataTableLayoutProps): JSX.Element {
	return (
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="h-(--top-spacing) shrink-0" />
			<div className="mx-auto flex w-full  min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
				<div className="flex flex-col gap-2">
					<div className="flex items-start justify-between">
						<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
							Data Table 예제
						</h1>
						<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
							&nbsp;
						</div>
					</div>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						현재 화면은 Layout.tsx 파일이며, 각 컨텐츠는 병렬 라우트로 구현된 <strong>Client Component</strong>입니다.
					</p>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						shadcn/ui를 사용한 TanStack 테이블의 예제 모음입니다. 기본 사용법부터 고급 기능까지 다룹니다..
					</p>
				</div>
				<div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
					{/* 폼 제출 흐름도 블럭요소 START */}
					{/*<div className="w-full flex-1 py-4">
						<h2
							data-shorcut="true"
							className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
						>
							폼 전송 흐름도
						</h2>

						<div className="flex justify-start py-1">
							<Image
								src={serverActionFlowDiagram}
								alt="Server Form Diagram"
								width={700}
								height={500}
							/>
						</div>
					</div>*/}
					{/* 폼 제출 흐름도 블럭요소 END */}

					<Separator className="my-6" />
					{/* example 블럭요소 START */}
					{basicDataTable}
					{/* example 블럭요소 END */}
				</div>
			</div>
		</div>
	);
}
