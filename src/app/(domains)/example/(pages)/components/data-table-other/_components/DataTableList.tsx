'use client';

import type { JSX } from 'react';
import { ChevronRight } from 'lucide-react';

interface DataTableItem {
	id: string;
	title: string;
	description: string;
	link: string;
}

const DATA_TABLE_LIST: DataTableItem[] = [
	{
		id: 'paginationDataTable',
		title: 'Pagination DataTable',
		description: '페이지네이션 기능이 있는 DataTable 컴포넌트 사용 예제',
		link: '/example/components/data-table-other/pagination-data-table',
	},
	{
		id: 'sortingDataTable',
		title: 'Sorting DataTable',
		description: '정렬 기능이 있는 DataTable 컴포넌트 사용 예제',
		link: '/example/components/data-table-other/sorting-data-table',
	},
	{
		id: 'filteringDataTable',
		title: 'Filtering DataTable',
		description: '필터링 기능이 있는 DataTable 컴포넌트 사용 예제',
		link: '/example/components/data-table-other/filtering-data-table',
	},
	{
		id: 'rowSelectionDataTable',
		title: 'Row Selection DataTable',
		description: 'Row 선택 기능이 있는 DataTable 컴포넌트 사용 예제',
		link: '/example/components/data-table-other/row-selection-data-table',
	},
];

export function DataTableList(): JSX.Element {
	return (
		<div className="flex flex-col gap-1">
			{DATA_TABLE_LIST.map((list) => (
				<button
					key={list.id}
					onClick={() => $router.push(list.link)}
					className="group flex items-center justify-between rounded-md border border-neutral-200 bg-white px-4 py-2 text-left text-sm font-medium text-neutral-700 transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
				>
					<div className="flex min-w-0 flex-1 items-center gap-2">
						<span className="truncate font-medium text-sky-700 dark:text-sky-300">{list.title}</span>:
						<span className="text-muted-foreground truncate text-xs">{list.description}</span>
					</div>
					<ChevronRight className="ml-3 h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-200" />
				</button>
			))}
		</div>
	);
}
