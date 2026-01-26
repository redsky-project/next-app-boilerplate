'use client';

import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/core/components/shadcn/ui/table';
import { ActionButtons } from '@/app/(domains)/example/_components/data-table/cells';
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
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => (
			<ActionButtons
				onView={() => alert(`View: ${row.original.name}`)}
				onEdit={() => alert(`Edit: ${row.original.name}`)}
				onDelete={() => alert(`Delete: ${row.original.name}`)}
			/>
		),
	},
];

export function DataTableWithActions() {
	const table = useReactTable({
		data: mockUsers.slice(0, 10),
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="w-full space-y-4">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Actions Example</h2>
				<p className="text-muted-foreground">Action buttons for each row</p>
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
