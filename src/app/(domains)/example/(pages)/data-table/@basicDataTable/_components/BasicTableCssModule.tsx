'use client';

import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table';
import { $utils } from '@utils';
import styles from '@/app/(domains)/example/_styles/data-table/DataTableBasic.module.css';

import type { User } from '@/app/(domains)/example/_types/data-table';
import { mockUsers } from '@/app/(domains)/example/_common/data-table/mock';

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

export default function BasicTableCssModule() {
	//console.log('BasicTable DATA::', mockUsers);
	const table = useReactTable({
		data: mockUsers.slice(0, 10), // 처음 10개만 표시
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<div className="rounded-md border">
				<table className={styles.table}>
					<thead className={styles.tableHeader}>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr
								key={headerGroup.id}
								className={styles.tableHeaderRow}
							>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className={styles.tableHeaderCell}
									>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className={styles.tableBody}>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<tr
									key={row.id}
									className={styles.tableRow}
								>
									{row.getVisibleCells().map((cell) => (
										<td
											key={cell.id}
											className={styles.tableCell}
										>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									))}
								</tr>
							))
						) : (
							<tr className={styles.tableRow}>
								<td
									colSpan={columns.length}
									className={styles.emptyState}
								>
									No results.
								</td>
							</tr>
						)}
					</tbody>
					<tfoot>
						{table.getFooterGroups().map((footerGroup) => (
							<tr
								key={footerGroup.id}
								className={styles.tableFooterRow}
							>
								{footerGroup.headers.map((header) => (
									<td
										key={header.id}
										className={styles.tableFooterCell}
									>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
									</td>
								))}
							</tr>
						))}
					</tfoot>
				</table>
			</div>
		</>
	);
}
