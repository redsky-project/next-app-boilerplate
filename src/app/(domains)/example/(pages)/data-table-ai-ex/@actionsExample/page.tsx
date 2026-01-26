'use client';

import dynamic from 'next/dynamic';

const DataTableWithActions = dynamic(
	() =>
		import('@/app/(domains)/example/_components/data-table/examples').then((mod) => ({
			default: mod.DataTableWithActions,
		})),
	{ ssr: false }
);

export default function ActionsExamplePage() {
	return <DataTableWithActions />;
}
