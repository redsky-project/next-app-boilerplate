---
name: Data Table Examples Enhanced
overview: shadcn/ui Data Table을 사용한 포괄적인 예제 페이지를 구현합니다. 기본 기능부터 실전 활용까지, Tailwind CSS와 CSS Module 두 가지 스타일링 방식을 포함하며, 재사용 가능한 공통 컴포넌트와 커스텀 훅을 제공합니다. 500건의 가상 데이터와 API 연동 예제를 통해 실무에서 바로 활용 가능한 패턴을 보여줍니다.
todos:
  - id: install-packages
    content: '@tanstack/react-table 및 shadcn/ui 컴포넌트 설치'
    status: pending
  - id: create-types
    content: 타입 정의 파일 생성 (user.types.ts, table state 타입 등)
    status: pending
  - id: create-mock-data
    content: 500건의 가상 사용자 데이터 생성
    status: pending
  - id: create-styles
    content: _styles 폴더 생성 및 CSS Module 파일 작성
    status: pending
  - id: common-components
    content: 공통 컴포넌트 구현 (TableToolbar, TablePagination, ColumnToggle, Skeleton, EmptyState, ErrorState)
    status: pending
  - id: cell-components
    content: 셀 렌더링 컴포넌트 구현 (StatusBadge, UserAvatar, ActionButtons, DateCell)
    status: pending
  - id: custom-hooks
    content: 커스텀 훅 구현 (useTableState, useTablePersistence)
    status: pending
  - id: basic-examples
    content: 기본 예제 구현 (Tailwind, CSS Module)
    status: pending
  - id: feature-examples
    content: 개별 기능 예제 구현 (정렬, 필터, 페이지네이션, 검색, 선택, 컬럼 표시)
    status: pending
  - id: advanced-examples
    content: 고급 기능 예제 구현 (커스텀 셀, 액션 컬럼)
    status: pending
  - id: practical-examples
    content: 실전 예제 구현 (복합 기능, 상태 저장)
    status: pending
  - id: api-integration
    content: API 연동 예제 및 Route Handler 구현
    status: pending
  - id: layout-page
    content: 메인 layout.tsx 구현 (13개 Parallel Routes)
    status: pending
  - id: testing-polish
    content: 테스트, 접근성, 에러 처리, 문서화
    status: pending
isProject: false
---

# Data Table 예제 페이지 구현 플랜 (Enhanced)

## 1. 패키지 설치

**필수 패키지 설치**

- `@tanstack/react-table`: ^8.x (Data Table 핵심 라이브러리)
- `@tanstack/react-virtual`: ^3.x (가상 스크롤링, 선택사항)

**shadcn/ui 컴포넌트 추가**

- `table`: 기본 테이블 컴포넌트
- `badge`: 상태 표시용
- `popover`: 필터 UI용
- `command`: 검색/필터 UI용
- `avatar`: 사용자 아바타 표시용

## 2. 프로젝트 구조 (개선됨)

