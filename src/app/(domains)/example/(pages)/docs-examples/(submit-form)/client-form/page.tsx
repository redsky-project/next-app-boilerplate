'use client';

import { useState, type JSX } from 'react';
//import { use } from 'react';
import Image from 'next/image';

import { Separator } from '@/core/components/shadcn/ui/separator';
import { CodeBlockClient, Alert, AlertDescription, AlertTitle, Icon } from '@components/ui';
import { todosAction } from '@/app/(domains)/example/_action/todosAction';

//import serverActionFlowDiagram from '@/assets/images/example/form/server-action-flow-diagram.svg';
import clientFormDiagram1 from '@/assets/images/example/form/clientForm01.svg';
import clientFormDiagram2 from '@/assets/images/example/form/clientForm02.svg';

export interface IClientFormExProps {
	//
}

export default function ClientFormEx({}: IClientFormExProps): JSX.Element {
	// form 제출 (useState + action직접 전달 방식) START ==========================================
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>(null);
	// form 제출 (useState + action직접 전달 방식) END ============================================

	// form 제출 (useState + onSubmit 방식) START ================================================
	const [loading2, setLoading2] = useState(false);
	const [result2, setResult2] = useState<any>(null);
	const [error2, setError2] = useState<string | null>(null);
	// form 제출 (useState + onSubmit 방식) END ==================================================

	// form 제출 (useState + action직접 전달 방식) START ==========================================
	// form action에 전달할 wrapper 함수
	const handleFormAction = async (formData: FormData) => {
		setLoading(true);

		try {
			const response = await todosAction(formData, 'type01');
			console.log('response:::', response);
			setResult(response);
			setTimeout(() => setLoading(false), 100);
		} catch (error) {
			console.error('error:::', error);
			setTimeout(() => setLoading(false), 100);
		}
	};
	// form 제출 (useState + action직접 전달 방식) END ============================================

	// form 제출 (useState + onSubmit 방식) START ================================================
	// form의 onSubmit 이벤트 처리 핸들러
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // 기본 폼 제출 방지

		setLoading2(true);
		setError2(null);

		try {
			// FormData 직접 생성
			const formData = new FormData(e.currentTarget);

			// Server Action 직접 호출 (formData만 전달)
			const response = await todosAction(formData, 'type01');
			console.log('response:::', response);
			setResult2(response);
			setLoading2(false);
		} catch (error) {
			console.error('error:::', error);
			setError2('폼 제출 중 오류가 발생했습니다.');
			setLoading2(false);
		}
	};
	// form 제출 (useState + onSubmit 방식) END ==================================================
	return (
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="h-(--top-spacing) shrink-0" />
			<div className="mx-auto flex w-full  min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
				<div className="flex flex-col gap-2">
					<div className="flex items-start justify-between">
						<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
							Form 전송 (Client Component + Server Actions)
						</h1>
						<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
							&nbsp;
						</div>
					</div>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						현재 화면은 <strong>Client Component</strong>입니다.
					</p>
					<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
						<strong>Client Component</strong>에서 <strong>FormData</strong>를 <strong>Server Action</strong>으로
						전달하고, <strong>Server Action</strong>에서는 <strong>FormData</strong>를 파싱하여{' '}
						<strong>REST API</strong>를 호출하는 과정의 예제입니다.
					</p>
					<Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
						<Icon
							name="MessageCircleWarning"
							className="text-blue-600 dark:text-blue-400"
						/>
						<AlertTitle className="text-blue-900 dark:text-blue-100">
							Client Component &#8594; ServerAction Form제출 다양한 방법
						</AlertTitle>
						<AlertDescription className="text-blue-800 dark:text-blue-200">
							<div className="flex flex-col gap-2">
								{/*<p className="text-sm">...</p>*/}
								<ul className="list-disc list-inside text-sm space-y-1">
									<li>
										<strong>Client Component &#8594; Server Action</strong> Form 제출에는 다음과 같이 여러 가지 방법이
										있으며, 각각 약간의 차이가 있습니다. 상황에 따라 적절한 방법을 선택하여 사용합니다.
										<div className="rounded-lg border border-blue-300 bg-blue-100/70 dark:border-blue-700 dark:bg-blue-900/50 p-2">
											<ul className="list-inside text-sm space-y-1 pl-4 border-l-2 border-blue-200 dark:border-blue-700">
												<li>
													<strong>useActionState + useFormStatus : </strong>
													Next.js 권장방식. 로딩상태, 에러처리 가능. submit버튼 컴포넌트로 분리.
												</li>
												<li>
													<strong>useActionState만 사용 : </strong>
													submit버튼 컴포넌트로 분리하지 않은 경우 사용.
													{/*<ul className="list-disc list-inside text-sm space-y-1 pl-4 border-l-2 border-blue-500">
															<li>revalidate : 지정된 시간(초) 후 데이터를 재검증 (ISR)</li>
															<li>tags : 특정 태그로 캐시를 그룹화하여 revalidateTag()로 수동 무효화 가능</li>
														</ul>*/}
												</li>
												<li>
													<strong>useState + useTransition : </strong>
													복잡한 로직이 필요한 경우 사용. 좀 더 세밀한 제어가능. action이 아닌 onSubmit으로 폼 제출 처리
													해야함.
												</li>
												<li>
													<strong>useState + 직접처리(onSubmit) : </strong>
													useTransition을 사용하지 않고 onSubmit으로 비동기 함수 구현.
												</li>
												<li>
													<strong>useState + form action직접 전달 : </strong>
													form action에 비동기 함수를 직접 바인딩 후 Server Action으로 전달. 코드가 간결하지만 로딩 상태
													등 제어가 제한적일 수 있음. 간단한 폼일경우에 사용하는것이 좋음.
												</li>
												<li>
													<strong>react-hook-form + Server Action : </strong>
													복잡한 폼 유효성 검사 가능. react-hook-form라이브러리 설치 필요.
												</li>
											</ul>
										</div>
									</li>
								</ul>
							</div>
						</AlertDescription>
					</Alert>
				</div>
				{/* 단략 START ======================================================== */}
				<div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
					<Separator className="my-6" />
					{/* 폼 제출 흐름도 블럭요서 START */}
					<div className="w-full flex-1 py-4">
						<h2
							data-shorcut="true"
							className="scroll-m-20 text-3xl font-semibold tracking-tight sm:text-3xl xl:text-3xl pb-4"
						>
							Form 전송 예제(useState + Server Action)
						</h2>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<strong>Client Component</strong>에서 Form 제출을 처리할 때{' '}
							<strong>useState + Server Action직접 전달 방식</strong>을 사용하여 구현한 예제입니다.
						</p>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							코드가 간결하지만 복잡한 폼 유효성 검사, 로딩상태 자동 처리 등을 해야할 때는 적합하지 않습니다.
						</p>
						<h2
							data-shorcut="true"
							className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl pt-4"
						>
							폼 전송 흐름도
						</h2>

						<div className="flex justify-start py-1">
							<Image
								src={clientFormDiagram1}
								alt="Server Form Diagram"
								width={700}
								height={500}
							/>
						</div>
					</div>
					{/* 폼 제출 흐름도 블럭요서 END */}
					{/* example 블럭요서 START */}
					<div className="flex flex-col gap-2">
						<div className="flex items-start justify-between">
							<h2
								data-shorcut="true"
								className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
							>
								폼 전송 예제
							</h2>
						</div>
					</div>

					<div className="w-full flex-1 py-4">
						<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
							<div className="w-full max-w-md mx-auto my-5 p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800">
								<strong>할일 등록</strong>
								<Separator className="my-1" />
								<form
									className="flex flex-col gap-5"
									action={handleFormAction as any}
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
								<div className="mt-4 text-xs text-neutral-500 dark:text-neutral-400 text-center">
									폼 제출 시 서버로 FormData(id, title, body)를 전송합니다.
								</div>
								<div className="mt-4">
									<div className="flex flex-col md:flex-row gap-4">
										<div className="flex-1 p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-900">
											<div className="font-semibold mb-1 text-sm text-sky-700 dark:text-sky-300 flex flex-col items-start gap-0.5">
												<span>폼 제출 결과</span>
												<span className="text-xs text-neutral-500">(result)</span>
											</div>
											<pre className="whitespace-pre-wrap text-sm text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 rounded-md p-2 border border-neutral-200 dark:border-neutral-700 overflow-x-auto">
												{result && result?.success ? (
													(() => {
														try {
															return JSON.stringify(result, null, 2);
														} catch {
															return <span className="text-neutral-400">결과 없음</span>;
														}
													})()
												) : (
													<span className="text-neutral-400">결과 없음</span>
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

function SamplePage() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>(null);
	
	// form action에 전달할 wrapper 함수
	const handleFormAction = async (formData: FormData) => {
		setLoading(true); // 로딩상태 시작

		try {
			const response = await todosAction(formData);
			console.log('response:::', response);
			setResult(response);
			setTimeout(() => setLoading(false), 100);
		} catch (error) {
			console.error('error:::', error);
			setTimeout(() => setLoading(false), 100);
		}
	};

	return (
		<div>
			<form action={handleFormAction}>
				<input name="id" defaultValue="1" />
				<input name="title" defaultValue="제목 1" />
				<textarea name="content" defaultValue="내용 1" />
				<button type="submit">{loading ? '전송 중...' : 'POST 요청 보내기'}</button>
			</form>
			{/* 폼 제출 결과 표시 부분 */}
			<pre>
				{result && result?.success ? (
					(() => {
						try {
							return JSON.stringify(result, null, 2);
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
		// 성공 응답
		return { success: true, message: '할일이 추가되었습니다.', data: res.data };
	}
}
// ========================================================`}
								lang="tsx"
							/>
						</div>
					</div>
					{/* example 블럭요서 END */}
				</div>
				{/* 단략 END ======================================================== */}
				{/* 단략 START ======================================================== */}
				<div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
					<Separator className="my-6" />
					{/* 폼 제출 흐름도 블럭요서 START */}
					<div className="w-full flex-1 py-4">
						<h2
							data-shorcut="true"
							className="scroll-m-20 text-3xl font-semibold tracking-tight sm:text-3xl xl:text-3xl pb-4"
						>
							Form 전송 예제(useState + onSubmit)
						</h2>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<strong>Client Component</strong>에서 Form 제출을 처리할 때 <strong>useState + onSubmit 방식</strong>을
							사용하여 구현한 예제입니다.
						</p>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<strong>useActionState, useFormStatus</strong>와 같이 React, Next.js에서 제공하는 훅을 사용하지 않으면
							로딩상태 및 폼 유효성 검사 등을 직접 구현해야 하는 수고로움이 있습니다.
						</p>
						<Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
							<Icon
								name="MessageCircleWarning"
								className="text-blue-600 dark:text-blue-400"
							/>
							<AlertTitle className="text-blue-900 dark:text-blue-100">action, onSubmit 속성 사용의 차이</AlertTitle>
							<AlertDescription className="text-blue-800 dark:text-blue-200">
								<div className="flex flex-col gap-2">
									{/*<p className="text-sm">...</p>*/}
									<ul className="list-disc list-inside text-sm space-y-1">
										<li>
											<strong>action 속성 사용 : </strong>JavaScript 비활성화 시에도 동작(Progressive Enhancement),
											브라우저 기본동작 활용.
										</li>
										<li>
											<strong>onSubmit 이벤트 사용 : </strong>JavaScript 필수, 브라우저 기본동작 무시. 제출 전/후 Client
											추가 로직 실행 가능.
										</li>
									</ul>
								</div>
							</AlertDescription>
						</Alert>
						<h2
							data-shorcut="true"
							className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl pt-4"
						>
							폼 전송 흐름도
						</h2>

						<div className="flex justify-start py-1">
							<Image
								src={clientFormDiagram2}
								alt="Client Form Diagram"
								width={700}
								height={500}
							/>
						</div>
					</div>
					{/* 폼 제출 흐름도 블럭요서 END */}
					{/* example 블럭요서 START */}
					<div className="flex flex-col gap-2">
						<div className="flex items-start justify-between">
							<h2
								data-shorcut="true"
								className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
							>
								폼 전송 예제
							</h2>
						</div>
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
										disabled={loading2}
										className="mt-0 w-full py-2 px-4 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
									>
										{loading2 ? '전송 중...' : 'POST 요청 보내기'}
									</button>
								</form>
								{/*<div className="mt-4 text-xs text-neutral-500 dark:text-neutral-400 text-center">
									폼 제출 시 서버로 FormData(id, title, body)를 전송합니다.
								</div>*/}
								<div className="mt-4 text-xs text-neutral-500 dark:text-neutral-400 text-center">
									폼 제출 시 서버로 FormData(id, title, body)를 전송합니다.
								</div>
								<div className="mt-4">
									<div className="flex flex-col md:flex-row gap-4">
										<div className="flex-1 p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-900">
											<div className="font-semibold mb-1 text-sm text-sky-700 dark:text-sky-300 flex flex-col items-start gap-0.5">
												<span>폼 제출 결과</span>
												<span className="text-xs text-neutral-500">(result)</span>
											</div>
											<pre className="whitespace-pre-wrap text-sm text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 rounded-md p-2 border border-neutral-200 dark:border-neutral-700 overflow-x-auto">
												{result2 && result2?.success ? (
													(() => {
														try {
															return JSON.stringify(result2, null, 2);
														} catch {
															return (
																<span className="text-neutral-400">
																	결과 없음{error2 === null ? '' : `(${error2})`}
																</span>
															);
														}
													})()
												) : (
													<span className="text-neutral-400">결과 없음{error2 === null ? '' : `(${error2})`}</span>
												)}
											</pre>
										</div>
									</div>
								</div>
							</div>
							<CodeBlockClient
								code={`// ========================================================
// SamplePage.tsx
// useState + onSubmit 방식
// ========================================================
'use client';

import { useState } from 'react';
import { todosAction } from './todosAction';

function SamplePage() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);
	
	// form의 onSubmit 이벤트 처리 핸들러
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // 기본 폼 제출 방지

		setLoading(true);
		setError(null);

		try {
			// FormData 직접 생성
			const formData = new FormData(e.currentTarget);

			// Server Action 직접 호출 (formData만 전달)
			const response = await todosAction(formData);
			console.log('response:::', response);
			setResult(response);
			setLoading(false)
		} catch (error) {
			console.error('error:::', error);
			setError('폼 제출 중 오류가 발생했습니다.');
			setLoading(false)
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input name="id" defaultValue="1" />
				<input name="title" defaultValue="제목 1" />
				<textarea name="content" defaultValue="내용 1" />
				<button type="submit" disabled={loading}>{loading ? '전송 중...' : 'POST 요청 보내기'}</button>
			</form>
			{/* 폼 제출 결과 표시 부분 */}
			<pre>
				{result && result?.success ? (
					(() => {
						try {
							return JSON.stringify(result, null, 2);
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
		// 성공 응답
		return { success: true, message: '할일이 추가되었습니다.', data: res.data };
	}
}
// ========================================================`}
								lang="tsx"
							/>
						</div>
					</div>
					{/* example 블럭요서 END */}
				</div>
				{/* 단략 END ======================================================== */}
				{/* 단략 START ======================================================== */}
				<div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
					<Separator className="my-6" />
					{/* 폼 제출 흐름도 블럭요서 START */}
					<div className="w-full flex-1 py-4">
						<h2
							data-shorcut="true"
							className="scroll-m-20 text-3xl font-semibold tracking-tight sm:text-3xl xl:text-3xl pb-4"
						>
							Form 전송 예제(useActionState)
						</h2>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<strong>useActionState</strong>(Server Action의 결과를 상태로 관리하는 핵심 훅)를 사용하여 Form 제출
							처리를 구현한 예제입니다.
						</p>
						<Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
							<Icon
								name="MessageCircleWarning"
								className="text-blue-600 dark:text-blue-400"
							/>
							<AlertTitle className="text-blue-900 dark:text-blue-100">useActionState의 장점</AlertTitle>
							<AlertDescription className="text-blue-800 dark:text-blue-200">
								<div className="flex flex-col gap-2">
									{/*<p className="text-sm">...</p>*/}
									<ul className="list-disc list-inside text-sm space-y-1">
										<li>
											<strong>자동 상태 관리 : </strong>Server Action 결과가 자동으로 state에 저장
										</li>
										<li>
											<strong>isPending 제공 : </strong>로딩 상태를 별도로 관리할 필요 없음
										</li>
										<li>
											<strong>에러 처리 간편 : </strong>반환값으로 에러 전달
										</li>
									</ul>
								</div>
							</AlertDescription>
						</Alert>
						{/*<h2
							data-shorcut="true"
							className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl pt-4"
						>
							폼 전송 흐름도
						</h2>

						<div className="flex justify-start py-1">
							<Image
								src={clientFormDiagram2}
								alt="Client Form Diagram"
								width={700}
								height={500}
							/>
						</div>*/}
					</div>
					{/* 폼 제출 흐름도 블럭요서 END */}
					{/* example 블럭요서 START */}
					<div className="flex flex-col gap-2">
						<div className="flex items-start justify-between">
							<h2
								data-shorcut="true"
								className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
							>
								useActionState 예제 코드
							</h2>
						</div>
					</div>

					<div className="w-full flex-1 py-4">
						<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
							<CodeBlockClient
								code={`'use client';

import { useActionState } from 'react';
import { postsAction } from './postsAction';
 
export default function ClientFormPage() {
  // ✅ useActionState로 Server Action 결과 자동 관리
  const [state, formAction, isPending] = useActionState(
    postsAction,
    null // 초기 상태 값
  );

  return (
    <div>
      <form action={formAction}>
        <input name="id" defaultValue="1" />
        <input name="title" placeholder="제목" />
        <textarea name="body" placeholder="내용" />
        
        {/* isPending으로 로딩 상태 표시 */}
        <button type="submit" disabled={isPending}>
          {isPending ? '전송 중...' : 'POST 요청 보내기'}
        </button>
      </form>

      {/* ✅ state로 결과 자동 표시 */}
      {state?.success && (
        <div className="success">
          <h3>{state.message}</h3>
          <pre>{JSON.stringify(state.data, null, 2)}</pre>
        </div>
      )}

      {state?.success === false && (
        <div className="error">{state.message}</div>
      )}
    </div>
  );
}
 
 
// ========================================================
// postsAction.ts (Server Action)
// ========================================================
'use server';

import { serverApi } from '@fetch/server-api';

// ✅ 첫 번째 매개변수는 이전 상태 (필수!)
export async function postsAction(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const id = formData.get('id') as string;

  try {
    const res = await serverApi<any>(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        body: formData,
        cache: 'no-store',
      }
    );

    if (res.data) {
      // ✅ 반환된 객체가 자동으로 state가 됨
      return {
        success: true,
        data: res.data,
        message: '게시글이 작성되었습니다.',
        timestamp: new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error('API Error:', err);
    return {
      success: false,
      message: '폼 제출 중 오류가 발생했습니다.',
      error: err.message,
    };
  }
  
  return {
    success: false,
    message: '폼이 제출되지 않았습니다.',
    data: null,
  };
}`}
								lang="tsx"
							/>
						</div>
					</div>
					{/* example 블럭요서 END */}
				</div>
				{/* 단략 END ======================================================== */}
				{/* 단략 START ======================================================== */}
				<div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
					<Separator className="my-6" />
					{/* 폼 제출 흐름도 블럭요서 START */}
					<div className="w-full flex-1 py-4">
						<h2
							data-shorcut="true"
							className="scroll-m-20 text-3xl font-semibold tracking-tight sm:text-3xl xl:text-3xl pb-4"
						>
							Form 전송 예제(useActionState + useFormStatus)
						</h2>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<strong>useFormStatus</strong>(폼의 제출 상태를 추적하는 훅 (자식 컴포넌트에서 사용))를 useActionState과
							함께 사용하여 Form 제출 처리를 구현한 예제입니다.
						</p>
						<Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
							<Icon
								name="MessageCircleWarning"
								className="text-blue-600 dark:text-blue-400"
							/>
							<AlertTitle className="text-blue-900 dark:text-blue-100">useFormStatus의 특징</AlertTitle>
							<AlertDescription className="text-blue-800 dark:text-blue-200">
								<div className="flex flex-col gap-2">
									{/*<p className="text-sm">...</p>*/}
									<ul className="list-disc list-inside text-sm space-y-1">
										<li>⚠️ 반드시 &lt;form&gt; 내부의 자식 컴포넌트에서만 사용 가능</li>
										<li>
											<strong>pending : </strong>폼 제출 중인지 여부
										</li>
										<li>
											<strong>data : </strong>FormData 객체
										</li>
										<li>
											<strong>method : </strong>HTTP 메서드 (post, get 등)
										</li>
										<li>
											<strong>action : </strong>실행 중인 action 함수
										</li>
									</ul>
								</div>
							</AlertDescription>
						</Alert>
						<Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
							<Icon
								name="MessageCircleWarning"
								className="text-blue-600 dark:text-blue-400"
							/>
							<AlertTitle className="text-blue-900 dark:text-blue-100">
								useFormState와 useFormStatus의 차이점 (useFormState도 확인 필요)
							</AlertTitle>
							<AlertDescription className="text-blue-800 dark:text-blue-200">
								<div className="flex flex-col gap-2">
									{/*<p className="text-sm">...</p>*/}
									<ul className="list-disc list-inside text-sm space-y-1">
										<li>
											<strong>useFormState : </strong>"Server Action의 결과를 받아서 처리" (에러, 성공 메시지)
										</li>
										<li>
											<strong>useFormStatus : </strong>"지금 Form이 제출 중인지 확인" (로딩 상태)
										</li>
										<li>
											<strong>핵심 차이점 비교 : </strong>
											<div className="flex flex-col gap-2">
												<table className="w-full">
													<thead>
														<tr>
															<th className="border border-gray-300 px-4 py-2">구분</th>
															<th className="border border-gray-300 px-4 py-2">useFormState</th>
															<th className="border border-gray-300 px-4 py-2">useFormStatus</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td className="border border-gray-300 px-4 py-2">사용 위치</td>
															<td className="border border-gray-300 px-4 py-2">Form 컴포넌트 자체</td>
															<td className="border border-gray-300 px-4 py-2">Form의 자식 컴포넌트만</td>
														</tr>
													</tbody>
													<tbody>
														<tr>
															<td className="border border-gray-300 px-4 py-2">주요 목적</td>
															<td className="border border-gray-300 px-4 py-2">Server Action 결과 관리</td>
															<td className="border border-gray-300 px-4 py-2">제출 중 상태 확인</td>
														</tr>
													</tbody>
													<tbody>
														<tr>
															<td className="border border-gray-300 px-4 py-2">반환값</td>
															<td className="border border-gray-300 px-4 py-2">[state, formAction]</td>
															<td className="border border-gray-300 px-4 py-2">
																&#123; pending, data, method, action &#125;
															</td>
														</tr>
													</tbody>
													<tbody>
														<tr>
															<td className="border border-gray-300 px-4 py-2">데이터</td>
															<td className="border border-gray-300 px-4 py-2">Server Action의 return 값</td>
															<td className="border border-gray-300 px-4 py-2">제출 중인 FormData</td>
														</tr>
													</tbody>
													<tbody>
														<tr>
															<td className="border border-gray-300 px-4 py-2">사용 시점</td>
															<td className="border border-gray-300 px-4 py-2">에러</td>
															<td className="border border-gray-300 px-4 py-2">에러</td>
														</tr>
													</tbody>
												</table>
											</div>
										</li>
									</ul>
								</div>
							</AlertDescription>
						</Alert>
						{/*<h2
							data-shorcut="true"
							className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl pt-4"
						>
							폼 전송 흐름도
						</h2>

						<div className="flex justify-start py-1">
							<Image
								src={clientFormDiagram2}
								alt="Client Form Diagram"
								width={700}
								height={500}
							/>
						</div>*/}
					</div>
					{/* 폼 제출 흐름도 블럭요서 END */}
					{/* example 블럭요서 START */}
					<div className="flex flex-col gap-2">
						<div className="flex items-start justify-between">
							<h2
								data-shorcut="true"
								className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
							>
								useActionState 예제 코드
							</h2>
						</div>
					</div>

					<div className="w-full flex-1 py-4">
						<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
							<CodeBlockClient
								code={`'use client';

import { useFormStatus } from 'react-dom';

// ✅ 별도의 Submit 버튼 컴포넌트
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? (
        <>
          <span className="spinner" />
          전송 중...
        </>
      ) : (
        'POST 요청 보내기'
      )}
    </button>
  );
}

// 메인 컴포넌트
export default function ClientFormPage() {
  const [state, formAction] = useActionState(postsAction, null);

  return (
    <form action={formAction}>
      <input name="title" placeholder="제목" />
      <textarea name="body" placeholder="내용" />
      
      {/* ✅ 자식 컴포넌트에서 useFormStatus 사용 */}
      <SubmitButton />
    </form>
  );
}
 
 
// ========================================================
// postsAction.ts (Server Action)
// ========================================================
'use server';

import { serverApi } from '@fetch/server-api';

// ✅ 첫 번째 매개변수는 이전 상태 (필수!)
export async function postsAction(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const id = formData.get('id') as string;

  try {
    const res = await serverApi<any>(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        body: formData,
        cache: 'no-store',
      }
    );

    if (res.data) {
      // ✅ 반환된 객체가 자동으로 state가 됨
      return {
        success: true,
        data: res.data,
        message: '게시글이 작성되었습니다.',
        timestamp: new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error('API Error:', err);
    return {
      success: false,
      message: '폼 제출 중 오류가 발생했습니다.',
      error: err.message,
    };
  }
  
  return {
    success: false,
    message: '폼이 제출되지 않았습니다.',
    data: null,
  };
}`}
								lang="tsx"
							/>
						</div>
					</div>
					{/* example 블럭요서 END */}
				</div>
				{/* 단략 END ======================================================== */}
				{/* 단략 START ======================================================== */}
				<div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
					<Separator className="my-6" />
					{/* 폼 제출 흐름도 블럭요서 START */}
					<div className="w-full flex-1 py-4">
						<h2
							data-shorcut="true"
							className="scroll-m-20 text-3xl font-semibold tracking-tight sm:text-3xl xl:text-3xl pb-4"
						>
							Form 전송 예제(useOptimistic)
						</h2>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<strong>useOptimistic</strong>(낙관적 업데이트 (Optimistic Update)를 위한 훅)을 사용하여 Form 제출 처리를
							구현한 예제입니다.
						</p>
						<Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
							<Icon
								name="MessageCircleWarning"
								className="text-blue-600 dark:text-blue-400"
							/>
							<AlertTitle className="text-blue-900 dark:text-blue-100">useOptimistic의 장점</AlertTitle>
							<AlertDescription className="text-blue-800 dark:text-blue-200">
								<div className="flex flex-col gap-2">
									{/*<p className="text-sm">...</p>*/}
									<ul className="list-disc list-inside text-sm space-y-1">
										<li>
											<strong>즉각적인 UI 피드백 : </strong>서버 응답을 기다리지 않음
										</li>
										<li>
											<strong>자동 롤백 : </strong>실패 시 이전 상태로 복원
										</li>
										<li>
											<strong>더 나은 UX : </strong>앱이 더 빠르게 느껴짐
										</li>
									</ul>
								</div>
							</AlertDescription>
						</Alert>
						{/*<h2
							data-shorcut="true"
							className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl pt-4"
						>
							폼 전송 흐름도
						</h2>

						<div className="flex justify-start py-1">
							<Image
								src={clientFormDiagram2}
								alt="Client Form Diagram"
								width={700}
								height={500}
							/>
						</div>*/}
					</div>
					{/* 폼 제출 흐름도 블럭요서 END */}
					{/* example 블럭요서 START */}
					<div className="flex flex-col gap-2">
						<div className="flex items-start justify-between">
							<h2
								data-shorcut="true"
								className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
							>
								useOptimistic 예제 코드
							</h2>
						</div>
					</div>

					<div className="w-full flex-1 py-4">
						<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
							<CodeBlockClient
								code={`'use client';

import { useOptimistic } from 'react';
import { useActionState } from 'react';
import { addPostAction } from './postsAction';

export default function PostList({ initialPosts }) {
  const [state, formAction] = useActionState(addPostAction, null);
  
  // ✅ 낙관적 업데이트 훅
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    initialPosts,
    (currentPosts, newPost) => [...currentPosts, newPost]
  );

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;

    // ✅ 즉시 UI 업데이트 (서버 응답 전)
    addOptimisticPost({
      id: 'temp-' + Date.now(),
      title,
      body,
      isPending: true, // 임시 표시
    });

    // 실제 Server Action 실행
    await formAction(formData);
  };

  return (
    <div>
      <form action={handleSubmit}>
        <input name="title" placeholder="제목" />
        <textarea name="body" placeholder="내용" />
        <button type="submit">추가</button>
      </form>

      {/* ✅ 낙관적으로 업데이트된 목록 표시 */}
      <ul>
        {optimisticPosts.map((post) => (
          <li key={post.id} className={post.isPending ? 'opacity-50' : ''}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            {post.isPending && <span>전송 중...</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}`}
								lang="tsx"
							/>
						</div>
					</div>
					{/* example 블럭요서 END */}
				</div>
				{/* 단략 END ======================================================== */}
				{/* 단략 START ======================================================== */}
				<div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
					<Separator className="my-6" />
					{/* 폼 제출 흐름도 블럭요서 START */}
					<div className="w-full flex-1 py-4">
						<h2
							data-shorcut="true"
							className="scroll-m-20 text-3xl font-semibold tracking-tight sm:text-3xl xl:text-3xl pb-4"
						>
							Form 전송 예제(useTransition)
						</h2>
						<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							<strong>useTransition</strong>(비동기 작업의 pending 상태를 추적)을 사용하여 Form 제출 처리를 구현한
							예제입니다.
						</p>

						{/*<h2
							data-shorcut="true"
							className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl pt-4"
						>
							폼 전송 흐름도
						</h2>

						<div className="flex justify-start py-1">
							<Image
								src={clientFormDiagram2}
								alt="Client Form Diagram"
								width={700}
								height={500}
							/>
						</div>*/}
					</div>
					{/* 폼 제출 흐름도 블럭요서 END */}
					{/* example 블럭요서 START */}
					<div className="flex flex-col gap-2">
						<div className="flex items-start justify-between">
							<h2
								data-shorcut="true"
								className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
							>
								useTransition 예제 코드
							</h2>
						</div>
					</div>

					<div className="w-full flex-1 py-4">
						<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
							<CodeBlockClient
								code={`'use client';

import { useState, useTransition } from 'react';
import { postsAction } from './postsAction';

export default function ClientFormPage() {
	const [isPending, startTransition] = useTransition();
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		const formData = new FormData(e.currentTarget);
		
		try {
			// 비동기 작업 먼저 실행
			const response = await postsAction(formData);
			
			// ✅ 상태 업데이트만 startTransition으로 감싸기
			startTransition(() => {
				if (response.success) {
					setResult(response.data);
				} else {
					setError(response.message);
				}
			});
		} catch (err) {
			startTransition(() => {
				setError('오류 발생');
			});
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input name="title" disabled={isPending} />
				<textarea name="body" disabled={isPending} />
				
				{/* ✅ isPending으로 로딩 상태 표시 */}
				<button type="submit" disabled={isPending}>
					{isPending ? '전송 중...' : '제출'}
				</button>
			</form>

			{result && <div>성공: {JSON.stringify(result)}</div>}
			{error && <div className="error">{error}</div>}
		</div>
	);
}`}
								lang="tsx"
							/>
						</div>
					</div>
					{/* example 블럭요서 END */}
				</div>
				{/* 단략 END ======================================================== */}
			</div>
		</div>
	);
}
