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
 * // PUT 요청
 * const { data } = useApi<User>('users/1', {
 *   method: 'PUT',
 *   body: { name: 'John' }
 * });
 *
 * // DELETE 요청
 * const { data } = useApi<void>('users/1', { method: 'DELETE' });
 */
// react-query 관련 코드가 내부 로직이고, callApi 함수는 api 호출 로직이다.
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

export { useApi };
