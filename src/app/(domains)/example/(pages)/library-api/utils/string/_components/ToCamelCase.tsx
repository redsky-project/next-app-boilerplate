'use client';

import { JSX, useState, useEffect } from 'react';
import { CodeBlockClient, Icon, Input } from '@components/ui';

interface IToCamelCaseProps {
	//children: React.ReactNode;
}

export function ToCamelCase({}: IToCamelCaseProps): JSX.Element {
	const [toCamelCaseData, setToCamelCaseData] = useState<string>('hello world test');
	const [resultData, setResultData] = useState<string>('');

	const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setToCamelCaseData(e.target.value);
		setResultData($utils.string.toCamelCase(e.target.value));
	};

	useEffect(() => {
		setResultData($utils.string.toCamelCase(toCamelCaseData));
	}, []);

	return (
		<>
			<div className="flex flex-col gap-2 pt-6">
				<div className="flex items-start justify-between">
					<h3
						data-shorcut="true"
						className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
					>
						$utils.string.toCamelCase()
					</h3>
					<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
						&nbsp;
					</div>
				</div>
				<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
					<code className="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] wrap-break-word outline-none font-bold">
					const result = $utils.string.toCamelCase('hello world test');
					</code>
				</p>
				<p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
					전달 받은 문자열을 camelCase로 변환합니다. <strong>Input</strong> 요소에 text를 입력해보세요.
				</p>
			</div>
			<div className="w-full flex-1 py-4">
				<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
					{/* $utils.string.toCamelCase 함수 사용 예제 start */}
					<div className="grid gap-2">
						<div className="py-0 flex items-center justify-between">
							<Input
								value={toCamelCaseData}
								className="w-1/4"
								onChange={handlerInputChange}
							/>
							<Icon name="ChevronsRight" />
							camelCase 변환
							<Icon name="ChevronsRight" />
							<Input
								readOnly
								value={resultData}
								className="w-1/4"
							/>
						</div>
					</div>
					{/* $utils.string.toCamelCase 함수 사용 예제 end */}
				</div>
				<CodeBlockClient
					lang="tsx"
					code={`'use client'

import { JSX, useState, useEffect } from 'react';
import { Input, Icon } from '@components/ui';

function SamplePage() {
	const [toCamelCaseData, setToCamelCaseData] = useState<string>('hello world test');
	const [resultData, setResultData] = useState<string>('');

	const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setToCamelCaseData(e.target.value);
		// 입력 값을 camelCase로 변환
		setResultData($utils.string.toCamelCase(e.target.value));
	}
		
	useEffect(() => {
		setResultData($utils.string.toCamelCase(toCamelCaseData));
	}, []);

	return (
		<>
			<Input
				value={toCamelCaseData}
				onChange={handlerInputChange}
			/>
			<Icon name="ChevronsRight" />
			camelCase 변환
			<Icon name="ChevronsRight" />
			<Input
				readOnly
				value={resultData}
			/>
		</>
	);
}`}
				/>
			</div>
		</>
	);
}