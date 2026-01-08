import { JSX } from 'react';

import { Separator } from '@/core/components/shadcn/ui/separator';
export interface IUseApiExProps {
	// test?: string;
}

export default function UseApiEx({}: IUseApiExProps): JSX.Element {
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
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						내부적으로 axios나 fetch를 활용하여 GET, POST, PUT, DELETE 등 다양한 HTTP 메서드를 지원합니다. 자동 캐싱,
						로딩/에러 상태 관리, 백그라운드 재검증, refetch 등 강력한 데이터 페칭 기능을 제공하며, TypeScript 제네릭을
						통해 API 응답 데이터의 타입 안정성을 보장합니다.
					</p>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						Client Component에서 호출하는 API이므로 호출 도메인이 다르면 CORS 이슈가 발생할 수 있으며, Component가 모두
						렌더링된 후 API 요청이 발생하므로 SEO 최적화에 부적합합니다.
					</p>
				</div>
				<div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
					<Separator className="my-6" />
				</div>
			</div>
		</div>
	);
}
