'use client';

import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	flexRender,
	type ColumnDef,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/core/components/shadcn/ui/table';
import { Button } from '@/core/components/shadcn/ui/button';
import {
	TableToolbar,
	TablePagination,
	ColumnToggle,
} from '@/app/(domains)/example/_components/data-table/common';
import { StatusBadge, UserAvatar } from '@/app/(domains)/example/_components/data-table/cells';
import { useTableState, useTablePersistence } from '@/app/(domains)/example/_hooks/data-table';
import type { User } from '@/app/(domains)/example/_types/data-table';
import { mockUsers } from '@/app/(domains)/example/_common/data-table/mock';
import { formatDate } from '@/app/(domains)/example/_common';

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
		header: 'Joined At',
		cell: ({ row }) => {
			return formatDate(row.getValue('joinedAt'), 'yyyy-MM-dd');
		},
	},
];

export function DataTablePersistent() {
	const {
		sorting,
		setSorting,
		columnFilters,
		setColumnFilters,
		columnVisibility,
		setColumnVisibility,
		globalFilter,
		setGlobalFilter,
		pagination,
		setPagination,
		resetState,
	} = useTableState();

	const { clearPersistedState } = useTablePersistence({
		key: 'data-table-persistent-state',
		sorting,
		setSorting,
		columnFilters,
		setColumnFilters,
		columnVisibility,
		setColumnVisibility,
		pagination,
		setPagination,
		globalFilter,
		setGlobalFilter,
	});

	const table = useReactTable({
		data: mockUsers,
		columns,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			globalFilter,
			pagination,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	const handleReset = () => {
		resetState();
		clearPersistedState();
	};

	return (
		<div className="w-full space-y-4">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Persistent State Example</h2>
				<p className="text-muted-foreground">Table state saved to localStorage</p>
			</div>
			<TableToolbar globalFilter={globalFilter} onGlobalFilterChange={setGlobalFilter}>
				<ColumnToggle table={table} />
				<Button variant="outline" size="sm" onClick={handleReset}>
					Reset State
				</Button>
			</TableToolbar>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : (
											<div
												className={header.column.getCanSort() ? 'flex cursor-pointer select-none items-center gap-2' : ''}
												onClick={header.column.getToggleSortingHandler()}
											>
												{flexRender(header.column.columnDef.header, header.getContext())}
												{{
													asc: ' 🔼',
													desc: ' 🔽',
												}[header.column.getIsSorted() as string] ?? null}
											</div>
										)}
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
			<TablePagination table={table} />
		</div>
	);
}
