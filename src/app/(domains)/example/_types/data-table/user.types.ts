import type {
	SortingState,
	ColumnFiltersState,
	VisibilityState,
	RowSelectionState,
	PaginationState,
} from '@tanstack/react-table';

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

// 테이블 상태 타입
export interface TableState {
	sorting: SortingState;
	columnFilters: ColumnFiltersState;
	columnVisibility: VisibilityState;
	rowSelection: RowSelectionState;
	pagination: PaginationState;
	globalFilter: string;
}

// API 응답 타입
export interface UsersApiResponse {
	success: boolean;
	data: User[];
	pagination: {
		page: number;
		pageSize: number;
		totalCount: number;
		totalPages: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
	};
}

export interface UsersApiError {
	success: false;
	error: string;
	message: string;
}
