'use server';

import { serverApi } from '@fetch/server-api';
import { cookies } from 'next/headers';
//import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
			// 브라우저 쿠키에 결과 저장하여 전달 방법
			(await cookies()).set('result_todos', JSON.stringify(res), { maxAge: 60 });

			// 성공 페이지로 리다이렉트 (query parameter 포함시키는 방법)
			const params = new URLSearchParams({
				success: 'true',
				message: '할일이 추가되었습니다.',
				status: res?.status?.toString() || '',
				id: res.data.id?.toString() || '',
			});

			// 캐시 무효화 (필요시 주석 해제)
			// revalidatePath('/example/docs-examples/server-form');
			// revalidateTag('todos'); // tag가 등록 되어 있을 경우. tag로 캐시 무효화 방법

			// redirect는 함수를 종료시키므로 아래 코드는 실행되지 않음
			redirect(`/example/docs-examples/server-form?${params.toString()}`);
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
