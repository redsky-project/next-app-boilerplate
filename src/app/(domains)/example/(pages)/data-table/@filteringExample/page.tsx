'use client';

import dynamic from 'next/dynamic';

const DataTableWithFiltering = dynamic(
	() =>
		import('@/app/(domains)/example/_components/data-table/examples').then((mod) => ({
			default: mod.DataTableWithFiltering,
		})),
	{ ssr: false }
);

export default function FilteringExamplePage() {
	return <DataTableWithFiltering />;
}
