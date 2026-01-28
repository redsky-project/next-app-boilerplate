'use client';

import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table';
import type { User } from '@/app/(domains)/example/_types/data-table';
import { mockUsers } from '@/app/(domains)/example/_common/data-table/mock';
import { formatDate } from '@/app/(domains)/example/_common';
import styles from '@/app/(domains)/example/_styles/data-table/DataTableBasic.module.css';

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

export function DataTableBasicCssModule() {
	const table = useReactTable({
		data: mockUsers.slice(0, 10),
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="w-full space-y-4">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Basic Data Table (CSS Module)</h2>
				<p className="text-muted-foreground">Same table using CSS Modules</p>
			</div>
			<div className={styles.tableContainer}>
				<div className={styles.tableBorder}>
					<table className={styles.table}>
						<thead className={styles.tableHeader}>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}
className={styles.tableHeaderRow}>
									{headerGroup.headers.map((header) => (
										<th key={header.id}
className={styles.tableHeaderCell}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody className={styles.tableBody}>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<tr key={row.id}
className={styles.tableRow}>
										{row.getVisibleCells().map((cell) => (
											<td key={cell.id}
className={styles.tableCell}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</td>
										))}
									</tr>
								))
							) : (
								<tr>
									<td colSpan={columns.length}
className={styles.emptyState}>
										No results.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
