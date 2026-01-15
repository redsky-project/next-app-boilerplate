import { useLayoutEffect } from 'react';

/**
 * 모달이나 오버레이가 열릴 때 body 스크롤을 잠그고,
 * 현재 스크롤 위치를 시각적으로 유지하는 훅
 *
 * @example
 * ```tsx
 * function Modal() {
 *   useLockBodyScroll();
 *   return <div>Modal Content</div>;
 * }
 * ```
 */
export function useLockBodyScroll() {
	useLayoutEffect(() => {
		const scrollY = window.scrollY;
		const body = document.body;

		// 현재 body의 스타일을 저장
		const originalBodyPosition = body.style.position;
		const originalBodyTop = body.style.top;
		const originalBodyLeft = body.style.left;
		const originalBodyRight = body.style.right;
		const originalBodyWidth = body.style.width;
		const originalBodyOverflow = body.style.overflow;

		// body를 fixed로 만들어 현재 스크롤 위치를 시각적으로 유지
		body.style.setProperty('position', 'fixed', 'important');
		body.style.setProperty('top', `-${scrollY}px`, 'important');
		body.style.setProperty('left', '0', 'important');
		body.style.setProperty('right', '0', 'important');
		body.style.setProperty('width', '100%', 'important');
		body.style.setProperty('overflow', 'hidden', 'important');

		return () => {
			// 컴포넌트가 언마운트될 때 원래 스타일만 복원 (스크롤 위치는 유지)
			body.style.position = originalBodyPosition;
			body.style.top = originalBodyTop;
			body.style.left = originalBodyLeft;
			body.style.right = originalBodyRight;
			body.style.width = originalBodyWidth;
			body.style.overflow = originalBodyOverflow;
		};
	}, []);
}
