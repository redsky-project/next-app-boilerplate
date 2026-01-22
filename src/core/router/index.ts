import type { IRouter, RouterOptions } from '@app-types/common';
import { redirect, RedirectType } from 'next/navigation';

/**
 * Next.js router 인스턴스 저장
 * RouterProvider에서 설정됨
 */
let nextRouterInstance: any = null;

/**
 * 전역 라우터 객체
 * 서버/클라이언트 환경을 자동 감지하여 적절한 네비게이션 제공
 * 
 * @example
 * // 페이지 이동 (히스토리 추가)
 * $router.push('/example', { params: { id: 123 } });
 * 
 * @example
 * // 페이지 이동 (히스토리 대체)
 * $router.replace('/profile', { scroll: false });
 * 
 * @example
 * // 뒤로 가기
 * $router.back();
 * 
 * @remarks
 * scroll 옵션 제약사항:
 * - Client Component: scroll 옵션 정상 작동 (true/false 제어 가능)
 * - Server Component: scroll 옵션 미지원 (항상 페이지 맨 위로 스크롤)
 */
export const $router: IRouter = {
	/**
	 * 내부 메서드: RouterProvider에서 Next.js router 인스턴스 설정
	 * @private
	 */
	_setRouterInstance(router: any) {
		nextRouterInstance = router;
	},

	/**
	 * URL 빌드 헬퍼 함수
	 * 쿼리 파라미터를 자동으로 URLSearchParams로 변환
	 * 
	 * @param path - 기본 경로
	 * @param params - 쿼리 파라미터 객체
	 * @returns 완성된 URL
	 * 
	 * @example
	 * buildUrl('/posts', { id: 1, name: 'test' })
	 * // => '/posts?id=1&name=test'
	 */
	buildUrl(path: string, params?: Record<string, any>): string {
		if (!params || Object.keys(params).length === 0) {
			return path;
		}

		const searchParams = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				searchParams.append(key, String(value));
			}
		});

		const queryString = searchParams.toString();
		return queryString ? `${path}?${queryString}` : path;
	},

	/**
	 * 페이지 이동 (히스토리 추가)
	 * 
	 * @param url - 이동할 URL
	 * @param options - 네비게이션 옵션
	 * @param options.scroll - 스크롤 위치 제어 (기본: true) - ⚠️ Client Component에서만 지원
	 * @param options.params - 쿼리 파라미터 객체
	 * 
	 * @example
	 * // 기본 사용
	 * $router.push('/example');
	 * 
	 * @example
	 * // 쿼리 파라미터와 함께
	 * $router.push('/posts', { params: { id: 123 } });
	 * // => '/posts?id=123'로 이동
	 * 
	 * @example
	 * // 스크롤 제어 (Client Component에서만 작동)
	 * $router.push('/about', { scroll: false });
	 * 
	 * @remarks
	 * scroll 옵션은 Client Component에서만 작동합니다.
	 * Server Component에서는 Next.js redirect()의 제약으로 항상 페이지 맨 위로 스크롤됩니다.
	 */
	push(url: string, options?: RouterOptions) {
		const finalUrl = this.buildUrl(url, options?.params);
		
		// 서버 환경: redirect 사용 (scroll 옵션 미지원)
		if (typeof window === 'undefined') {
			// scroll 옵션이 명시적으로 false로 설정된 경우 경고
			if (options?.scroll === false) {
				console.warn('[Router] scroll option is not supported in Server Component. The page will scroll to top.');
			}
			redirect(finalUrl, RedirectType.push);
		}
		// 클라이언트 환경: scroll 옵션 지원
		else if (nextRouterInstance) {
			nextRouterInstance.push(finalUrl, { scroll: options?.scroll ?? true });
		} else {
			console.warn('[Router] Router instance not initialized. Make sure RouterProvider is mounted.');
		}
	},

	/**
	 * 페이지 이동 (히스토리 대체)
	 * 
	 * @param url - 이동할 URL
	 * @param options - 네비게이션 옵션
	 * @param options.scroll - 스크롤 위치 제어 (기본: true) - ⚠️ Client Component에서만 지원
	 * @param options.params - 쿼리 파라미터 객체
	 * 
	 * @example
	 * // 현재 페이지를 히스토리에서 대체
	 * $router.replace('/login');
	 * 
	 * @example
	 * // 쿼리 파라미터와 함께
	 * $router.replace('/search', { params: { q: 'test' } });
	 * 
	 * @example
	 * // 스크롤 제어 (Client Component에서만 작동)
	 * $router.replace('/profile', { scroll: false });
	 * 
	 * @remarks
	 * scroll 옵션은 Client Component에서만 작동합니다.
	 * Server Component에서는 Next.js redirect()의 제약으로 항상 페이지 맨 위로 스크롤됩니다.
	 */
	replace(url: string, options?: RouterOptions) {
		const finalUrl = this.buildUrl(url, options?.params);

		// 서버 환경: redirect 사용 (scroll 옵션 미지원)
		if (typeof window === 'undefined') {
			// scroll 옵션이 명시적으로 false로 설정된 경우 경고
			if (options?.scroll === false) {
				console.warn('[Router] scroll option is not supported in Server Component. The page will scroll to top.');
			}
			redirect(finalUrl, RedirectType.replace);
		}
		// 클라이언트 환경: scroll 옵션 지원
		else if (nextRouterInstance) {
			nextRouterInstance.replace(finalUrl, { scroll: options?.scroll ?? true });
		} else {
			console.warn('[Router] Router instance not initialized. Make sure RouterProvider is mounted.');
		}
	},

	/**
	 * 이전 페이지로 이동 (뒤로 가기)
	 * 클라이언트 전용 메서드
	 * 
	 * @example
	 * // Client Component에서 사용
	 * <button onClick={() => $router.back()}>뒤로 가기</button>
	 */
	back() {
		if (typeof window === 'undefined') {
			console.warn('[Router] back() is not available on server');
			return;
		}

		if (nextRouterInstance) {
			nextRouterInstance.back();
		} else {
			console.warn('[Router] Router instance not initialized. Make sure RouterProvider is mounted.');
		}
	},
};
