'use client';

interface EmptyStateProps {
	title?: string;
	description?: string;
	action?: React.ReactNode;
}

export function EmptyState({
	title = 'No data available',
	description = 'There are no records to display.',
	action,
}: EmptyStateProps) {
	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-md border border-dashed p-8 text-center">
			<div className="space-y-2">
				<h3 className="text-lg font-semibold tracking-tight">{title}</h3>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
			{action && <div className="mt-4">{action}</div>}
		</div>
	);
}
