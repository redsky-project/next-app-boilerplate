import type { JSX } from 'react';

import { Separator } from '@/core/components/shadcn/ui/separator';
import { CodeBlockClient, Badge, Button, Icon } from '@components/ui';
import Link from 'next/link';
//import ButtonClick from './_component/ButtonClick';

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
							<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">Badge</h1>
							<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
								&nbsp;
							</div>
						</div>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							현재 화면은 <strong>Server Component</strong>입니다.
						</p>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<strong>Badge</strong> 컴포넌트는 <strong>Server Component, Client Component</strong> 모두 사용할 수
							있습니다. 상황에 맞게 사용하면 됩니다.
						</p>
					</div>
					<div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
						<Separator className="my-6" />
						{/* example 블럭요서 START */}
						<div className="flex flex-col gap-2 pt-6">
							<div className="flex items-start justify-between">
								<h2
									data-shorcut="true"
									className="scroll-m-20 text-3xl font-semibold tracking-tight sm:text-3xl xl:text-3xl"
								>
									Basic Badge
								</h2>
								<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
									&nbsp;
								</div>
							</div>
							<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
								<strong>Badge</strong> 컴포넌트를 사용하는 <strong>가장 기본적인 형태</strong>입니다.
							</p>
						</div>
						<div className="w-full flex-1 py-4">
							<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
								<div className="flex w-full flex-wrap justify-center gap-2">
									<Badge>Badge</Badge>
									<Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
									<Badge
										className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
										variant="destructive"
									>
										99
									</Badge>
								</div>
							</div>
							<CodeBlockClient
								lang="tsx"
								code={`import { Badge } from '@components/ui';

function SamplePage() {
	return (
		<div className="flex w-full flex-wrap justify-center gap-2">
			<Badge>Badge</Badge>
			<Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
			<Badge
				className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
				variant="destructive"
			>
				99
			</Badge>
		</div>
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
								<strong>variant</strong> 속성은 배지의 시각적 스타일(색상, 배경, 테두리 등)을 결정하는 속성입니다.
							</p>
							<ul className="text-muted-foreground text-[1.05rem] text-balance sm:text-base border-l-2 border-l-neutral-200 overflow-hidden dark:border-l-neutral-800 px-2 py-0">
								<li>
									<strong>default</strong> : 기본 배지 스타일
								</li>
								<li>
									<strong>secondary</strong> : 보조 배지 스타일
								</li>
								<li>
									<strong>destructive</strong> : 삭제/파괴적인 액션에 사용되는 빨간색 계열
								</li>
								<li>
									<strong>outline</strong> : 테두리만 있는 스타일
								</li>
								<li>
									<strong>ghost</strong> : 배경이 투명한 스타일
								</li>
								<li>
									<strong>link</strong> : 링크처럼 보이는 스타일 (밑줄 포함)
								</li>
							</ul>
						</div>
						<div className="w-full flex-1 py-4">
							<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
								<div className="flex w-full flex-wrap justify-center gap-2">
									<Badge variant="default">default</Badge>
									<Badge variant="outline">outline</Badge>
									<Badge variant="ghost">ghost</Badge>
									<Badge variant="destructive">destructive</Badge>
									<Badge variant="secondary">secondary</Badge>
									<Badge variant="link">link</Badge>
								</div>
							</div>
							<CodeBlockClient
								lang="tsx"
								code={`import { Badge } from '@components/ui';

function SamplePage() {
	return (
		<div className="flex w-full flex-wrap justify-center gap-2">
			<Badge variant="default">default</Badge>
			<Badge variant="outline">outline</Badge>
			<Badge variant="ghost">ghost</Badge>
			<Badge variant="destructive">destructive</Badge>
			<Badge variant="secondary">secondary</Badge>
			<Badge variant="link">link</Badge>
		</div>
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
									텍스트와 함께 사용
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
								<strong>Badge</strong> 컴포넌트는 텍스트와 함께 사용하여 알림 개수, 상태 표시, 태그 등을 표현할 수
								있습니다.
							</p>
						</div>
						<div className="w-full flex-1 py-4">
							<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
								<div className="flex flex-col gap-4">
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium">알림</span>
										<Badge variant="default">3</Badge>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium">프로젝트 상태:</span>
										<Badge variant="secondary">진행 중</Badge>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium">오류:</span>
										<Badge variant="destructive">5개 발견</Badge>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium">태그:</span>
										<Badge variant="outline">React</Badge>
										<Badge variant="outline">TypeScript</Badge>
										<Badge variant="outline">Next.js</Badge>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-sm">더 보기</span>
										<Badge variant="link">상세 정보</Badge>
									</div>
								</div>
							</div>
							<CodeBlockClient
								lang="tsx"
								code={`import { Badge } from '@components/ui';

function SamplePage() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<span className="text-sm font-medium">알림</span>
				<Badge variant="default">3</Badge>
			</div>
			<div className="flex items-center gap-2">
				<span className="text-sm font-medium">프로젝트 상태:</span>
				<Badge variant="secondary">진행 중</Badge>
			</div>
			<div className="flex items-center gap-2">
				<span className="text-sm font-medium">오류:</span>
				<Badge variant="destructive">5개 발견</Badge>
			</div>
			<div className="flex items-center gap-2">
				<span className="text-sm font-medium">태그:</span>
				<Badge variant="outline">React</Badge>
				<Badge variant="outline">TypeScript</Badge>
				<Badge variant="outline">Next.js</Badge>
			</div>
			<div className="flex items-center gap-2">
				<span className="text-sm">더 보기</span>
				<Badge variant="link">상세 정보</Badge>
			</div>
		</div>
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
								<strong>Badge</strong> 컴포넌트는 아이콘과 함께 사용할 수 있습니다.
							</p>
						</div>
						<div className="w-full flex-1 py-4">
							<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
								<div className="flex w-full flex-wrap justify-center gap-2">
									<Badge variant="secondary">
										<Icon
											name="BadgeCheck"
											data-icon="inline-start"
										/>
										Verified
									</Badge>
									<Badge variant="default">
										<Icon
											name="Star"
											data-icon="inline-start"
										/>
										Premium
									</Badge>
									<Badge variant="destructive">
										<Icon
											name="AlertCircle"
											data-icon="inline-start"
										/>
										Error
									</Badge>
									<Badge variant="outline">
										<Icon
											name="Tag"
											data-icon="inline-start"
										/>
										New
									</Badge>
									<Badge variant="ghost">
										<Icon
											name="TrendingUp"
											data-icon="inline-start"
										/>
										Trending
									</Badge>
									<Badge variant="secondary">
										Completed
										<Icon
											name="CheckCircle"
											data-icon="inline-end"
										/>
									</Badge>
								</div>
							</div>
							<CodeBlockClient
								lang="tsx"
								code={`import { Badge, Icon } from '@components/ui';

function SamplePage() {
	return (
		<div className="flex w-full flex-wrap justify-center gap-2">
			<Badge variant="secondary">
				<Icon name="BadgeCheck" data-icon="inline-start" />
				Verified
			</Badge>
			<Badge variant="default">
				<Icon name="Star" data-icon="inline-start" />
				Premium
			</Badge>
			<Badge variant="destructive">
				<Icon name="AlertCircle" data-icon="inline-start" />
				Error
			</Badge>
			<Badge variant="outline">
				<Icon name="Tag" data-icon="inline-start" />
				New
			</Badge>
			<Badge variant="ghost">
				<Icon name="TrendingUp" data-icon="inline-start" />
				Trending
			</Badge>
			<Badge variant="secondary">
				Completed
				<Icon name="CheckCircle" data-icon="inline-end" />
			</Badge>
		</div>
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
									링크 스타일 적용
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
								<strong>Badge</strong> 컴포넌트는 <strong>asChild</strong> 속성을 사용하여 <strong>링크</strong>로
								사용할 수 있습니다.
							</p>
						</div>
						<div className="w-full flex-1 py-4">
							<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
								<div className="flex w-full flex-wrap justify-center gap-2">
									<Badge asChild>
										<a href="#link">
											Open Link
											<Icon
												name="ArrowUpRight"
												data-icon="inline-end"
											/>
										</a>
									</Badge>
									<Badge
										asChild
										variant="secondary"
									>
										<a href="#documentation">
											<Icon
												name="FileText"
												data-icon="inline-start"
											/>
											Documentation
										</a>
									</Badge>
									<Badge
										asChild
										variant="outline"
									>
										<a href="#download">
											<Icon
												name="Download"
												data-icon="inline-start"
											/>
											Download
										</a>
									</Badge>
									<Badge
										asChild
										variant="destructive"
									>
										<a href="#delete">
											<Icon
												name="Trash2"
												data-icon="inline-start"
											/>
											Delete
										</a>
									</Badge>
									<Badge asChild>
										<a
											href="https://example.com"
											target="_blank"
											rel="noopener noreferrer"
										>
											External
											<Icon
												name="ExternalLink"
												data-icon="inline-end"
											/>
										</a>
									</Badge>
								</div>
							</div>
							<CodeBlockClient
								lang="tsx"
								code={`import { Badge, Icon } from '@components/ui';

function SamplePage() {
	return (
		<div className="flex w-full flex-wrap justify-center gap-2">
			<Badge asChild>
				<a href="#link">
					Open Link
					<Icon name="ArrowUpRight" data-icon="inline-end" />
				</a>
			</Badge>
			<Badge asChild variant="secondary">
				<a href="#documentation">
					<Icon name="FileText" data-icon="inline-start" />
					Documentation
				</a>
			</Badge>
			<Badge asChild variant="outline">
				<a href="#download">
					<Icon name="Download" data-icon="inline-start" />
					Download
				</a>
			</Badge>
			<Badge asChild variant="destructive">
				<a href="#delete">
					<Icon name="Trash2" data-icon="inline-start" />
					Delete
				</a>
			</Badge>
			<Badge asChild>
				<a href="https://example.com" target="_blank" rel="noopener noreferrer">
					External
					<Icon name="ExternalLink" data-icon="inline-end" />
				</a>
			</Badge>
		</div>
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
