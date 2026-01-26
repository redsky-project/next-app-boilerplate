'use client';

import dynamic from 'next/dynamic';

const DataTableWithSearch = dynamic(
	() =>
		import('@/app/(domains)/example/_components/data-table/examples').then((mod) => ({
			default: mod.DataTableWithSearch,
		})),
	{ ssr: false }
);

export default function SearchExamplePage() {
	return <DataTableWithSearch />;
}
