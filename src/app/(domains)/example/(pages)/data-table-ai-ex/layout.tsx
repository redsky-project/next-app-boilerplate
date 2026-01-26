import { ReactNode } from 'react';
import { Separator } from '@/core/components/shadcn/ui/separator';

export interface IDataTableLayoutProps {
	basicExample: ReactNode;
	basicExampleCssModule: ReactNode;
	sortingExample: ReactNode;
	filteringExample: ReactNode;
	paginationExample: ReactNode;
	searchExample: ReactNode;
	selectionExample: ReactNode;
	columnVisibilityExample: ReactNode;
	customCellsExample: ReactNode;
	actionsExample: ReactNode;
	allFeaturesExample: ReactNode;
	persistentStateExample: ReactNode;
	apiIntegrationExample: ReactNode;
}

export default function DataTableLayout({
	basicExample,
	basicExampleCssModule,
	sortingExample,
	filteringExample,
	paginationExample,
	searchExample,
	selectionExample,
	columnVisibilityExample,
	customCellsExample,
	actionsExample,
	allFeaturesExample,
	persistentStateExample,
	apiIntegrationExample,
}: IDataTableLayoutProps) {
	return (
		<div className="container mx-auto space-y-12 py-10">
			{/* Header */}
			<div className="space-y-4">
				<h1 className="text-4xl font-bold tracking-tight">Data Table</h1>
				<p className="text-lg text-muted-foreground">
					shadcn/ui를 사용한 TanStack 테이블의 종합적인 예제 모음입니다. 기본 사용법부터 고급 기능까지 다룹니다..
				</p>
			</div>

			<Separator />

			{/* Section 1: Basic Examples */}
			<section className="space-y-8">
				<div>
					<h2 className="text-3xl font-semibold tracking-tight">Basic Examples</h2>
					<p className="text-muted-foreground">Compare Tailwind CSS and CSS Module approaches</p>
				</div>
				<div className="space-y-8">
					{basicExample}
					<Separator />
					{basicExampleCssModule}
				</div>
			</section>

			<Separator className="my-12" />

			{/* Section 2: Core Features */}
			<section className="space-y-8">
				<div>
					<h2 className="text-3xl font-semibold tracking-tight">Core Features</h2>
					<p className="text-muted-foreground">Individual feature demonstrations</p>
				</div>
				<div className="space-y-8">
					{sortingExample}
					<Separator />
					{filteringExample}
					<Separator />
					{paginationExample}
					<Separator />
					{searchExample}
					<Separator />
					{selectionExample}
					<Separator />
					{columnVisibilityExample}
				</div>
			</section>

			<Separator className="my-12" />

			{/* Section 3: Advanced Features */}
			<section className="space-y-8">
				<div>
					<h2 className="text-3xl font-semibold tracking-tight">Advanced Features</h2>
					<p className="text-muted-foreground">Custom cells and action columns</p>
				</div>
				<div className="space-y-8">
					{customCellsExample}
					<Separator />
					{actionsExample}
				</div>
			</section>

			<Separator className="my-12" />

			{/* Section 4: Real-World Usage */}
			<section className="space-y-8">
				<div>
					<h2 className="text-3xl font-semibold tracking-tight">Real-World Usage</h2>
					<p className="text-muted-foreground">Production-ready patterns</p>
				</div>
				<div className="space-y-8">
					{allFeaturesExample}
					<Separator />
					{persistentStateExample}
				</div>
			</section>

			<Separator className="my-12" />

			{/* Section 5: API Integration */}
			<section className="space-y-8">
				<div>
					<h2 className="text-3xl font-semibold tracking-tight">API Integration</h2>
					<p className="text-muted-foreground">Server-side data fetching</p>
				</div>
				{apiIntegrationExample}
			</section>
		</div>
	);
}
