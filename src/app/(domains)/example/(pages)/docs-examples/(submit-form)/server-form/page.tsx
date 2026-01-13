import { JSX } from 'react';
import { use } from 'react';
import Image from 'next/image';
import { cookies } from 'next/headers';

import { Separator } from '@/core/components/shadcn/ui/separator';
import { CodeBlockClient } from '@components/ui';
import { todosAction } from '@/app/(domains)/example/_action/todosAction';

import serverActionFlowDiagram from '@/assets/images/example/form/server-action-flow-diagram.svg';

export interface IServerFormExProps {
	searchParams?: Promise<any>;
}

export default function ServerFormEx({ searchParams }: IServerFormExProps): JSX.Element {
	const resultTodosCookie = use(cookies()).get('result_todos');
	// Next.js 15에서 searchParams는 Promise이므로 use()로 unwrap 필요
	const resolvedSearchParams = searchParams ? use(searchParams) : {};
	console.log('resolvedSearchParams', resolvedSearchParams);

	return (
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="h-(--top-spacing) shrink-0" />
			<div className="mx-auto flex w-full  min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
				<div className="flex flex-col gap-2">
					<div className="flex items-start justify-between">
						<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
							Form 전송 (Server Component + Server Actions)
						</h1>
						<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
							&nbsp;
						</div>
					</div>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						현재 화면은 <strong>Server Component</strong>입니다. 모든 처리는 <strong>Server</strong>에서 실행됩니다.
					</p>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						<strong>Server Component</strong>에서 <strong>FormData</strong>를 <strong>Server Action</strong>으로
						전달하고, <strong>Server Action</strong>에서는 <strong>FormData</strong>를 파싱하여{' '}
						<strong>REST API</strong>를 호출하는 과정의 예제입니다.
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
								src={serverActionFlowDiagram}
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
						<ul className="list-disc list-inside text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<li>Server Component에서 Form을 전송하고, Server Action에서 Form을 처리하는 예제입니다.</li>
						</ul>
					</div>
					<div className="flex flex-col gap-2 pt-6">
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							API 응답값은 <strong>쿠키</strong>에 저장하거나 <strong>query parameter</strong>로 전달할 수 있으며, 이후{' '}
							<strong>redirect</strong> 함수를 사용하여 페이지를 이동하고 결과를 표시합니다. 프로젝트 상황에 따라 두
							가지 중 하나를 선택하면 됩니다.
						</p>
					</div>
					<div className="w-full flex-1 py-4">
						<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
							<div className="w-full max-w-md mx-auto my-5 p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800">
								<strong>할일 등록</strong>
								<Separator className="my-1" />
								<form
									className="flex flex-col gap-5"
									action={todosAction as any}
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
										POST 요청 보내기
									</button>
								</form>
								{/*<div className="mt-4 text-xs text-neutral-500 dark:text-neutral-400 text-center">
									폼 제출 시 서버로 FormData(id, title, body)를 전송합니다.
								</div>*/}
								<div className="mt-4">
									<div className="flex flex-col md:flex-row gap-4">
										<div className="flex-1 p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-900">
											<div className="font-semibold mb-1 text-sm text-sky-700 dark:text-sky-300 flex flex-col items-start gap-0.5">
												<span>Cookie 결과</span>
												<span className="text-xs text-neutral-500">(쿠키에서 읽은 결과)</span>
											</div>
											<pre className="whitespace-pre-wrap text-sm text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 rounded-md p-2 border border-neutral-200 dark:border-neutral-700 overflow-x-auto">
												{resultTodosCookie ? (
													(() => {
														try {
															return JSON.stringify(JSON.parse(resultTodosCookie.value), null, 2);
														} catch {
															return resultTodosCookie.value;
														}
													})()
												) : (
													<span className="text-neutral-400">결과 없음</span>
												)}
											</pre>
										</div>
										<div className="flex-1 p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-900">
											<div className="font-semibold mb-1 text-sm text-sky-700 dark:text-sky-300 flex flex-col items-start gap-0.5">
												<span>searchParams 결과</span>
												<span className="text-xs text-neutral-500">(쿼리 파라미터 읽은 결과)</span>
											</div>
											<pre className="whitespace-pre-wrap text-sm text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 rounded-md p-2 border border-neutral-200 dark:border-neutral-700 overflow-x-auto">
												{resolvedSearchParams && Object.keys(resolvedSearchParams).length > 0 ? (
													JSON.stringify(resolvedSearchParams, null, 2)
												) : (
													<span className="text-neutral-400">없음</span>
												)}
											</pre>
										</div>
									</div>
								</div>
							</div>
							<CodeBlockClient
								code={`// ========================================================
// SamplePage.tsx
// 상황에 따라 쿠키를 사용하거나 query parameter를 사용하여 결과를 전달할 수 있습니다.
// ========================================================
import { serverApi } from '@fetch/server-api';
import { todosAction } from './todosAction'; // Server Action 파일 읽음
import { cookies } from 'next/headers';

function SamplePage({ searchParams }) {
	// 쿠키에서 결과 읽어옴 (결과 화면에서 쿠키에서 읽어옴)
	const resultTodosCookie = use(cookies()).get('result_todos');
	// Next.js 15에서 searchParams는 Promise이므로 use()로 unwrap 필요 (결과 화면에서 쿼리 파라미터를 읽어옴)
	const resolvedSearchParams = searchParams ? use(searchParams) : {};
	
	return (
		<div>
			<form action={todosAction as any}>
				<input name="id" defaultValue="1" />
				<input name="title" defaultValue="제목 1" />
				<textarea name="content" defaultValue="내용 1" />
				<button type="submit">POST 요청 보내기</button>
			</form>
			{/* 쿠키에서 읽어온 결과 표시 부분 */}
			<pre>
				{resultTodosCookie ? (
					(() => {
						try {
							return JSON.stringify(JSON.parse(resultTodosCookie.value), null, 2);
						} catch {
							return resultTodosCookie.value;
						}
					})()
				) : (
					<span>결과 없음</span>
				)}
			</pre>
			{/* 쿼리 파라미터에서 읽어온 결과 표시 부분 */}
			<pre>
				{resolvedSearchParams && Object.keys(resolvedSearchParams).length > 0 ? (
					JSON.stringify(resolvedSearchParams, null, 2)
				) : (
					<span>결과 없음</span>
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

	// FormData를 파싱하여 값을 추출합니다.
	const title = formData.get('title') as string;
	const content = formData.get('content') as string;
	const id = formData.get('id') as string;

	// FormData를 추출하는 방법으로 Object.fromEntries() 함수를 사용할 수도 있습니다.
	// const formDataObject = Object.fromEntries(formData.entries());
	// console.log('formDataObject:::', formDataObject);

	// serverApi 호출
	// formData를 직접 전달하면 serverApi가 자동으로 Content-Type: multipart/form-data를 설정합니다.
	const res = await serverApi<any>('https://jsonplaceholder.typicode.com/todos', {
		method: 'POST',
		body: formData,
		cache: 'no-store',
	});

	// api 호출 결과 성공 처리
	if (res.data) {
		// 쿠키에 결과 저장하여 전달 방법 (결과 화면에서 쿠키에서 읽어옴)
		(await cookies()).set('result_todos', JSON.stringify(res), { maxAge: 60 });

		// query parameter 포함을 위한 URLSearchParams 객체 생성 
		// (결과 화면에서 쿼리 파라미터를 읽어옴)
		const params = new URLSearchParams({
			success: 'true',
			message: '할일이 추가되었습니다.',
			status: res?.status?.toString() || '',
			id: res.data.id?.toString() || '',
		});

		// 캐시 무효화 (필요시 주석 해제)
		// 캐시 무효화는 데이터가 변경된 후, 해당 경로의 캐시를 무효화하여 최신 데이터로 페이지를 리렌더링하기 위해서 사용됩니다.
		// revalidatePath('/example/docs/server-form');
		// revalidateTag('todos'); // tag가 등록 되어 있을 경우. tag로 캐시 무효화 방법

		// redirect 함수로 페이지 이동 (query parameter 포함)
		// 다음 코드는 자기 자신의 페이지로 이동하면서 query parameter를 포함하여 이동합니다.
		redirect(\`/example/docs-examples/server-form?{\`\$\{params.toString()\}\`}\`);
	}
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
