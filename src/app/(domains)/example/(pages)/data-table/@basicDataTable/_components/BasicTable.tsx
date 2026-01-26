'use client';

import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table';
import { $utils } from '@utils';

import type { User } from '@/app/(domains)/example/_types/data-table';
import { mockUsers } from '@/app/(domains)/example/_common/data-table/mock';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableFooter,
} from '@/core/components/shadcn/ui/table';

const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		footer: (info) => info.column.id,
	},
	{
		accessorKey: 'email',
		header: 'Email',
		footer: (info) => info.column.id,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		footer: (info) => info.column.id,
	},
	{
		accessorKey: 'role',
		header: 'Role',
		footer: (info) => info.column.id,
	},
	{
		accessorKey: 'joinedAt',
		header: 'Joined At',
		cell: ({ row }) => {
			return $utils.date.formatDate(row.getValue('joinedAt'), 'YYYY-MM-DD');
		},
		footer: (info) => info.column.id,
	},
];

export default function BasicTable() {
	//console.log('BasicTable DATA::', mockUsers);
	const table = useReactTable({
		data: mockUsers.slice(0, 10), // 처음 10개만 표시
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
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
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						{table.getFooterGroups().map((footerGroup) => (
							<TableRow key={footerGroup.id}>
								{footerGroup.headers.map((header) => (
									<TableCell key={header.id}>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableFooter>
				</Table>
			</div>
		</>
	);
}
