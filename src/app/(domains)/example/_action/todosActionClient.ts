'use server';

import { serverApi } from '@fetch/server-api';

export async function todosAction(formData: FormData) {
	const url = `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL3}/todos`;
	// 폼 데이터 파싱
	const title = formData.get('title') as string;
	const content = formData.get('content') as string;
	const id = formData.get('id') as string;

	// 방법 2: - Object.fromEntries()
	//const rawData = Object.fromEntries(formData);
	//const { title, body, id } = rawData as { title: string; body: string; id: string };

	console.log('Received:', { title, content, id });

	try {
		// serverApi 호출 (Server Action)
		// Next.js Server Action에서는 FormData를 직접 전달할 수 있습니다.
		// serverApi 내부의 fetch가 FormData를 감지하여 자동으로 Content-Type: multipart/form-data를 설정합니다.
		const res = await serverApi<any>(url, {
			method: 'POST',
			body: formData,
			cache: 'no-store',
		});

		console.log(`[${url}] response:`, res);
		console.log(`[${url}] error:`, res.message);

		// 성공 처리
		if (res.data) {
			// 성공 응답
			return { success: true, message: '할일이 추가되었습니다.', data: res.data };
		}
	} catch (err) {
		// NEXT_REDIRECT 에러는 정상적인 redirect 동작이므로 다시 throw
		// redirect()는 내부적으로 에러를 throw하여 작동하므로 이를 다시 throw해야 함
		if (
			err &&
			typeof err === 'object' &&
			'digest' in err &&
			typeof err.digest === 'string' &&
			err.digest.startsWith('NEXT_REDIRECT')
		) {
			throw err;
		}
		console.error('API Error:', err);
		return { success: false, message: '폼이 제출되지 않았습니다.', data: null };
	} finally {
		//setIsLoading(false);
	}
	return { success: false, message: '폼이 제출되지 않았습니다.', data: null };
}