```
src/app/(domains)/example/
├── _types/
│   └── data-table/                          # 타입 정의 (공통)
│       ├── index.ts
│       └── user.types.ts
├── _common/
│   └── data-table/
│       └── mock/                            # Mock 데이터 (공통)
│           ├── index.ts
│           └── users.mock.ts                # 500건 가상 데이터
└── (pages)/
    └── data-table/
        ├── layout.tsx                       # 메인 레이아웃
        ├── @basicExample/                   # 1. 기본 (Tailwind)
        │   └── page.tsx
        ├── @basicExampleCssModule/          # 2. 기본 (CSS Module)
        │   └── page.tsx
        ├── @sortingExample/                 # 3. 정렬
        │   └── page.tsx
        ├── @filteringExample/               # 4. 필터링
        │   └── page.tsx
        ├── @paginationExample/              # 5. 페이지네이션
        │   └── page.tsx
        ├── @searchExample/                  # 6. 검색
        │   └── page.tsx
        ├── @selectionExample/               # 7. 행 선택
        │   └── page.tsx
        ├── @columnVisibilityExample/        # 8. 컬럼 표시/숨김
        │   └── page.tsx
        ├── @customCellsExample/             # 9. 커스텀 셀 렌더링 ⭐ NEW
        │   └── page.tsx
        ├── @actionsExample/                 # 10. 액션 컬럼 ⭐ NEW
        │   └── page.tsx
        ├── @allFeaturesExample/             # 11. 복합 기능 ⭐ NEW
        │   └── page.tsx
        ├── @persistentStateExample/         # 12. 상태 저장 ⭐ NEW
        │   └── page.tsx
        ├── @apiIntegrationExample/          # 13. API 연동
        │   └── page.tsx
        ├── _styles/                         # CSS Module 스타일 ⭐ NEW
        │   └── DataTableBasic.module.css
        ├── _components/
        │   ├── common/                      # 공통 컴포넌트
        │   │   ├── TableToolbar.tsx         # 검색/필터 툴바
        │   │   ├── TablePagination.tsx      # 재사용 페이지네이션
        │   │   ├── ColumnToggle.tsx         # 컬럼 토글 드롭다운
        │   │   ├── DataTableSkeleton.tsx    # 로딩 스켈레톤
        │   │   ├── EmptyState.tsx           # 빈 상태
        │   │   └── ErrorState.tsx           # 에러 상태
        │   ├── cells/                       # 셀 렌더링 컴포넌트
        │   │   ├── StatusBadge.tsx          # 상태 뱃지
        │   │   ├── UserAvatar.tsx           # 사용자 아바타
        │   │   ├── ActionButtons.tsx        # 액션 버튼
        │   │   └── DateCell.tsx             # 날짜 포맷팅
        │   └── examples/                    # 예제별 컴포넌트
        │       ├── DataTableBasic.tsx
        │       ├── DataTableBasicCssModule.tsx
        │       ├── DataTableWithSorting.tsx
        │       ├── DataTableWithFiltering.tsx
        │       ├── DataTableWithPagination.tsx
        │       ├── DataTableWithSearch.tsx
        │       ├── DataTableWithSelection.tsx
        │       ├── DataTableWithColumnVisibility.tsx
        │       ├── DataTableWithCustomCells.tsx
        │       ├── DataTableWithActions.tsx
        │       ├── DataTableAllFeatures.tsx
        │       ├── DataTablePersistent.tsx
        │       └── DataTableWithApi.tsx
        └── _hooks/                          # 커스텀 훅
            ├── useTableState.ts             # 테이블 상태 관리
            └── useTablePersistence.ts       # localStorage 저장/복원
```

**폴더 구조 개선 포인트:**

- `_styles/` 폴더: CSS Module 파일들을 별도로 관리
- `_components/`, `_hooks/`, `_styles/`로 관심사 명확히 분리
- import 경로: `'../_styles/DataTableBasic.module.css'`

## 3. 주요 구현 내용

### 3.1 타입 정의 (공통 폴더)

**[`src/app/(domains)/example/_types/data-table/user.types.ts`](<src/app/(domains)/example/_types/data-table/user.types.ts>)**

```typescript
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
```

**[`src/app/(domains)/example/_types/data-table/index.ts`](<src/app/(domains)/example/_types/data-table/index.ts>)**

```typescript
export * from './user.types';
```

### 3.2 가상 데이터 생성 (공통 폴더)

**[`src/app/(domains)/example/_common/data-table/mock/users.mock.ts`](<src/app/(domains)/example/_common/data-table/mock/users.mock.ts>)**

- 500건의 가상 사용자 데이터
- 다양한 상태, 역할, 날짜 조합
- 랜덤 이름, 이메일, 아바타 URL

**[`src/app/(domains)/example/_common/data-table/mock/index.ts`](<src/app/(domains)/example/_common/data-table/mock/index.ts>)**

```typescript
export * from './users.mock';
```

### 3.3 스타일 파일 (NEW ⭐)

**[`(pages)/data-table/_styles/DataTableBasic.module.css`](<src/app/(domains)/example/(pages)/data-table/_styles/DataTableBasic.module.css>)**

