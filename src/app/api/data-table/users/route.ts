import { NextRequest, NextResponse } from 'next/server';
import { mockUsers } from '@/app/(domains)/example/_common/data-table/mock';
import type { User } from '@/app/(domains)/example/_types/data-table';

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;

		// 쿼리 파라미터 추출
		const page = parseInt(searchParams.get('page') || '1');
		const pageSize = parseInt(searchParams.get('pageSize') || '10');
		const sortBy = searchParams.get('sortBy') || 'name';
		const sortOrder = searchParams.get('sortOrder') || 'asc';
		const search = searchParams.get('search') || '';
		const status = searchParams.get('status');
		const role = searchParams.get('role');

		let filteredUsers = [...mockUsers];

		// 1. 검색 필터링 (전역 검색)
		if (search) {
			const searchLower = search.toLowerCase();
			filteredUsers = filteredUsers.filter(
				(user) =>
					user.name.toLowerCase().includes(searchLower) || user.email.toLowerCase().includes(searchLower)
			);
		}

		// 2. 상태 필터링
		if (status) {
			filteredUsers = filteredUsers.filter((user) => user.status === status);
		}

		// 3. 역할 필터링
		if (role) {
			filteredUsers = filteredUsers.filter((user) => user.role === role);
		}

		// 4. 정렬
		filteredUsers.sort((a, b) => {
			const aValue = a[sortBy as keyof User];
			const bValue = b[sortBy as keyof User];

			if (typeof aValue === 'string' && typeof bValue === 'string') {
				return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
			}

			return 0;
		});

		// 5. 페이지네이션
		const totalCount = filteredUsers.length;
		const totalPages = Math.ceil(totalCount / pageSize);
		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

		// 6. 응답 반환
		return NextResponse.json({
			success: true,
			data: paginatedUsers,
			pagination: {
				page,
				pageSize,
				totalCount,
				totalPages,
				hasNextPage: page < totalPages,
				hasPreviousPage: page > 1,
			},
		});
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to fetch users',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
