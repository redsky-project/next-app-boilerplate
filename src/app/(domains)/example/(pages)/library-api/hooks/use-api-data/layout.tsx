import { JSX, type ReactNode } from 'react';

import { Separator } from '@/core/components/shadcn/ui/separator';

export interface IUseApiExLayoutProps {
	basicUseApiDataDemo: ReactNode; // BasicUseApiDataDemo 패러럴 라우터
}

export default function UseApiExLayout({ basicUseApiDataDemo }: IUseApiExLayoutProps): JSX.Element {
	return (
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="h-(--top-spacing) shrink-0" />
			<div className="mx-auto flex w-full  min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
				<div className="flex flex-col gap-2">
					<div className="flex items-start justify-between">
						<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">useApiData</h1>
						<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
							&nbsp;
						</div>
					</div>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						<strong>TanStack Query</strong>에 캐시된 데이터를 읽어오는 훅입니다. <strong>useApi</strong>로 어디선가
						가져온 데이터를 다른 컴포넌트에서도 사용할 수 있습니다.
					</p>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						만약 해당 URL 키에 해당하는 데이터가 없다면, 데이터는 비어있는 값을 반환합니다.
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
								Basic useApiData
							</h2>
							<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
								&nbsp;
							</div>
						</div>
						<ul className="list-disc list-inside text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<li>
								Client Component의 함수 본문(최 상단)에 <strong>useApiData</strong> 훅 코드를 추가합니다.
							</li>
							<li>
								Client Component가 렌더링될 때 <strong>useApiData</strong>훅을 통해{' '}
								<strong>TanStack Query(React Query)</strong>에 저장되어 있는 데이터를 가져옵니다.
							</li>
						</ul>
					</div>
					<div className="w-full flex-1 py-4">{basicUseApiDataDemo}</div>
					<Separator className="my-2" />

					{/* example 블럭요서 END */}
				</div>
			</div>
		</div>
	);
}