```css
/* CSS Module for Data Table */
.tableContainer {
	width: 100%;
}

.tableBorder {
	border-radius: 0.375rem;
	border: 1px solid #e5e7eb;
	overflow: hidden;
}

.table {
	width: 100%;
	border-collapse: collapse;
}

.tableHeader {
	background-color: #f9fafb;
}

.tableHeaderCell {
	padding: 0.75rem 1rem;
	text-align: left;
	font-size: 0.875rem;
	font-weight: 500;
	color: #374151;
}

.tableBody {
	/* body styles */
}

.tableRow {
	border-top: 1px solid #e5e7eb;
	transition: background-color 0.15s ease;
}

.tableRow:hover {
	background-color: #f9fafb;
}

.tableCell {
	padding: 0.75rem 1rem;
	font-size: 0.875rem;
	color: #1f2937;
}

/* Dark mode support */
:global(.dark) .tableBorder {
	border-color: #374151;
}

:global(.dark) .tableHeader {
	background-color: #1f2937;
}

:global(.dark) .tableHeaderCell {
	color: #e5e7eb;
}

:global(.dark) .tableRow {
	border-color: #374151;
}

:global(.dark) .tableRow:hover {
	background-color: #1f2937;
}

:global(.dark) .tableCell {
	color: #d1d5db;
}
```

### 3.4 공통 컴포넌트

**1) TableToolbar** [`_components/common/TableToolbar.tsx`](<src/app/(domains)/example/(pages)/data-table/_components/common/TableToolbar.tsx>)

```typescript
'use client';

import { ReactNode } from 'react';
import { Input } from '@/core/components/shadcn/ui/input';
import { Button } from '@/core/components/shadcn/ui/button';
import { Icon } from '@components/ui';

interface TableToolbarProps {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  selectedCount?: number;
  onClearSelection?: () => void;
  children?: ReactNode;
}

export function TableToolbar({
  globalFilter,
  onGlobalFilterChange,
  selectedCount = 0,
  onClearSelection,
  children,
}: TableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          className="max-w-sm"
        />
        {selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedCount} selected
            </span>
            {onClearSelection && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSelection}
              >
                Clear
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {children}
      </div>
    </div>
  );
}
```

**2) TablePagination** [`_components/common/TablePagination.tsx`](<src/app/(domains)/example/(pages)/data-table/_components/common/TablePagination.tsx>)

```typescript
'use client';

import { Table } from '@tanstack/react-table';
import { Button } from '@/core/components/shadcn/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/shadcn/ui/select';
import { Icon } from '@components/ui';

interface TablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function TablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 50, 100],
}: TablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Rows per page
        </p>
        <Select
          value={String(table.getState().pagination.pageSize)}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <Icon name="ChevronsLeft" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Icon name="ChevronLeft" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Icon name="ChevronRight" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <Icon name="ChevronsRight" />
          </Button>
        </div>
      </div>
    </div>
  );
}
```

**3) ColumnToggle** - 드롭다운으로 컬럼 토글

**4) DataTableSkeleton** - 로딩 스켈레톤

**5) EmptyState** - 데이터 없을 때 표시

**6) ErrorState** - 에러 상태 표시

### 3.5 셀 렌더링 컴포넌트

**1) StatusBadge** [`_components/cells/StatusBadge.tsx`](<src/app/(domains)/example/(pages)/data-table/_components/cells/StatusBadge.tsx>)

```typescript
'use client';

import { Badge } from '@/core/components/shadcn/ui/badge';
import type { UserStatus } from '@/app/(domains)/example/_types/data-table';

interface StatusBadgeProps {
  status: UserStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants = {
    active: 'default',
    inactive: 'secondary',
    pending: 'outline',
  } as const;

  const labels = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
  };

  return (
    <Badge variant={variants[status]}>
      {labels[status]}
    </Badge>
  );
}
```

**2) UserAvatar** - 아바타 + 이름/이메일

**3) ActionButtons** - 수정/삭제/보기 버튼

**4) DateCell** - 날짜 포맷팅

### 3.6 커스텀 훅

**1) useTableState** [`_hooks/useTableState.ts`](<src/app/(domains)/example/(pages)/data-table/_hooks/useTableState.ts>)

```typescript
'use client';

import { useState, useCallback } from 'react';
import type { SortingState, ColumnFiltersState, VisibilityState, RowSelectionState } from '@tanstack/react-table';

export function useTableState() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const [globalFilter, setGlobalFilter] = useState('');

	const resetState = useCallback(() => {
		setSorting([]);
		setColumnFilters([]);
		setColumnVisibility({});
		setRowSelection({});
		setGlobalFilter('');
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
		resetState,
	};
}
```

**2) useTablePersistence** - localStorage 저장/복원

### 3.7 예제별 Data Table 컴포넌트

#### 기존 예제 (1-8번)

