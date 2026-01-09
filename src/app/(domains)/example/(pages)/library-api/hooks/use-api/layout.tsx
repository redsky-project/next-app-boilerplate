import { JSX, type ReactNode } from 'react';

import { Separator } from '@/core/components/shadcn/ui/separator';

export interface IUseApiExLayoutProps {
	basicUseApiDemoInternalApi: ReactNode; // BasicUseApiEx 패러럴 라우터
	basicUseApiDemo: ReactNode; // BasicUseApiEx 패러럴 라우터
	basicUseApiDemoRouteHandlers: ReactNode; // BasicUseApiEx 패러럴 라우터
}

export default function UseApiExLayout({
	basicUseApiDemoInternalApi,
	basicUseApiDemo,
	basicUseApiDemoRouteHandlers,
}: IUseApiExLayoutProps): JSX.Element {
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
							{/*<li>
								다음 예제는{' '}
								<code className="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] wrap-break-word outline-none">
									https://koreanjson.com/posts
								</code>
								로 데이터를 가져오기 위한 요청을 보냅니다.
							</li>*/}
						</ul>
					</div>
					<div className="flex flex-col gap-2 pt-6">
						<h3 className="scroll-m-20 text-lg font-semibold tracking-tight sm:text-lg xl:text-lg">
							◉ 같은 도메인 내부 API 호출 (/posts)
						</h3>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							다음 예제와 같이 <strong className="text-blue-500">같은 서버(도메인)의 API</strong>를{' '}
							<strong className="text-blue-500">Client Component</strong>
							에서 호출할 때는 API URL에서 <strong className="text-blue-500">도메인을 제외한</strong> 경로만 사용합니다.
							<code className="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] wrap-break-word outline-none">
								/posts
							</code>
						</p>
					</div>
					<div className="w-full flex-1 py-4">{basicUseApiDemoInternalApi}</div>
					<Separator className="my-2" />
					<div className="flex flex-col gap-2 pt-6">
						<h3 className="scroll-m-20 text-lg font-semibold tracking-tight sm:text-lg xl:text-lg">
							◉ 외부 API 호출 (https://koreanjson.com/posts)
						</h3>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							다음 예제와 같이 <strong className="text-blue-500">외부 API</strong>를{' '}
							<strong className="text-blue-500">Client Component</strong>
							에서 호출하면 <strong className="text-red-500">CORS</strong> 문제가 발생합니다. (도메인이 서로 다르기
							때문에)
						</p>
					</div>
					<div className="w-full flex-1 py-4">{basicUseApiDemo}</div>
					<Separator className="my-2" />
					<div className="flex flex-col gap-2 pt-6">
						<h3 className="scroll-m-20 text-lg font-semibold tracking-tight sm:text-lg xl:text-lg">
							◉ Route Handlers를 사용하여 외부 API 호출 CORS 문제 해결
						</h3>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<strong className="text-blue-500">외부 API</strong>를{' '}
							<strong className="text-blue-500">Client Component</strong>
							에서 호출할 때 <strong className="text-red-500">CORS</strong> 문제 해결을 위하여{' '}
							<strong className="text-blue-500">Route Handlers</strong>를 사용한 예제입니다.
						</p>
					</div>
					<div className="w-full flex-1 py-4">{basicUseApiDemoRouteHandlers}</div>
					{/* example 블럭요서 END */}
				</div>
			</div>
		</div>
	);
}
