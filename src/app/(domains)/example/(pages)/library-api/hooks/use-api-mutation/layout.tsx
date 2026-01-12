import { JSX, type ReactNode } from 'react';

import { Separator } from '@/core/components/shadcn/ui/separator';

export interface IUseApiExLayoutProps {
	basicUseApiMutationDemo: ReactNode; // BasicUseApiDataDemo 패러럴 라우터
}

export default function UseApiExLayout({ basicUseApiMutationDemo }: IUseApiExLayoutProps): JSX.Element {
	return (
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="h-(--top-spacing) shrink-0" />
			<div className="mx-auto flex w-full  min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
				<div className="flex flex-col gap-2">
					<div className="flex items-start justify-between">
						<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
							useApiMutation
						</h1>
						<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
							&nbsp;
						</div>
					</div>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						<strong>useApiMutation</strong> 은 <strong>Client Component</strong> 훅으로, 서버 상태 변경을 위한 범용
						Mutation 훅 함수입니다.
					</p>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						서버 상태 데이터를 변경할 수 있습니다.
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
								Basic useApiMutation
							</h2>
							<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
								&nbsp;
							</div>
						</div>
						<ul className="list-disc list-inside text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<li>
								Client Component의 함수 본문(최 상단)에 <strong>useApiMutation</strong> 훅 코드를 추가합니다.
							</li>
							<li>useApiMutation을 사용하여 함수 컴포넌트 최상단에 useApiMutation 훅을 추가합니다.</li>
							<li>버튼을 누르면 useApiMutation 인스턴스의 mutate 메서드를 호출하여 서버 상태 데이터를 변경합니다.</li>
						</ul>
					</div>
					<div className="w-full flex-1 py-4">{basicUseApiMutationDemo}</div>
					<Separator className="my-2" />

					{/* example 블럭요서 END */}
				</div>
			</div>
		</div>
	);
}