1. **기본 Data Table (Tailwind)** - TanStack Table 기본
2. **기본 Data Table (CSS Module)** - CSS Module 스타일
   - import: `import styles from '../_styles/DataTableBasic.module.css';`

3. **정렬** - 컬럼 헤더 클릭 정렬
4. **필터링** - 컬럼별 필터
5. **페이지네이션** - 페이지 나누기
6. **검색** - 전역 검색
7. **행 선택** - 체크박스 선택
8. **컬럼 표시/숨김** - 컬럼 토글

#### 새로운 예제 (9-13번) ⭐

**9) 커스텀 셀 렌더링** - StatusBadge, UserAvatar, DateCell 사용

**10) 액션 컬럼** - 수정/삭제/보기 버튼

**11) 복합 기능 (실전 테이블)** - 모든 기능 결합

**12) 상태 저장** - localStorage 활용

**13) API 연동** - useApi 훅 사용

## 4. 레이아웃 구성

[`layout.tsx`](<src/app/(domains)/example/(pages)/data-table/layout.tsx>)

```typescript
export interface IDataTableLayoutProps {
	basicExample: ReactNode;
	basicExampleCssModule: ReactNode;
	sortingExample: ReactNode;
	filteringExample: ReactNode;
	paginationExample: ReactNode;
	searchExample: ReactNode;
	selectionExample: ReactNode;
	columnVisibilityExample: ReactNode;
	customCellsExample: ReactNode;
	actionsExample: ReactNode;
	allFeaturesExample: ReactNode;
	persistentStateExample: ReactNode;
	apiIntegrationExample: ReactNode;
}
```

**섹션 구성:**

1. **소개** - Data Table 개요
2. **기본 사용법** - Tailwind vs CSS Module
3. **개별 기능** - 정렬, 필터, 페이지네이션 등
4. **고급 기능** - 커스텀 셀, 액션 컬럼
5. **실전 활용** - 복합 기능, 상태 저장
6. **API 연동** - 실제 API 사용

## 5. Route Handler (API 연동용)

**[`src/app/api/data-table/users/route.ts`](src/app/api/data-table/users/route.ts)**

- GET 요청 처리
- 쿼리 파라미터: page, pageSize, sortBy, sortOrder, search, status, role
- 검색, 필터, 정렬, 페이지네이션 적용
- JSON 응답 반환

## 6. 예제 페이지 순서

### 기본 (1-2)

1. **Basic Data Table (Tailwind)**: 기본 구조
2. **Basic Data Table (CSS Module)**: 스타일링 비교

### 개별 기능 (3-8)

3. **정렬 (Sorting)**
4. **필터링 (Filtering)**
5. **페이지네이션 (Pagination)**
6. **검색 (Search)**
7. **행 선택 (Selection)**
8. **컬럼 표시/숨김 (Column Visibility)**

### 고급 기능 (9-10) ⭐

9. **커스텀 셀 렌더링 (Custom Cells)**
10. **액션 컬럼 (Actions)**

### 실전 활용 (11-12) ⭐

11. **복합 기능 (All Features)**
12. **상태 저장 (Persistent State)**

### API 연동 (13)

13. **API 연동 (API Integration)**

## 7. CSS Module 사용 예시

**Tailwind CSS 방식:**

```tsx
<div className="w-full">
	<div className="rounded-md border">
		<table className="w-full">
			<thead className="bg-muted/50">{/* ... */}</thead>
		</table>
	</div>
</div>
```

**CSS Module 방식:**

```tsx
import styles from '../_styles/DataTableBasic.module.css';

<div className={styles.tableContainer}>
	<div className={styles.tableBorder}>
		<table className={styles.table}>
			<thead className={styles.tableHeader}>{/* ... */}</thead>
		</table>
	</div>
</div>;
```

## 8. 코드 품질 & 성능

- TypeScript strict 모드
- React.memo로 최적화
- useMemo/useCallback 적절히 사용
- 에러 바운더리
- 로딩/빈/에러 상태 처리
- 접근성 (ARIA, 키보드 네비게이션)
- 다크모드 지원

## 9. 참고사항

- 기존 프로젝트 패턴 준수
- `_components/`, `_hooks/`, `_styles/`로 관심사 분리
- CSS Module import: `'../_styles/FileName.module.css'`
- 공통 컴포넌트 재사용
- 커스텀 훅으로 로직 분리
- 타입 안정성
- 실용적인 예제 중심
