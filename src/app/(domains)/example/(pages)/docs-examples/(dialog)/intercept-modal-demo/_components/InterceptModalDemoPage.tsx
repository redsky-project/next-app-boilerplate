import { JSX } from 'react';

import { Separator } from '@/core/components/shadcn/ui/separator';
import { CodeBlock } from '@components/ui';
import Link from 'next/link';
import { serverApi } from '@fetch/server-api';

export interface IInterceptModalPageCompProps {
	//
}

export default async function InterceptModalPageComp({}: IInterceptModalPageCompProps): Promise<JSX.Element> {
	const { data: postsData } = await serverApi<any>('https://koreanjson.com/posts', {
		method: 'GET',
		cache: 'no-store',
	});
	return (
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="h-(--top-spacing) shrink-0" />
			<div className="mx-auto flex w-full  min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
				<div className="flex flex-col gap-2">
					<div className="flex items-start justify-between">
						<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
							Intercepting Modal 예제
						</h1>
						<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
							&nbsp;
						</div>
					</div>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						현재 화면은 <strong>Server Component</strong>입니다.
					</p>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						현재 페이지 위에 보여질 <strong>Modal</strong>을 위한 <strong>페러럴 라우트</strong>와{' '}
						<strong>인터셉팅 라우트</strong>는 직접 생성해야 합니다.
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
					{/* Modal 구현을 위한 현재 페이지 폴더 구조 START */}
					<div className="w-full flex-1 py-4">
						<h2
							data-shorcut="true"
							className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
						>
							Intercepting Modal 구현을 위한 현재 페이지 폴더 구조
						</h2>
						<CodeBlock
							code={`src
├── app
│   ├── (domains)
│   │   ├── main           # main 업무 폴더
│   │   └── example        # example 업무 폴더
│   │       ├── (pages)             # 페이지 그룹 폴더
│   │       │   ├── intercepting-modal              # intercepting-modal 구현을 위한 라우트 폴더.
│   │       │   │   ├── page.tsx    # 바닥 페이지 컴포넌트
│   │       │   │   └── ...         # 기타 App Router 라우팅 파일들
│   │       │   └── ...
│   │       └── ...        # 기타 내부 파일들
│   │   
│   ├── favicon.ico
│   └── layout.tsx
├── assets
└── ...`}
							lang="tsx"
						/>
					</div>
					{/* Modal 구현을 위한 현재 페이지 폴더 구조 END */}
					<Separator className="my-6" />
					{/* example 블럭요서 START */}
					<div className="flex flex-col gap-2 pt-6">
						<div className="flex items-start justify-between">
							<h2
								data-shorcut="true"
								className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
							>
								Intercepting Modal 예제
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
							<div className="w-full mx-auto my-5 p-6">
								<strong>serverApi로 https://koreanjson.com/posts 호출</strong>
								<Separator className="my-4" />
								{/* posts 데이터 화면에 표시 영역 */}
								<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
									{Array.isArray(postsData) && postsData.length > 0 ? (
										postsData.slice(0, 6).map((post: any) => (
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
									)}
								</div>
							</div>
							<CodeBlock
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
