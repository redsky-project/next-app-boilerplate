'use client';

import { JSX } from 'react';
import Image from 'next/image';

import { Separator } from '@/core/components/shadcn/ui/separator';
import { CodeBlockClient } from '@components/ui';
import { useFormAction } from '@hooks/api';
import { todosAction } from '@/app/(domains)/example/_action/todosActionClient';

import clientFormUseFormAction01 from '@/assets/images/example/form/clientFormUseFormAction01.svg';

export interface IServerFormExProps {
	//
}

export default function ServerFormEx({}: IServerFormExProps): JSX.Element {
	const { loading, data, error, submitAction } = useFormAction(todosAction);

	// form 제출 (useFormAction hook 사용) START ================================================
	// form의 onSubmit 이벤트 처리 핸들러
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // 기본 폼 제출 방지

		// FormData 직접 생성
		const formData = new FormData(e.currentTarget);
		// submitAction 함수 실행
		await submitAction(formData);
	};
	// form 제출 (useFormAction hook 사용) END ==================================================

	return (
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="h-(--top-spacing) shrink-0" />
			<div className="mx-auto flex w-full  min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
				<div className="flex flex-col gap-2">
					<div className="flex items-start justify-between">
						<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
							Form 전송 (useFormAction)
						</h1>
						<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
							&nbsp;
						</div>
					</div>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						현재 화면은 <strong>Client Component</strong>입니다.
					</p>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						<strong>Client Component</strong>에서 <strong>FormData</strong> 제출을 위한 방법으로{' '}
						<strong>useFormAction</strong>을 사용한 예제입니다.
					</p>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						<strong>useFormAction</strong> 훅 함수는 <strong>next-app-boilerplate</strong> 프로젝트에서 자체적으로
						제공하는 커스텀 훅 입니다. 폼 제출 처리 로직을 간결하게 구현할 수 있습니다.
					</p>
				</div>
				<div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
					{/* 폼 제출 흐름도 블럭요서 START */}
					<div className="w-full flex-1 py-4">
						<h2
							data-shorcut="true"
							className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
						>
							폼 전송 흐름도
						</h2>

						<div className="flex justify-start py-1">
							<Image
								src={clientFormUseFormAction01}
								alt="Server Form Diagram"
								width={700}
								height={500}
							/>
						</div>
					</div>
					{/* 폼 제출 흐름도 블럭요서 END */}
					<Separator className="my-6" />
					{/* example 블럭요서 START */}
					<div className="flex flex-col gap-2 pt-6">
						<div className="flex items-start justify-between">
							<h2
								data-shorcut="true"
								className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
							>
								폼 전송 예제
							</h2>
							<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
								&nbsp;
							</div>
						</div>
						{/*<ul className="list-disc list-inside text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<li>Server Component에서 Form을 전송하고, Server Action에서 Form을 처리하는 예제입니다.</li>
						</ul>*/}
					</div>
					<div className="flex flex-col gap-2 pt-6">
						{/*<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							API 응답값은 <strong>쿠키</strong>에 저장하거나 <strong>query parameter</strong>로 전달할 수 있으며, 이후{' '}
							<strong>redirect</strong> 함수를 사용하여 페이지를 이동하고 결과를 표시합니다. 프로젝트 상황에 따라 두
							가지 중 하나를 선택하면 됩니다.
						</p>*/}
					</div>
					<div className="w-full flex-1 py-4">
						<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
							<div className="w-full max-w-md mx-auto my-5 p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800">
								<strong>할일 등록</strong>
								<Separator className="my-1" />
								<form
									className="flex flex-col gap-5"
									onSubmit={handleSubmit}
								>
									<div>
										<label
											htmlFor="id"
											className="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-200"
										>
											ID <span className="text-red-600">*</span>
										</label>
										<input
											id="id"
											name="id"
											type="text"
											placeholder="1"
											className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
											required
											defaultValue="1"
											readOnly
										/>
									</div>
									<div>
										<label
											htmlFor="title"
											className="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-200"
										>
											제목 <span className="text-red-600">*</span>
										</label>
										<input
											id="title"
											name="title"
											type="text"
											defaultValue="제목 1"
											placeholder="제목을 입력하세요"
											className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
											required
										/>
									</div>
									<div>
										<label
											htmlFor="content"
											className="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-200"
										>
											내용 <span className="text-red-600">*</span>
										</label>
										<textarea
											id="content"
											name="content"
											defaultValue={'내용 1'}
											placeholder="내용을 입력하세요"
											rows={4}
											className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
											required
										/>
									</div>
									<button
										type="submit"
										className="mt-0 w-full py-2 px-4 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
									>
										{loading ? '전송 중...' : 'POST 요청 보내기'}
									</button>
								</form>
								{/*<div className="mt-4 text-xs text-neutral-500 dark:text-neutral-400 text-center">
									폼 제출 시 서버로 FormData(id, title, body)를 전송합니다.
								</div>*/}
								<div className="mt-4">
									<div className="flex flex-col md:flex-row gap-4">
										<div className="flex-1 p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-900">
											<div className="font-semibold mb-1 text-sm text-sky-700 dark:text-sky-300 flex flex-col items-start gap-0.5">
												<span>폼 제출 결과</span>
												<span className="text-xs text-neutral-500">(result)</span>
											</div>
											<pre className="whitespace-pre-wrap text-sm text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 rounded-md p-2 border border-neutral-200 dark:border-neutral-700 overflow-x-auto">
												{data ? (
													(() => {
														try {
															return JSON.stringify(data, null, 2);
														} catch {
															return <span className="text-neutral-400">결과 없음</span>;
														}
													})()
												) : (
													<span className="text-neutral-400">
														결과 없음{error ? JSON.stringify(error, null, 2) : ''}
													</span>
												)}
											</pre>
										</div>
									</div>
								</div>
							</div>
							<CodeBlockClient
								code={`// ========================================================
// SamplePage.tsx
// ========================================================
'use client';

import { useState } from 'react';
import { todosAction } from './todosAction';
import { useFormAction } from '@hooks/api';

function SamplePage({ searchParams }) {
	const { loading, data, error, submitAction, reset } = useFormAction(todosAction);

	// form의 onSubmit 이벤트 처리 핸들러
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // 기본 폼 제출 방지

		// FormData 직접 생성
		const formData = new FormData(e.currentTarget);
		// submitAction 함수 실행
		await submitAction(formData);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input name="id" defaultValue="1" />
				<input name="title" defaultValue="제목 1" />
				<textarea name="body" defaultValue="내용 1" />
				<button type="submit">{loading ? '전송 중...' : 'POST 요청 보내기'}</button>
			</form>
			{/* 폼 제출 결과 표시 부분 */}
			<pre>
				{data ? (
					(() => {
						try {
							return JSON.stringify(data, null, 2);
						} catch {
							return <span className="text-neutral-400">결과 없음</span>;
						}
					})()
				) : (
					<span className="text-neutral-400">결과 없음</span>
				)}
			</pre>
		</div>
	);
}
	
// ========================================================
// todosAction.ts (Server Action)
// ========================================================
'use server';

import { serverApi } from '@fetch/server-api';

export async function todosAction(formData: FormData) {
	const url = 'https://koreanjson.com/todos';
	// 폼 데이터 파싱
	const title = formData.get('title') as string;
	const content = formData.get('content') as string;
	const id = formData.get('id') as string;

	// 방법 2: - Object.fromEntries()
	//const rawData = Object.fromEntries(formData);
	//const { title, body, id } = rawData as { title: string; body: string; id: string };

	console.log('Received:', { title, content, id });

	try {
		// serverApi 호출 (Server Action)
		// Next.js Server Action에서는 FormData를 직접 전달할 수 있습니다.
		// serverApi 내부의 fetch가 FormData를 감지하여 자동으로 Content-Type: multipart/form-data를 설정합니다.
		const res = await serverApi<any>(url, {
			method: 'POST',
			body: formData,
			cache: 'no-store',
		});

		// 성공 처리
		if (res.data) {
			// 성공 응답
			return { success: true, message: '할일이 추가되었습니다.', data: res.data };
		}
	} catch (err) {
		// NEXT_REDIRECT 에러는 정상적인 redirect 동작이므로 다시 throw
		// redirect()는 내부적으로 에러를 throw하여 작동하므로 이를 다시 throw해야 함
		if (
			err &&
			typeof err === 'object' &&
			'digest' in err &&
			typeof err.digest === 'string' &&
			err.digest.startsWith('NEXT_REDIRECT')
		) {
			throw err;
		}
		console.error('API Error:', err);
		return { success: false, message: '폼이 제출되지 않았습니다.', data: null };
	} finally {
		//setIsLoading(false);
	}
	return { success: false, message: '폼이 제출되지 않았습니다.', data: null };
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
