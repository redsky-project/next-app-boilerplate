'use client';

import { JSX } from 'react';
import { CodeBlockClient, Button, Icon } from '@components/ui';

interface IButtonClickProps {}

export default function ButtonClick({}: IButtonClickProps): JSX.Element {
	return (
		<>
			<div className="flex flex-col gap-2 pt-6">
				<div className="flex items-start justify-between">
					<h3
						data-shorcut="true"
						className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
					>
						Client Component에서의 onClick 이벤트 처리
					</h3>
					<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
						&nbsp;
					</div>
				</div>
				{/*<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
					<code className="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] wrap-break-word outline-none">
					variant="default | destructive | outline | secondary | ghost | link | success | warning | info | purple | pink | indigo | teal"
					</code>
				</p>*/}
				<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
				<strong>onClick</strong> 이벤트는 Client Component에서 사용할 수 있습니다.
				</p>
			</div>
			<div className="w-full flex-1 py-4">
				<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
					<Button onClick={() => alert('Clicked!')}>
						Click Me
					</Button>
				</div>
				<CodeBlockClient
					lang="tsx"
					code={`import { Button } from '@components/ui';

function SamplePage() {
	return (
		<Button onClick={() => alert('Clicked!')}>
			Click Me
		</Button>
	);
}`}
				/>
			</div>
		</>
	);
}