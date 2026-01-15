import { JSX } from 'react';
import InterceptModalPageComp from './_components/InterceptModalDemoPage';

// ✅ 이 설정 추가
export const dynamic = 'force-dynamic';
// → "이 페이지는 동적이에요" 라고 Next.js에게 명시적으로 알려줌
// → 빌드 성공, 매 요청마다 서버에서 렌더링

export interface IInterceptModalPageProps {
	//
}

export default function InterceptModalPage({}: IInterceptModalPageProps): JSX.Element {
	return <InterceptModalPageComp />;
}
