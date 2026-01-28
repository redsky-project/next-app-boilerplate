'use client';

import { useState } from 'react';
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	type ColumnDef,
	type PaginationState,
	type SortingState,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/core/components/shadcn/ui/table';
import { Input } from '@/core/components/shadcn/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/core/components/shadcn/ui/select';
import {
	TablePagination,
	DataTableSkeleton,
	EmptyState,
	ErrorState,
} from '@/app/(domains)/example/_components/data-table/common';
import { StatusBadge, UserAvatar } from '@/app/(domains)/example/_components/data-table/cells';
import { useApi } from '@/core/hooks';
import type { User, UsersApiResponse } from '@/app/(domains)/example/_types/data-table';
import { formatDate } from '@/app/(domains)/example/_common';

const columns: ColumnDef<User>[] = [
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
];

export function DataTableWithApi() {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [search, setSearch] = useState('');
	const [statusFilter, setStatusFilter] = useState<string>('');

	// API 파라미터 구성
	const queryParams: Record<string, string> = {
		page: String(pagination.pageIndex + 1),
		pageSize: String(pagination.pageSize),
	};

	if (sorting[0]) {
		queryParams.sortBy = sorting[0].id;
		queryParams.sortOrder = sorting[0].desc ? 'desc' : 'asc';
	}
	if (search) {
		queryParams.search = search;
	}
	if (statusFilter) {
		queryParams.status = statusFilter;
	}

	const { data, isLoading, error, refetch } = useApi<UsersApiResponse>('/api/data-table/users', {
		method: 'GET',
		params: queryParams,
	});

	const table = useReactTable({
		data: data?.data ?? [],
		columns,
		pageCount: data?.pagination.totalPages ?? 0,
		state: {
			pagination,
			sorting,
		},
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		manualSorting: true,
	});

	if (isLoading) {
		return <DataTableSkeleton columnCount={4}
rowCount={10} />;
	}

	if (error) {
		return <ErrorState onRetry={() => refetch()} />;
	}

	if (!data?.data.length) {
		return <EmptyState />;
	}

	return (
		<div className="w-full space-y-4">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">API Integration Example</h2>
				<p className="text-muted-foreground">Server-side data fetching with useApi hook</p>
			</div>
			<div className="flex items-center gap-4">
				<Input
					placeholder="Search..."
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setPagination({ ...pagination, pageIndex: 0 });
					}}
					className="max-w-sm"
				/>
				<Select
					value={statusFilter}
					onValueChange={(value) => {
						setStatusFilter(value === 'all' ? '' : value);
						setPagination({ ...pagination, pageIndex: 0 });
					}}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="All Status" />
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
						{table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<TablePagination table={table} />
		</div>
	);
}
