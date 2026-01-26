'use client';

import { useState } from 'react';
import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	flexRender,
	type ColumnDef,
	type ColumnFiltersState,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/core/components/shadcn/ui/table';
import { Input } from '@/core/components/shadcn/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/core/components/shadcn/ui/select';
import type { User } from '@/app/(domains)/example/_types/data-table';
import { mockUsers } from '@/app/(domains)/example/_common/data-table/mock';

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
];

export function DataTableWithFiltering() {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const table = useReactTable({
		data: mockUsers.slice(0, 50),
		columns,
		state: {
			columnFilters,
		},
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	return (
		<div className="w-full space-y-4">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Filtering Example</h2>
				<p className="text-muted-foreground">Filter by name or status</p>
			</div>
			<div className="flex items-center gap-4">
				<Input
					placeholder="Filter by name..."
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
					className="max-w-sm"
				/>
				<Select
					value={(table.getColumn('status')?.getFilterValue() as string) ?? 'all'}
					onValueChange={(value) => table.getColumn('status')?.setFilterValue(value === 'all' ? '' : value)}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Status</SelectItem>
						<SelectItem value="active">Active</SelectItem>
						<SelectItem value="inactive">Inactive</SelectItem>
						<SelectItem value="pending">Pending</SelectItem>
					</SelectContent>
				</Select>
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
