'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { $router } from '@router';

interface RouterProviderProps {
	children: ReactNode;
}

/**
 * 라우터 프로바이더
 * Next.js의 useRouter를 $router 객체에 연결하여
 * 클라이언트 환경에서 SPA 네비게이션을 제공합니다.
 * 
 * @example
 * <RouterProvider>
 *   <App />
 * </RouterProvider>
 */
export function RouterProvider({ children }: RouterProviderProps) {
	const router = useRouter();

	useEffect(() => {
		// $router 내부 인스턴스 업데이트
		$router._setRouterInstance(router);
	}, [router]);

	return <>{children}</>;
}
