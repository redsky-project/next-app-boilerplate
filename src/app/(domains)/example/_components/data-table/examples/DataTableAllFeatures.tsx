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
import { Checkbox } from '@/core/components/shadcn/ui/checkbox';
import {
	TableToolbar,
	TablePagination,
	ColumnToggle,
} from '@/app/(domains)/example/_components/data-table/common';
import { StatusBadge, UserAvatar, ActionButtons } from '@/app/(domains)/example/_components/data-table/cells';
import { useTableState } from '@/app/(domains)/example/_hooks/data-table';
import type { User } from '@/app/(domains)/example/_types/data-table';
import { mockUsers } from '@/app/(domains)/example/_common/data-table/mock';
import { formatDate } from '@/app/(domains)/example/_common';

const columns: ColumnDef<User>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: 'User',
		cell: ({ row }) => (
			<UserAvatar name={row.original.name}
email={row.original.email}
avatar={row.original.avatar} />
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
		enableSorting: false,
		enableHiding: false,
	},
];

export function DataTableAllFeatures() {
	const {
		sorting,
		setSorting,
		columnFilters,
		setColumnFilters,
		columnVisibility,
		setColumnVisibility,
		rowSelection,
		setRowSelection,
		globalFilter,
		setGlobalFilter,
		pagination,
		setPagination,
		resetState,
	} = useTableState();

	const table = useReactTable({
		data: mockUsers,
		columns,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			globalFilter,
			pagination,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		enableRowSelection: true,
	});

	const selectedCount = table.getFilteredSelectedRowModel().rows.length;

	return (
		<div className="w-full space-y-4">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">All Features Combined</h2>
				<p className="text-muted-foreground">Production-ready table with all features</p>
			</div>
			<TableToolbar
				globalFilter={globalFilter}
				onGlobalFilterChange={setGlobalFilter}
				selectedCount={selectedCount}
				onClearSelection={() => setRowSelection({})}
			>
				<ColumnToggle table={table} />
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
								<TableRow key={row.id}
data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length}
className="h-24 text-center">
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
