/**
 * QueryProvider
 *
 * TanStack Query(React Query)를 애플리케이션에 제공하는 Provider 컴포넌트
 *
 * 주요 기능:
 * - QueryClient를 생성하고 React 생명주기와 동기화
 * - QueryClientProvider를 통해 하위 컴포넌트에서 React Query 사용 가능
 * - 개발 환경에서 ReactQueryDevtools 제공 (데이터 페칭 상태 디버깅, 라이브러리 설치 필요)
 * - TanStack Query Devtools Extension을 위한 전역 QueryClient 설정
 *
 * @example
 * ```tsx
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 * ```
 */
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/core/common/config/react-query';
import { ReactNode, useState, useEffect } from 'react';

interface QueryProviderProps {
	children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
	// useState로 QueryClient를 초기화하여 React 생명주기와 동기화
	const [queryClient] = useState(() => getQueryClient());

	// Tanstack Query Client를 전역 변수로 설정(Devtools Extension 사용 시 필요) =======
	useEffect(() => {
		window.__TANSTACK_QUERY_CLIENT__ = queryClient;
	}, [queryClient]);
	// Tanstack Query Client를 전역 변수로 설정(Devtools Extension 사용 시 필요) =======

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	);
}
