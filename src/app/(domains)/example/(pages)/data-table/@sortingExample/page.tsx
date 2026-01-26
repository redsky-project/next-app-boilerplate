'use client';

import dynamic from 'next/dynamic';

const DataTableWithSorting = dynamic(
	() =>
		import('@/app/(domains)/example/_components/data-table/examples').then((mod) => ({
			default: mod.DataTableWithSorting,
		})),
	{ ssr: false }
);

export default function SortingExamplePage() {
	return <DataTableWithSorting />;
}
