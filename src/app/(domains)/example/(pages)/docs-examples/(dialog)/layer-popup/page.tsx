'use client';

import { JSX, useEffect, useRef, useState } from 'react';
import loadable from '@loadable/component';
import { Separator } from '@/core/components/shadcn/ui/separator';
import { Button } from '@components/ui';
import { CodeBlockClient } from '@components/ui';
import { IDialogControl } from '@app-types/components';

const EditProfileDialog = loadable(() => import('./EditProfileDialog'));

export interface ILayerPopupExProps {
	//
}

export default function LayerPopupEx({}: ILayerPopupExProps): JSX.Element {
	const [test] = useState<string>('test111');
	const dialog = useRef<IDialogControl<any>>(null);

	useEffect(() => {
		console.log('test:', test);
		dialog.current?.update({ test });
	}, [test]);

	// 기본 사용법 - Promise 기반
	const handlerOpenLayerPopup = async () => {
		console.log('handlerOpenLayerPopup ($ui.dialog):::', $ui.dialog);
		dialog.current = $ui.dialog({
			component: EditProfileDialog,
			title: '프로필 편집',
			description: '여기에서 프로필을 변경하세요.',
			props: {},
			footer: {
				confirmText: '확인',
				cancelText: '취소',
			},
			onConfirm: (data?: any) => {
				console.log('확인됨:', data);
			},
			onCancel: (data?: any) => {
				console.log('취소됨:', data);
			},
		});

		const result = await dialog.current?.promise;
		console.log('Dialog result:', result);
		if (result.action === 'confirm') {
			console.log('확인됨:', result.data);
		} else if (result.action === 'close') {
			console.log('닫기 버튼 클릭');
		} else if (result.action === 'cancel') {
			console.log('ESC 또는 오버레이 클릭');
		}
	};

	return (
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="h-(--top-spacing) shrink-0" />
			<div className="mx-auto flex w-full  min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
				<div className="flex flex-col gap-2">
					<div className="flex items-start justify-between">
						<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
							레이어 팝업 예제
						</h1>
						<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
							&nbsp;
						</div>
					</div>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						현재 화면은 <strong>Client Component</strong>입니다.
					</p>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						레이어 팝업은 <strong>Client Component</strong>에서만 사용할 수 있습니다.
					</p>
				</div>
				<div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
					{/* 폼 제출 흐름도 블럭요서 START */}
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
					{/* 폼 제출 흐름도 블럭요서 END */}

					<Separator className="my-6" />
					{/* example 블럭요서 START */}
					<div className="flex flex-col gap-2 pt-6">
						<div className="flex items-start justify-between">
							<h2
								data-shorcut="true"
								className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
							>
								$ui.dialog 사용 예제
							</h2>
							<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
								&nbsp;
							</div>
						</div>
						<ul className="list-disc list-inside text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<li>레이어 팝업의 컨텐츠는 EditProfileDialog.tsx 컴포넌트를 사용합니다.</li>
							<li>
								EditProfileDialog.tsx 컨텐츠 컴포넌트는 <strong>팝업의 헤더와 푸터를 제외한 내용만</strong>{' '}
								포함해야합니다.
							</li>
							<li>
								<strong>$ui.dialog()</strong>는 <strong>IDialogControl</strong> 객체를 반환하며, 이를 통해{' '}
								<strong>update()</strong> 메서드로 props를 동적으로 업데이트할 수 있습니다.
							</li>
						</ul>
					</div>

					<div className="w-full flex-1 py-4">
						<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
							<div className="w-full mx-auto my-5 p-6">
								<strong>버튼을 클릭하면 레이어 팝업이 열립니다.</strong>
								<Separator className="my-4" />
								{/* posts 데이터 화면에 표시 영역 */}
								<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
									<Button onClick={handlerOpenLayerPopup}>레이어 팝업 열기</Button>
									{/*{Array.isArray(postsData) && postsData.length > 0 ? (
										postsData.slice(0, 10).map((post: any) => (
											<Link
												key={post.id}
												href={`/example/docs-examples/intercept-modal-demo/detail/post?id=${post.id}`}
												className="group block p-4 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all dark:border-neutral-700 dark:hover:border-neutral-600"
											>
												<div className="flex flex-col gap-2">
													<div className="flex items-center justify-between">
														<span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
															#{post.id}
														</span>
														<span className="text-xs text-neutral-400 dark:text-neutral-500">User {post.UserId}</span>
													</div>
													<h3 className="font-semibold text-neutral-800 group-hover:text-blue-600 transition-colors dark:text-neutral-200 dark:group-hover:text-blue-400 line-clamp-2">
														{post.title}
													</h3>
													<p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">{post.content}</p>
												</div>
											</Link>
										))
									) : (
										<p className="text-neutral-500 dark:text-neutral-400">포스트가 없습니다.</p>
									)}*/}
								</div>
							</div>
							<CodeBlockClient
								code={`// ========================================================
// page.tsx (Client Component)
// 레이어 팝업 띄우기
// ========================================================
'use client';

import { Button } from '@components/ui';
import loadable from '@loadable/component';
const EditProfileDialog = loadable(() => import('./EditProfileDialog'));

function SamplePage() {
	const dialog = useRef<IDialogControl<any>>(null);
	
	// 기본 사용법
	const handlerOpenLayerPopup = async () => {
		// $ui.dialog는 IDialogControl 객체를 반환합니다
		dialog.current = $ui.dialog({
			component: EditProfileDialog,
			title: '프로필 편집',
			description: '여기에서 프로필을 변경하세요.',
			props: { test: 'Hello' }, // EditProfileDialog 컴포넌트에 전달할 프로퍼티
		});

		// promise로 팝업 닫힘 결과를 기다립니다
		const result = await dialog.current?.promise;
		if (result.action === 'confirm') {
			console.log('확인됨:', result.data);
		} else if (result.action === 'close') {
			console.log('닫기 버튼 클릭');
		} else if (result.action === 'cancel') {
			console.log('ESC 또는 오버레이 클릭');
		}
	};

	return (
		<div>
			<Button onClick={handlerOpenLayerPopup}>레이어 팝업 열기</Button>
		</div>
	);
}

// ========================================================
// EditProfileDialog.tsx (Client Component)
// ========================================================
'use client';

import type { JSX } from 'react';
import { Button, Input } from '@components/ui';

interface IEditProfileDialogProps {
	onClose: () => void;
}

export default function EditProfileDialog({ onClose }: IEditProfileDialogProps): JSX.Element {
	return (
		<>
			<div className="space-y-4">
				<div className="space-y-2 max-h-80 overflow-y-auto">
					<div className="grid gap-4">
						<div className="grid gap-3">
							<label htmlFor="name-1">Name</label>
							<Input
								id="name-1"
								name="name"
								defaultValue="홍길동"
							/>
						</div>
						<div className="grid gap-3">
							<label htmlFor="username-1">Username</label>
							<Input
								id="username-1"
								name="username"
								defaultValue="@hong"
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-end">
					<Button onClick={onClose}>닫기</Button>
				</div>
			</div>
		</>
	);
}
// ========================================================`}
								lang="tsx"
							/>
						</div>
					</div>
					{/* example 블럭요서 END */}
				</div>
			</div>
		</div>
	);
}
