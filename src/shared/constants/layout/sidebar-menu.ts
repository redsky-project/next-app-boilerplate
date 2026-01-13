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
		],
	},
	{
		title: 'Library-API',
		url: '#',
		icon: FileSliders,
		isActive: false,
		items: [
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
				title: '◉ Common Functions',
				type: 'group',
			},
			{
				title: 'serverApi',
				url: '/example/library-api/common/server-api',
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
		],
	},
];
