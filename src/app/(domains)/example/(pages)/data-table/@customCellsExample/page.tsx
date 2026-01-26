'use client';

import dynamic from 'next/dynamic';

const DataTableWithCustomCells = dynamic(
	() =>
		import('@/app/(domains)/example/_components/data-table/examples').then((mod) => ({
			default: mod.DataTableWithCustomCells,
		})),
	{ ssr: false }
);

export default function CustomCellsExamplePage() {
	return <DataTableWithCustomCells />;
}
