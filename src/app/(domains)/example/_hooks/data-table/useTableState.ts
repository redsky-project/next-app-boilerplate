'use client';

import { useState, useCallback } from 'react';
import type {
	SortingState,
	ColumnFiltersState,
	VisibilityState,
	RowSelectionState,
	PaginationState,
} from '@tanstack/react-table';

export function useTableState() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const [globalFilter, setGlobalFilter] = useState('');
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const resetState = useCallback(() => {
		setSorting([]);
		setColumnFilters([]);
		setColumnVisibility({});
		setRowSelection({});
		setGlobalFilter('');
		setPagination({ pageIndex: 0, pageSize: 10 });
	}, []);

	return {
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
	};
}
