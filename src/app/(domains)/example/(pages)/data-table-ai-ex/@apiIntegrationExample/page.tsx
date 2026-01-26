'use client';

import dynamic from 'next/dynamic';

const DataTableWithApi = dynamic(
	() =>
		import('@/app/(domains)/example/_components/data-table/examples').then((mod) => ({
			default: mod.DataTableWithApi,
		})),
	{ ssr: false }
);

export default function ApiIntegrationExamplePage() {
	return <DataTableWithApi />;
}
