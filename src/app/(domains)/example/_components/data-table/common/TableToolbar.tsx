'use client';

import { ReactNode } from 'react';
import { Input } from '@/core/components/shadcn/ui/input';
import { Button } from '@/core/components/shadcn/ui/button';

interface TableToolbarProps {
	globalFilter: string;
	onGlobalFilterChange: (value: string) => void;
	selectedCount?: number;
	onClearSelection?: () => void;
	children?: ReactNode;
}

export function TableToolbar({
	globalFilter,
	onGlobalFilterChange,
	selectedCount = 0,
	onClearSelection,
	children,
}: TableToolbarProps) {
	return (
		<div className="flex items-center justify-between gap-4 py-4">
			<div className="flex flex-1 items-center gap-2">
				<Input
					placeholder="Search..."
					value={globalFilter}
					onChange={(e) => onGlobalFilterChange(e.target.value)}
					className="max-w-sm"
				/>
				{selectedCount > 0 && (
					<div className="flex items-center gap-2">
						<span className="text-sm text-muted-foreground">{selectedCount} selected</span>
						{onClearSelection && (
							<Button variant="ghost" size="sm" onClick={onClearSelection}>
								Clear
							</Button>
						)}
					</div>
				)}
			</div>
			<div className="flex items-center gap-2">{children}</div>
		</div>
	);
}
