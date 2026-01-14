// ========================================================================================
// src/app/(domains)/example/api/form-submit/route.ts
// Route Handler for form submission
// ========================================================================================
import { NextRequest, NextResponse } from 'next/server';
import { serverApi } from '@/core/common/api/server-api';

/**
 * POST /example/api/form-submit
 * FormData를 받아서 외부 API로 전송합니다.
 */
export async function POST(request: NextRequest) {
	// client에서 json으로 body에 세팅했을 때는 await request.json() 으로 파싱해야 함.
	const body = await request.json();
	console.log('>>>>>>>>>>>>>request:', body);
	/* 그 외 여러가지 경우 파싱 방법
	// 1. JSON 데이터 파싱
	const body = await request.json();
	// 2. FormData 파싱
	const formData = await request.formData();
	// 3. Plain Text 파싱
	const text = await request.text();
	// 4. Blob 파싱
	const blob = await request.blob();
	// 5. ArrayBuffer 파싱
	const buffer = await request.arrayBuffer();
	*/

	try {
		// serverApi를 사용하여 외부 API 호출
		const response = await serverApi<any[]>('https://koreanjson.com/todos', {
			method: 'POST',
			body,
		});

		// 성공 응답
		return NextResponse.json(response, { status: 200 });
		//return NextResponse.json(
		//	{
		//		success: true,
		//		data: response.data,
		//		message: '사용자 목록을 성공적으로 가져왔습니다.',
		//	},
		//	{ status: 200 },
		//);
	} catch (error) {
		console.error('[GET /example/api/posts] Error:', error);

		// 에러 응답
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : 'posts 목록을 가져오는데 실패했습니다.',
				data: null,
			},
			{ status: 500 },
		);
	}
}
