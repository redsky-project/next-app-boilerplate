'use client';

import { DataTable, type TDataTableColumns } from '@components/ui';
import { $utils } from '@utils';
import { CodeBlockClient, Button, Icon } from '@components/ui';

import type { User } from '@/app/(domains)/example/_types/data-table';
import { mockUsers } from '@/app/(domains)/example/_common/data-table/mock';

const columns: TDataTableColumns<User>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'email',
		header: 'Email',
		//header: ({ column }) => {
		//	return (
		//		<Button
		//			variant="ghost"
		//			onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
		//		>
		//			Email
		//			<Icon
		//				name="ArrowUpDown"
		//				className="ml-2 h-4 w-4"
		//			/>
		//		</Button>
		//	);
		//},
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
		//header: ({ column }) => {
		//	return (
		//		<Button
		//			variant="ghost"
		//			onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
		//		>
		//			Joined At
		//			{column.getIsSorted() === 'asc' ? (
		//				<Icon
		//					name="ArrowUp"
		//					className="ml-2 h-4 w-4"
		//				/>
		//			) : (
		//				<Icon
		//					name="ArrowDown"
		//					className="ml-2 h-4 w-4"
		//				/>
		//			)}
		//			{/*<Icon
		//				name="ArrowUpDown"
		//				className="ml-2 h-4 w-4"
		//			/>*/}
		//		</Button>
		//	);
		//},
		cell: ({ row }: { row: any }) => {
			return $utils.date.formatDate(row.getValue('joinedAt'), 'YYYY-MM-DD');
		},
	},
];

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
					<li>정렬 기능이 있는 DataTable 컴포넌트 사용 예제입니다.</li>
				</ul>
			</div>

			<div className="w-full flex-1 py-4">
				<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
					<div className="w-full mx-auto my-5 p-6 pt-0">
						{/*<strong>기본 DataTable 예제(Shadcn/ui Table, Tailwind CSS 사용)</strong>
						<Separator className="my-4" />*/}
						{/* posts 데이터 화면에 표시 영역 */}
						<div className="grid gap-4">
							<DataTable
								columns={columns}
								data={mockUsers.slice(0, 10)}
							/>
						</div>
					</div>
					<CodeBlockClient
						code={`'use client';

import { DataTable, type TDataTableColumns } from '@components/ui';
import { $utils } from '@utils';

import type { User } from '@/app/(domains)/example/_types/data-table';
/* User 타입 정의 예제
export type UserStatus = 'active' | 'inactive' | 'pending';
export type UserRole = 'admin' | 'user' | 'moderator';

export interface User {
	id: string;
	name: string;
	email: string;
	status: UserStatus;
	role: UserRole;
	joinedAt: string;
	lastActive: string;
	avatar?: string;
}
*/

import { mockUsers } from '@/app/(domains)/example/_common/data-table/mock';

const columns: TDataTableColumns<User>[] = [
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
		cell: ({ row }: { row: any }) => {
			return $utils.date.formatDate(row.getValue('joinedAt'), 'YYYY-MM-DD');
		},
	},
];

function SamplePage() {
	return (
		<DataTable
			columns={columns}
			data={mockUsers.slice(0, 10)}
		/>
	);
}`}
						lang="tsx"
					/>
				</div>
			</div>
		</>
	);
}
