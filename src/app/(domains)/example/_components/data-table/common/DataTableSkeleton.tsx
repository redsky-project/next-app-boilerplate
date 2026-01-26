'use client';

import { Skeleton } from '@/core/components/shadcn/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/core/components/shadcn/ui/table';

interface DataTableSkeletonProps {
	columnCount?: number;
	rowCount?: number;
}

export function DataTableSkeleton({ columnCount = 5, rowCount = 10 }: DataTableSkeletonProps) {
	return (
		<div className="w-full space-y-4">
			<div className="flex items-center justify-between">
				<Skeleton className="h-10 w-[250px]" />
				<Skeleton className="h-10 w-[100px]" />
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							{Array.from({ length: columnCount }).map((_, i) => (
								<TableHead key={i}>
									<Skeleton className="h-6 w-full" />
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: rowCount }).map((_, i) => (
							<TableRow key={i}>
								{Array.from({ length: columnCount }).map((_, j) => (
									<TableCell key={j}>
										<Skeleton className="h-6 w-full" />
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
