'use client';

import { Table } from '@tanstack/react-table';
import { Button } from '@/core/components/shadcn/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/core/components/shadcn/ui/select';

interface TablePaginationProps<TData> {
	table: Table<TData>;
	pageSizeOptions?: number[];
}

export function TablePagination<TData>({ table, pageSizeOptions = [10, 20, 50, 100] }: TablePaginationProps<TData>) {
	return (
		<div className="flex items-center justify-between px-2 py-4">
			<div className="flex items-center gap-2">
				<p className="text-sm text-muted-foreground">Rows per page</p>
				<Select
					value={String(table.getState().pagination.pageSize)}
					onValueChange={(value) => {
						table.setPageSize(Number(value));
					}}
				>
					<SelectTrigger className="h-8 w-[70px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{pageSizeOptions.map((size) => (
							<SelectItem key={size} value={String(size)}>
								{size}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="flex items-center gap-6">
				<div className="text-sm text-muted-foreground">
					Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						{'<<'}
					</Button>
					<Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
						{'<'}
					</Button>
					<Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
						{'>'}
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						{'>>'}
					</Button>
				</div>
			</div>
		</div>
	);
}
