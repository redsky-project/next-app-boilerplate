'use client';

import { useState } from 'react';
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	type ColumnDef,
	type VisibilityState,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/core/components/shadcn/ui/table';
import { ColumnToggle } from '@/app/(domains)/example/_components/data-table/common';
import type { User } from '@/app/(domains)/example/_types/data-table';
import { mockUsers } from '@/app/(domains)/example/_common/data-table/mock';
import { formatDate } from '@/app/(domains)/example/_common';

const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'role',
		header: 'Role',
	},
	{
		accessorKey: 'joinedAt',
		header: 'Joined At',
		cell: ({ row }) => {
			return formatDate(row.getValue('joinedAt'), 'yyyy-MM-dd');
		},
	},
];

export function DataTableWithColumnVisibility() {
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const table = useReactTable({
		data: mockUsers.slice(0, 10),
		columns,
		state: {
			columnVisibility,
		},
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="w-full space-y-4">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Column Visibility Example</h2>
				<p className="text-muted-foreground">Show/hide columns dynamically</p>
			</div>
			<div className="flex items-center justify-end">
				<ColumnToggle table={table} />
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
