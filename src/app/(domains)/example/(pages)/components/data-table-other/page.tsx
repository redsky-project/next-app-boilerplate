import type { JSX } from 'react';

//import { Separator } from '@/core/components/shadcn/ui/separator';
import { DataTableList } from './_components/DataTableList';
//import { ToCamelCase } from './_components/ToCamelCase';

interface IComponentsDataTableOtherProps {
	//test?: string;
}

export default function ComponentsDataTableOther({}: IComponentsDataTableOtherProps): JSX.Element {
	return (
		<>
			<div className="flex min-w-0 flex-1 flex-col">
				<div className="h-(--top-spacing) shrink-0" />
				<div className="mx-auto flex w-full  min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
					<div className="flex flex-col gap-2">
						<div className="flex items-start justify-between">
							<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
								DataTable 여러가지 기능 예제
							</h1>
							<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
								&nbsp;
							</div>
						</div>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							다양한 DataTable 컴포넌트 사용 예제입니다.
						</p>
					</div>
					<div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
						{/*<Separator className="my-6" />*/}
						{/* example 블럭요소 START */}
						<div className="w-full flex-1 py-4">
							<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
								<DataTableList />
							</div>
						</div>
						{/* example 블럭요소 END */}
						{/* example 블럭요소 START */}
						{/* $utils.string.toCamelCase 함수 사용 예제 start */}
						{/*<ToCamelCase />*/}
						{/* $utils.string.toCamelCase 함수 사용 예제 end */}
						{/* example 블럭요소 END */}
					</div>
				</div>
			</div>
		</>
	);
}
