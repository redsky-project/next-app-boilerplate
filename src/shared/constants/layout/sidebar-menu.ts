import { Component, FileSliders, BookOpen } from 'lucide-react';

export const SIDEBAR_MENU = [
	{
		title: 'Components',
		url: '#',
		icon: Component,
		isActive: false,
		items: [
			{
				title: 'Accordion',
				url: '/example/components/accordion',
			},
			{
				title: 'Button',
				url: '/example/components/button',
			},
			{
				title: 'DataTable',
				url: '/example/components/data-table',
			},
		],
	},
	{
		title: 'Library-API',
		url: '#',
		icon: FileSliders,
		isActive: false,
		items: [
			{
				title: '◉ Common Functions',
				type: 'group',
			},
			{
				title: 'serverApi',
				url: '/example/library-api/common/server-api',
			},
			{
				title: '◉ Hooks',
				type: 'group',
			},
			{
				title: 'useApi',
				url: '/example/library-api/hooks/use-api',
			},
			{
				title: 'useApiData',
				url: '/example/library-api/hooks/use-api-data',
			},
			{
				title: 'useApiMutation',
				url: '/example/library-api/hooks/use-api-mutation',
			},
			{
				title: '◉ Router',
				type: 'group',
			},
			{
				title: '$router.push',
				url: '/example/library-api/router/push',
			},
			{
				title: '$router.replace',
				url: '/example/library-api/router/replace',
			},
			{
				title: '$router.back',
				url: '/example/library-api/router/back',
			},
			{
				title: '◉ Utils',
				type: 'group',
			},
			{
				title: '$utils.string',
				url: '/example/library-api/utils/string',
			},
			{
				title: '$utils.date',
				url: '/example/library-api/utils/date',
			},
			{
				title: '$utils.format',
				url: '/example/library-api/utils/format',
			},
		],
	},
	{
		title: 'Docs-Examples',
		url: '#',
		icon: BookOpen,
		isActive: false,
		items: [
			{
				title: 'Form 전송 (Server + Actions)',
				url: '/example/docs-examples/server-form',
			},
			{
				title: 'Form 전송 (Client + Action)',
				url: '/example/docs-examples/client-form',
			},
			{
				title: 'Form 전송 (useFormAction)',
				url: '/example/docs-examples/client-form-useformaction',
			},
			{
				title: 'Form 전송 (Client + Route Handler)',
				url: '/example/docs-examples/client-form-routehandler',
			},
			{
				title: 'Form 전송 (Server + Zod + ReactookForm)',
				url: '/example/docs-examples/server-form-zod-hookform',
			},
			{
				title: 'Intercept Modal(정적 경로(Static Route) 사용)',
				url: '/example/docs-examples/intercept-modal-demo',
			},
			{
				title: 'Intercept Modal(동적 경로(Dynamic Route) 사용)',
				url: '/example/docs-examples/intercept-modal-demo2',
			},
			{
				title: '레이어 팝업(Client Component)',
				url: '/example/docs-examples/layer-popup',
			},
			{
				title: 'Alert(Client Component)',
				url: '/example/docs-examples/alert',
			},
			{
				title: 'Confirm(Client Component)',
				url: '/example/docs-examples/confirm',
			},
			{
				title: '업무 공통함수 만들기 예제',
				url: '/example/biz-common',
			},
		],
	},
];
