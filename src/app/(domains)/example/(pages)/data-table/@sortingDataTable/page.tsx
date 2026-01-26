'use client';

import { CodeBlockClient } from '@components/ui';
import { Separator } from '@/core/components/shadcn/ui/separator';
import dynamic from 'next/dynamic';

const SortingTable = dynamic(() => import('./_components/SortingTable').then((mod) => mod.default), {
	loading: () => <div className="rounded-md border">Loading...</div>,
	ssr: false,
});

export default function SortingDataTablePage() {
	return (
		<>
			<div className="flex flex-col gap-2 pt-6">
				<div className="flex items-start justify-between">
					<h2
						data-shorcut="true"
						className="scroll-m-20 text-2xl font-semibold tracking-tight sm:text-2xl xl:text-2xl"
					>
						Sorting DataTable
					</h2>
					<div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
						&nbsp;
					</div>
				</div>
				<ul className="list-disc list-inside text-muted-foreground text-[1.05rem] text-balance sm:text-base">
					<li>Sorting DataTable 예제입니다.</li>
				</ul>
			</div>

			<div className="w-full flex-1 py-4">
				<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
					<div className="w-full mx-auto my-5 p-6 pt-0">
						<strong>Sorting DataTable 예제(Shadcn/ui Table, Tailwind CSS 사용)</strong>
						<Separator className="my-4" />
						{/* posts 데이터 화면에 표시 영역 */}
						<div className="grid gap-4">
							<SortingTable />
						</div>
					</div>
					<CodeBlockClient
						code={`'use client';

import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table';
import { $utils } from '@utils';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableFooter,
} from '@components/ui';

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

function SamplePage() {
	const table = useReactTable({
		data: mockUsers.slice(0, 10), // 처음 10개만 표시
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
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
	);
}`}
						lang="tsx"
					/>
				</div>
			</div>
		</>
	);
}
