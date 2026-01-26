'use client';

import dynamic from 'next/dynamic';

const DataTableBasicCssModule = dynamic(
	() =>
		import('@/app/(domains)/example/_components/data-table/examples').then((mod) => ({
			default: mod.DataTableBasicCssModule,
		})),
	{ ssr: false }
);

export default function BasicExampleCssModulePage() {
	return <DataTableBasicCssModule />;
}
