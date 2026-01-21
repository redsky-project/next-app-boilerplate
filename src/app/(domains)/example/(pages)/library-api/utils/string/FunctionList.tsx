'use client';

import type { JSX } from 'react';
import { ChevronRight } from 'lucide-react';

interface FunctionItem {
	id: string;
	title: string;
	description: string;
}

const FUNCTIONS: FunctionItem[] = [
	{ id: 'toCamelCase', title: '$utils.string.toCamelCase()', description: '전달 받은 문자열을 camelCase로 변환합니다.' },
	
];

export function FunctionList(): JSX.Element {
	const scrollToSection = (functionId: string) => {
		// data-shorcut="true"인 h3 요소들을 모두 찾기
		const headers = document.querySelectorAll('h3[data-shorcut="true"]');
		
		// 각 헤더의 텍스트 내용을 정규화하여 비교
		for (const header of headers) {
			const headerText = header.textContent?.trim() || '';
			const targetFunction = FUNCTIONS.find(f => f.id === functionId);
			
			if (targetFunction && headerText === targetFunction.title) {
				// 부드럽게 스크롤
				header.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
				break;
			}
		}
	};

	return (
		<div className="flex flex-col gap-1">
			{FUNCTIONS.map((func) => (
				<button
					key={func.id}
					onClick={() => scrollToSection(func.id)}
					className="group flex items-center justify-between rounded-md border border-neutral-200 bg-white px-4 py-2 text-left text-sm font-medium text-neutral-700 transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
				>
					<div className="flex min-w-0 flex-1 items-center gap-2">
						<span className="truncate font-medium text-sky-700 dark:text-sky-300">{func.title}</span>:
						<span className="text-muted-foreground truncate text-xs">{func.description}</span>
					</div>
					<ChevronRight className="ml-3 h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-200" />
				</button>
			))}
		</div>
	);
}
