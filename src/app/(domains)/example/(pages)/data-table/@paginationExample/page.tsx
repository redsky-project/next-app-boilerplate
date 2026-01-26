'use client';

import dynamic from 'next/dynamic';

const DataTableWithPagination = dynamic(
	() =>
		import('@/app/(domains)/example/_components/data-table/examples').then((mod) => ({
			default: mod.DataTableWithPagination,
		})),
	{ ssr: false }
);

export default function PaginationExamplePage() {
	return <DataTableWithPagination />;
}
