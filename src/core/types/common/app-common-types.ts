import React from 'react';

export type TComponent<P = object> = (props: P) => React.ReactElement | any;
export interface IComponent<P = object> {
	(props: P): React.ReactElement | React.ReactNode | any;
	displayName?: string | undefined;
}

// Router types =====================================================
export interface RouterOptions {
	scroll?: boolean;
	params?: Record<string, any>;
}

export interface IRouter {
	_setRouterInstance: (router: any) => void;
	push: (url: string, options?: RouterOptions) => void;
	replace: (url: string, options?: RouterOptions) => void;
	back: () => void;
	buildUrl: (path: string, params?: Record<string, any>) => string;
}
// ================================================================