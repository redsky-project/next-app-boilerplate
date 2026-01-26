'use client';

import { useEffect } from 'react';
import type {
	SortingState,
	ColumnFiltersState,
	VisibilityState,
	RowSelectionState,
	PaginationState,
} from '@tanstack/react-table';

interface TablePersistenceState {
	sorting?: SortingState;
	columnFilters?: ColumnFiltersState;
	columnVisibility?: VisibilityState;
	pagination?: PaginationState;
	globalFilter?: string;
}

interface UseTablePersistenceOptions {
	key: string;
	sorting?: SortingState;
	setSorting?: (sorting: SortingState) => void;
	columnFilters?: ColumnFiltersState;
	setColumnFilters?: (filters: ColumnFiltersState) => void;
	columnVisibility?: VisibilityState;
	setColumnVisibility?: (visibility: VisibilityState) => void;
	pagination?: PaginationState;
	setPagination?: (pagination: PaginationState) => void;
	globalFilter?: string;
	setGlobalFilter?: (filter: string) => void;
}

export function useTablePersistence({
	key,
	sorting,
	setSorting,
	columnFilters,
	setColumnFilters,
	columnVisibility,
	setColumnVisibility,
	pagination,
	setPagination,
	globalFilter,
	setGlobalFilter,
}: UseTablePersistenceOptions) {
	// Load state from localStorage on mount
	useEffect(() => {
		try {
			const savedState = localStorage.getItem(key);
			if (savedState) {
				const parsed: TablePersistenceState = JSON.parse(savedState);

				if (parsed.sorting && setSorting) {
					setSorting(parsed.sorting);
				}
				if (parsed.columnFilters && setColumnFilters) {
					setColumnFilters(parsed.columnFilters);
				}
				if (parsed.columnVisibility && setColumnVisibility) {
					setColumnVisibility(parsed.columnVisibility);
				}
				if (parsed.pagination && setPagination) {
					setPagination(parsed.pagination);
				}
				if (parsed.globalFilter && setGlobalFilter) {
					setGlobalFilter(parsed.globalFilter);
				}
			}
		} catch (error) {
			console.error('Failed to load table state from localStorage:', error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key]);

	// Save state to localStorage whenever it changes
	useEffect(() => {
		try {
			const stateToSave: TablePersistenceState = {
				...(sorting && { sorting }),
				...(columnFilters && { columnFilters }),
				...(columnVisibility && { columnVisibility }),
				...(pagination && { pagination }),
				...(globalFilter && { globalFilter }),
			};

			localStorage.setItem(key, JSON.stringify(stateToSave));
		} catch (error) {
			console.error('Failed to save table state to localStorage:', error);
		}
	}, [key, sorting, columnFilters, columnVisibility, pagination, globalFilter]);

	const clearPersistedState = () => {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error('Failed to clear table state from localStorage:', error);
		}
	};

	return { clearPersistedState };
}
