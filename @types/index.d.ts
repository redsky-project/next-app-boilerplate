import type { IRouter, IUtils } from '@app-types/common';
import type { IUI } from '@app-types/components';

export {};

declare global {
	interface Window {
		$router: IRouter;
		$utils: IUtils;
		$ui: IUI;
		// Tanstack Query Client를 전역 변수로 설정(Devtools Extension 사용 시 필요) =======
		__TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
	}

	const $router: IRouter;
	const $utils: IUtils;
	const $ui: IUI;

	// Tanstack Query Client를 전역 변수로 설정(Devtools Extension 사용 시 필요) =======
	const __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
}
