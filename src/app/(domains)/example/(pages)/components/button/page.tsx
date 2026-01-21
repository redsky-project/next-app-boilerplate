import type { JSX } from 'react';

import { Separator } from '@/core/components/shadcn/ui/separator';
import { CodeBlockClient, Button, Icon, Input } from '@components/ui';
import Link from 'next/link';
import ButtonClick from './_component/ButtonClick';

interface IButtonExProps {
	//test?: string;
}

export default function ButtonEx({}: IButtonExProps): JSX.Element {
	return (
		<>
			<div className="flex min-w-0 flex-1 flex-col">
				<div className="h-(--top-spacing) shrink-0" />
				<div className="mx-auto flex w-full  min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
					<div className="flex flex-col gap-2">
						<div className="flex items-start justify-between">
							<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">Button</h1>
							<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
								&nbsp;
							</div>
						</div>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							현재 화면은 <strong>Server Component</strong>입니다.
						</p>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<strong>Button</strong> 컴포넌트는 <strong>Server Component, Client Component</strong> 모두 사용할 수 있습니다. 상황에 맞게 사용하면 됩니다.
						</p>
					</div>
					<div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
						{/*<Alert>
							<AlertCircleIcon />
							<AlertTitle>업데이트 정보 :</AlertTitle>
							<AlertDescription>
								<p>Please verify your billing information and try again.</p>
								<ul className="list-inside list-disc text-sm">
									<li>Check your card details</li>
									<li>Ensure sufficient funds</li>
									<li>Verify billing address</li>
								</ul>
							</AlertDescription>
						</Alert>*/}
						<Separator className="my-6" />
						{/* example 블럭요서 START */}
						<div className="flex flex-col gap-2 pt-6">
							<div className="flex items-start justify-between">
								<h2
									data-shorcut="true"
									className="scroll-m-20 text-3xl font-semibold tracking-tight sm:text-3xl xl:text-3xl"
								>
									Basic Button
								</h2>
								<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
									&nbsp;
								</div>
							</div>
							<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
								<strong>Button</strong> 컴포넌트를 사용하는 <strong>가장 기본적인 형태</strong>입니다.
							</p>
						</div>
						<div className="w-full flex-1 py-4">
							<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
								<Button>Button</Button>
							</div>
							<CodeBlockClient
								lang="tsx"
								code={`import { Button } from '@components/ui';

function SamplePage() {
	return (
		<Button>Button</Button>
	);
}`}
							/>
						</div>
						{/* example 블럭요서 END */}
						{/* example 블럭요서 START */}
						<div className="flex flex-col gap-2 pt-6">
							<div className="flex items-start justify-between">
								<h3
									data-shorcut="true"
									className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
								>
									variant 속성 변경
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
							<strong>variant</strong> 속성은 버튼의 시각적 스타일(색상, 배경, 테두리 등)을 결정하는 속성입니다.
							</p>
							<ul className="text-muted-foreground text-[1.05rem] text-balance sm:text-base border-l-2 border-l-neutral-200 overflow-hidden dark:border-l-neutral-800 px-2 py-0">
								<li><strong>default</strong> : 기본 버튼 스타일</li>
								<li><strong>destructive</strong> : 삭제/파괴적인 액션에 사용되는 빨간색 계열</li>
								<li><strong>outline</strong> : 테두리만 있는 스타일</li>
								<li><strong>secondary</strong> : 보조 버튼 스타일</li>
								<li><strong>ghost</strong> : 배경이 투명한 스타일</li>
								<li><strong>link</strong> : 링크처럼 보이는 스타일 (밑줄 포함)</li>
								<li><strong>success</strong> : 상태를 나타내는 색상 (초록)</li>
								<li><strong>warning</strong> : 상태를 나타내는 색상 (주황)</li>
								<li><strong>info</strong> : 상태를 나타내는 색상 (파랑)</li>
								<li><strong>purple</strong> : 추가 purple색상 옵션</li>
								<li><strong>pink</strong> : 추가 pink 색상 옵션</li>
								<li><strong>indigo</strong> : 추가 indigo 색상 옵션</li>
								<li><strong>teal</strong> : 추가 teal 색상 옵션</li>
							</ul>
						</div>
						<div className="w-full flex-1 py-4">
							<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
									<Button variant="default"
										className="mr-1 mb-1">default</Button>
									<Button variant="outline"
										className="mr-1 mb-1">outline</Button>
									<Button variant="ghost"
										className="mr-1 mb-1">ghost</Button>
									<Button variant="destructive"
										className="mr-1 mb-1">destructive</Button>
									<Button variant="secondary"
										className="mr-1">secondary</Button>
									<Button variant="link"
										className="mr-1 mb-1">link</Button>
									<Button variant="success"
										className="mr-1 mb-1">success</Button>
									<Button variant="warning"
										className="mr-1 mb-1">warning</Button>
									<Button variant="info"
										className="mr-1 mb-1">info</Button>
									<Button variant="purple"
										className="mr-1 mb-1">purple</Button>
									<Button variant="pink"
										className="mr-1 mb-1">pink</Button>
									<Button variant="indigo"
										className="mr-1 mb-1">indigo</Button>
									<Button variant="teal"
										className="mr-1 mb-1">teal</Button>
							</div>
							<CodeBlockClient
								lang="tsx"
								code={`import { Button } from '@components/ui';

function SamplePage() {
	return (
		<Button variant="default">default</Button>
		<Button variant="outline">outline</Button>
		<Button variant="ghost">ghost</Button>
		<Button variant="destructive">destructive</Button>
		<Button variant="secondary">secondary</Button>
		<Button variant="link">link</Button>
		<Button variant="success">success</Button>
		<Button variant="warning">warning</Button>
		<Button variant="info">info</Button>
		<Button variant="purple">purple</Button>
		<Button variant="pink">pink</Button>
		<Button variant="indigo">indigo</Button>
		<Button variant="teal">teal</Button>
	);
}`}
							/>
						</div>
						{/* example 블럭요서 END */}
						{/* example 블럭요서 START */}
						<div className="flex flex-col gap-2 pt-6">
							<div className="flex items-start justify-between">
								<h3
									data-shorcut="true"
									className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
								>
									size 변경
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
							<strong>size</strong> 속성은 버튼의 크기를 적용하는 속성입니다.
							</p>
							<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
								<strong>"icon-*"</strong> 속성값은 <strong>아이콘 전용 버튼</strong>일 때만 사용합니다.
							</p>
							<ul className="text-muted-foreground text-[1.05rem] text-balance sm:text-base border-l-2 border-l-neutral-200 overflow-hidden dark:border-l-neutral-800 px-2 py-0">
								<li><strong>default</strong> : 기본 버튼 크기</li>
								<li><strong>sm</strong> : 작은 버튼 크기</li>
								<li><strong>lg</strong> : 큰 버튼 크기</li>
								<li><strong>xl</strong> : 더 큰 버튼 크기</li>
								<li><strong>2xl</strong> : 추가 더 큰 버튼 크기</li>
								<li><strong>xs</strong> : 가장 작은 버튼 크기</li>
								<li><strong>icon</strong> : 아이콘 버튼 크기</li>
								<li><strong>icon-sm</strong> : 작은 아이콘 버튼 크기</li>
								<li><strong>icon-lg</strong> : 큰 아이콘 버튼 크기</li>
							</ul>
						</div>
						<div className="w-full flex-1 py-4">
							<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
							<Button size="xs"
								className="mr-1 mb-1">버튼(xs)</Button>
							<Button size="sm"
								className="mr-1 mb-1">버튼(sm)</Button>
							<Button size="default"
								className="mr-1 mb-1">버튼(default)</Button>
							<Button size="lg"
								className="mr-1 mb-1">버튼(lg)</Button>
							<Button size="xl"
								className="mr-1 mb-1">버튼(xl)</Button>
							<Button size="2xl"
								className="mr-1 mb-1">버튼(2xl)</Button>
							<Button size="icon-sm"
								className="mr-1 mb-1">
								<Icon name="Search" />
							</Button>
							<Button size="icon"
								className="mr-1 mb-1">
								<Icon name="Search" />
							</Button>
							<Button size="icon-lg"
								className="mr-1 mb-1">
								<Icon name="Search" />
							</Button>
							</div>
							<CodeBlockClient
								lang="tsx"
								code={`import { Button, Icon } from '@components/ui';

function SamplePage() {
	return (
		<Button size="xs">버튼(xs)</Button>
		<Button size="sm">버튼(sm)</Button>
		<Button size="default">버튼(default)</Button>
		<Button size="lg">버튼(lg)</Button>
		<Button size="xl">버튼(xl)</Button>
		<Button size="2xl">버튼(2xl)</Button>
		<Button size="icon-sm">
			<Icon name="Search" />
		</Button>
		<Button size="icon">
			<Icon name="Search" />
		</Button>
		<Button size="icon-lg">
			<Icon name="Search" />
		</Button>
	);
}`}
							/>
						</div>
						{/* example 블럭요서 END */}
						{/* example 블럭요소 START */}
						<div className="flex flex-col gap-2 pt-6">
							<div className="flex items-start justify-between">
								<h3
									data-shorcut="true"
									className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
								>
									아이콘과 함께 사용
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
								아이콘과 레이블이 있는 버튼은 버튼의 시작이나 끝에 아이콘을 추가하여 시각적 강조를 더할 수 있습니다.
							</p>
						</div>
						<div className="w-full flex-1 py-4">
							<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
								<Button className="mr-1 mb-1">
									<Icon name="Save" />
									버튼
								</Button>
								<Button variant="outline"
									className="mr-1 mb-1">
									<Icon name="Trash2" />
									버튼
								</Button>
								<Button variant="destructive"
								className="mr-1 mb-1">
									<Icon name="Download" />
									버튼
									<Icon name="Download" />
								</Button>
							</div>
							<CodeBlockClient
								lang="tsx"
								code={`import { Button, Icon } from '@components/ui';

function SamplePage() {
	return (
		<Button>
			<Icon name="Save" />
			버튼
		</Button>
		<Button variant="outline">
			<Icon name="Trash2" />
			버튼
		</Button>
		<Button variant="destructive">
			<Icon name="Download" />
			버튼
			<Icon name="Download" />
		</Button>
	);
}`}
							/>
						</div>
						{/* example 블럭요소 END */}
						{/* example 블럭요소 START */}
						<div className="flex flex-col gap-2 pt-6">
							<div className="flex items-start justify-between">
								<h3
									data-shorcut="true"
									className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
								>
									아이콘 전용 버튼
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
							<strong>Button</strong> 컴포넌트는 <strong>아이콘 전용 버튼</strong>으로도 사용할 수 있습니다.
							</p>
						</div>
						<div className="w-full flex-1 py-4">
							<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
							<Button size="icon"
								variant="ghost"
								className="mr-1 mb-1">
								<Icon name="Settings" />
							</Button>
							<Button size="icon"
								variant="outline"
								className="mr-1 mb-1">
								<Icon name="Settings" />
							</Button>
							<Button size="icon"
								variant="destructive"
								className="mr-1 mb-1">
								<Icon name="Settings" />
							</Button>
							</div>
							<CodeBlockClient
								lang="tsx"
								code={`import { Button, Icon } from '@components/ui';

function SamplePage() {
	return (
		<Button
		  size="icon"
			variant="ghost"
		>
			<Icon name="Settings" />
		</Button>
		<Button
		  size="icon"
			variant="outline"
		>
			<Icon name="Settings" />
		</Button>
		<Button
		  size="icon"
			variant="destructive"
		>
			<Icon name="Settings" />
		</Button>
	);
}`}
							/>
						</div>
						{/* example 블럭요소 END */}
						{/* example 블럭요소 START(Client Component에서의 onClick 이벤트 처리) */}
						<ButtonClick />
						{/* example 블럭요소 END(Client Component에서의 onClick 이벤트 처리) */}
						{/* example 블럭요소 START */}
						<div className="flex flex-col gap-2 pt-6">
							<div className="flex items-start justify-between">
								<h3
									data-shorcut="true"
									className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
								>
									Server Component에서의 Form Submit 버튼 처리
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
							<strong>Server Component</strong>에서 <strong>Button</strong> 컴포넌트는 JavsScript의 이벤트 처리를 하지않고 <strong>Form</strong>의 Submit 이벤트를 처리할 수 있습니다.
							</p>
						</div>
						<div className="w-full flex-1 py-4">
							<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
								<form action="/api/submit">
									<Input
										name="email"
										type="email"
									/>
									<Button type="submit">Submit</Button>
								</form>
							</div>
							<CodeBlockClient
								lang="tsx"
								code={`import { Button, Input } from '@components/ui';

function SamplePage() {
	return (
		<form action="/api/submit">
			<Input
				name="email"
				type="email"
			/>
			<Button type="submit">Submit</Button>
		</form>
	);
}`}
							/>
						</div>
						{/* example 블럭요소 END */}
						{/* example 블럭요소 START */}
						<div className="flex flex-col gap-2 pt-6">
							<div className="flex items-start justify-between">
								<h3
									data-shorcut="true"
									className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
								>
									Server Component에서의 버튼 링크 처리
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
							<strong>Server Component</strong>에서 <strong>Button</strong> 컴포넌트로 링크를 처리할 수 있습니다.
							</p>
						</div>
						<div className="w-full flex-1 py-4">
							<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
								{/* Link와 함께 사용 (asChild 활용) */}
								<Button
									variant="outline"
									className="mr-1 mb-1"
									asChild
								>
									<Link href="/about">Go to About</Link>
								</Button>
								{/* 외부 링크 버튼 */}
								<Button
									variant="default"
									className="mr-1 mb-1"
									asChild
								>
									<a
										href="https://example.com"
										target="_blank"
										rel="noopener noreferrer"
									>
										Visit Store
									</a>
								</Button>
							</div>
							<CodeBlockClient
								lang="tsx"
								code={`import { Button } from '@components/ui';
import Link from 'next/link';

function SamplePage() {
	return (
		<>
			{/* Link와 함께 사용 (asChild 활용) */}
			<Button
				variant="outline"
				asChild
			>
				<Link href="/about">Go to About</Link>
			</Button>
			{/* 외부 링크 버튼 */}
      <Button variant="default" asChild>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Visit Store
        </a>
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
