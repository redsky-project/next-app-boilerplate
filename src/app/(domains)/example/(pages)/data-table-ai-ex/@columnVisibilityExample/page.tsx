'use client';

import dynamic from 'next/dynamic';

const DataTableWithColumnVisibility = dynamic(
	() =>
		import('@/app/(domains)/example/_components/data-table/examples').then((mod) => ({
			default: mod.DataTableWithColumnVisibility,
		})),
	{ ssr: false }
);

export default function ColumnVisibilityExamplePage() {
	return <DataTableWithColumnVisibility />;
}
