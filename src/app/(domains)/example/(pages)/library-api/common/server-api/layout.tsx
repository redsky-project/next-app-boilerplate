import { JSX, type ReactNode } from 'react';

import { Separator } from '@/core/components/shadcn/ui/separator';

export interface IServerApiExLayoutProps {
	basicServerApiDemo: ReactNode; // BasicServerApiDemo 패러럴 라우터
}

export default function ServerApiExLayout({ basicServerApiDemo }: IServerApiExLayoutProps): JSX.Element {
	return (
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="h-(--top-spacing) shrink-0" />
			<div className="mx-auto flex w-full  min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
				<div className="flex flex-col gap-2">
					<div className="flex items-start justify-between">
						<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">serverApi</h1>
						<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
							&nbsp;
						</div>
					</div>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						<strong>serverApi</strong> 함수는 <strong>Server Component</strong>나 <strong>Server Actions</strong>,{' '}
						<strong>Route Handler</strong>에서 사용되는 API 호출 함수입니다.
					</p>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						내부적으로 fetch 기반의 API 호출을 수행합니다.
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
								Basic serverApi
							</h2>
							<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
								&nbsp;
							</div>
						</div>
						<ul className="list-disc list-inside text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<li>
								현재 페이지는 <strong>Server Component</strong>로 구현되어 있습니다.
							</li>
							<li>
								<strong>serverApi</strong> 함수를 사용하여 서버에서 데이터를 조회합니다. (브라우저의 개발자 도구
								페이지의 Network 탭에서는 API 요청 결과를 확인할 수 없습니다.)
							</li>
							<li>
								<strong>serverApi</strong> 함수를 통해 모든 데이터를 미리 가져와 화면에 렌더링한 후 브라우저에
								전달합니다.(SSR)
							</li>
						</ul>
					</div>

					<div className="w-full flex-1 py-4">{basicServerApiDemo}</div>
					<Separator className="my-2" />

					{/* example 블럭요서 END */}
				</div>
			</div>
		</div>
	);
}
