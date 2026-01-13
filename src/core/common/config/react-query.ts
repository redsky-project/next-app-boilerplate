import { QueryClient, DefaultOptions } from '@tanstack/react-query';

// React Query 기본 옵션 설정
const queryConfig: DefaultOptions = {
	queries: {
		retry: 0, // 실패 시 재시도 횟수
		refetchOnWindowFocus: true, // 윈도우 포커스 시 자동 refetch 비활성화
		refetchOnReconnect: true, // 재연결 시 자동 refetch
		staleTime: 0, //5 * 60 * 1000, // 5분 (데이터가 fresh한 상태로 유지되는 시간)
		gcTime: Number(process.env.NEXT_PUBLIC_QUERY_GC_TIME) || 0, // 30분 (garbage collection time, 이전 cacheTime) 애플리케이션 세션유지시간과 맞춰도 될듯.
	},
	mutations: {
		retry: 0, // mutation은 재시도하지 않음
	},
};

// QueryClient 인스턴스 생성 함수
export function makeQueryClient() {
	return new QueryClient({
		defaultOptions: queryConfig,
	});
}

// 싱글톤 QueryClient (클라이언트 사이드용)
let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
	if (typeof window === 'undefined') {
		// 서버 사이드: 매번 새로운 QueryClient 생성
		return makeQueryClient();
	} else {
		// 클라이언트 사이드: 싱글톤 사용
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}
