'use client';

import dynamic from 'next/dynamic';

const DataTableWithSelection = dynamic(
	() =>
		import('@/app/(domains)/example/_components/data-table/examples').then((mod) => ({
			default: mod.DataTableWithSelection,
		})),
	{ ssr: false }
);

export default function SelectionExamplePage() {
	return <DataTableWithSelection />;
}
