'use client';

import { Button } from '@/core/components/shadcn/ui/button';

interface ErrorStateProps {
	title?: string;
	description?: string;
	onRetry?: () => void;
}

export function ErrorState({
	title = 'Something went wrong',
	description = 'An error occurred while loading the data.',
	onRetry,
}: ErrorStateProps) {
	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-md border border-destructive/50 bg-destructive/10 p-8 text-center">
			<div className="space-y-2">
				<h3 className="text-lg font-semibold tracking-tight text-destructive">{title}</h3>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
			{onRetry && (
				<Button variant="outline" onClick={onRetry} className="mt-4">
					Try again
				</Button>
			)}
		</div>
	);
}
