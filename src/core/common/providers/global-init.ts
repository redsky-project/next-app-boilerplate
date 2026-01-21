/**
 * 전역 객체 초기화
 * 
 * 이 파일은 애플리케이션이 시작될 때 즉시 실행되어
 * window.$ui, window.$utils 등의 전역 객체를 초기화합니다.
 * 
 * Client Component에서만 실행되며, SSR 환경에서는 무시됩니다.
 */

import { setUiService } from '@/core/components/ui';
import { $utils } from '@utils/index';

// Client 환경에서만 실행
if (typeof window !== 'undefined') {
	window.$ui = setUiService(); // 전역 UI 서비스 초기화
	window.$utils = $utils; // 전역 Utils 초기화
	
	console.log('[GlobalInit] 전역 객체 초기화 완료');
}
