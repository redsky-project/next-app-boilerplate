'use client';

import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/core/components/shadcn/ui/table';
import { StatusBadge, UserAvatar, DateCell } from '@/app/(domains)/example/_components/data-table/cells';
import type { User } from '@/app/(domains)/example/_types/data-table';
import { mockUsers } from '@/app/(domains)/example/_common/data-table/mock';

const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'name',
		header: 'User',
		cell: ({ row }) => (
			<UserAvatar name={row.original.name} email={row.original.email} avatar={row.original.avatar} />
		),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => <StatusBadge status={row.original.status} />,
	},
	{
		accessorKey: 'role',
		header: 'Role',
		cell: ({ row }) => <span className="capitalize">{row.original.role}</span>,
	},
	{
		accessorKey: 'joinedAt',
		header: 'Joined',
		cell: ({ row }) => <DateCell date={row.original.joinedAt} />,
	},
	{
		accessorKey: 'lastActive',
		header: 'Last Active',
		cell: ({ row }) => <DateCell date={row.original.lastActive} showRelative />,
	},
];

export function DataTableWithCustomCells() {
	const table = useReactTable({
		data: mockUsers.slice(0, 15),
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="w-full space-y-4">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Custom Cells Example</h2>
				<p className="text-muted-foreground">Rich cell rendering with custom components</p>
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
