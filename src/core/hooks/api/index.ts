import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { IUseApiOptions } from './types';
import { createQueryKey } from '@fetch/query';
import { callApi } from '@fetch/api';

/**
 * 외부 API 조회를 위한 범용 훅 (GET, POST 조회용)
 * @example
 * // GET 요청
 * const { data } = useApi<User>('users', { method: 'GET', params: { id: 1 } });
 *
 * // POST 요청 (body 전송)
 * const { data } = useApi<SearchResult>('search', {
 *   method: 'POST',
 *   body: { query: 'keyword', filters: ['tag1', 'tag2'] }
 * });
 *
 */
// tanstack query 를 사용하여 전역 상태 관리를 하고, callApi 함수를 사용하여 api 호출을 한다.
function useApi<T>(endpoint: string, options?: IUseApiOptions<T>): UseQueryResult<NoInfer<T>, Error> {
	const { params, body, queryOptions } = options || {};

	return useQuery({
		// queryKey: body가 있으면 body도 포함, params가 있으면 params 포함
		queryKey: createQueryKey(endpoint, body || params),
		queryFn: async () => {
			const response = await callApi<T>(endpoint, { ...options, apiCallType: 'client' });

			return response.data as T;
		},
		...queryOptions,
	});
}

/**
 * 수동 제어가 가능한 API 조회 훅 (기본적으로 자동 fetch 하지 않음)
 * - 기본값: enabled: false (자동 fetch 안 함)
 * - params나 body가 변경되면 queryKey가 변경되어 반응성 유지
 * - refetch()를 호출하거나 queryOptions.enabled: true로 수동 활성화 가능
 *
 * @example
 * // 수동으로 fetch (버튼 클릭 시 등)
 * const { data, refetch } = useApiData<User>('users', { params: { id: userId } });
 * <button onClick={() => refetch()}>데이터 가져오기</button>
 *
 * // 조건부로 자동 fetch
 * const { data } = useApiData<User>('users', {
 *   params: { id: userId },
 *   queryOptions: { enabled: !!userId }  // userId가 있을 때만 fetch
 * });
 *
 * // 초기 데이터 제공 (queryOptions.initialData 사용)
 * const { data } = useApiData<User>('users', {
 *   params: { id: userId },
 *   queryOptions: {
 *     initialData: cachedUser,  // 초기 데이터
 *     enabled: shouldFetch
 *   }
 * });
 *
 * // 다른 컴포넌트의 useApi와 캐시 공유
 * // ComponentA에서 useApi로 자동 fetch하고
 * // ComponentB에서 useApiData로 캐시만 읽기 (같은 queryKey 사용 시 반응성 유지)
 */
function useApiData<T>(endpoint: string, options?: IUseApiOptions<T>): UseQueryResult<NoInfer<T>, Error> {
	const { params, body, queryOptions } = options || {};

	return useQuery({
		// queryKey: body가 있으면 body도 포함, params가 있으면 params 포함
		// params나 body가 변경되면 queryKey가 변경되어 자동으로 refetch됨
		queryKey: createQueryKey(endpoint, body || params),
		queryFn: async () => {
			const response = await callApi<T>(endpoint, { ...options, apiCallType: 'client' });

			return response.data as T;
		},
		// 기본값: enabled: false (자동 fetch 하지 않음)
		// queryOptions.enabled를 명시하면 그 값을 사용
		enabled: false,
		...queryOptions,
	});
}

export { useApi, useApiData };
