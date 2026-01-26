'use client';

import dynamic from 'next/dynamic';

const DataTablePersistent = dynamic(
	() =>
		import('@/app/(domains)/example/_components/data-table/examples').then((mod) => ({
			default: mod.DataTablePersistent,
		})),
	{ ssr: false }
);

export default function PersistentStateExamplePage() {
	return <DataTablePersistent />;
}
