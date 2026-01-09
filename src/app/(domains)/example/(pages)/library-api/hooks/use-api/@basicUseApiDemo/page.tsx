'use client';

import { JSX } from 'react';

import { Textarea } from '@/core/components/shadcn/ui/textarea';
import { CodeBlockClient } from '@components/ui';
import { useApi } from '@hooks/api';
import { IPost } from '@/app/(domains)/example/_types';

export interface IBasicUseApiDemoProps {
	// test?: string;
}

export default function BasicUseApiDemo({}: IBasicUseApiDemoProps): JSX.Element {
	// basic useApi example ========================================================
	const { data: basicUseApiData } = useApi<IPost[]>(`${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL3}/posts`);
	//==============================================================================
	// textarea onChange handler
	const handlerTextarea = () => {
		//
	};
	return (
		<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
			<Textarea
				value={JSON.stringify(basicUseApiData || [], null, 2)}
				placeholder="Response Data (https://koreanjson.com/posts)"
				onChange={handlerTextarea}
				className="min-h-[240px] border-0 rounded-none border-b border-neutral-200 focus-visible:ring-0 font-mono text-sm dark:border-neutral-800"
			/>
			<CodeBlockClient
				code={`// ========================================================
// 페이지 만들기 기본 템플릿
// ========================================================
import { JSX } from 'react';

// 페이지 컴포넌트의 Props 타입 정의
export interface ISamplePageProps {
	// test?: string;
}

// 페이지 컴포넌트 함수
export default function SamplePage({}: ISamplePageProps): JSX.Element {
	return (<div>기본 템플릿 페이지입니다.</div>);
}`}
				lang="tsx"
			/>
		</div>
	);
}
