'use client';

import dynamic from 'next/dynamic';

const DataTableAllFeatures = dynamic(
	() =>
		import('@/app/(domains)/example/_components/data-table/examples').then((mod) => ({
			default: mod.DataTableAllFeatures,
		})),
	{ ssr: false }
);

export default function AllFeaturesExamplePage() {
	return <DataTableAllFeatures />;
}
