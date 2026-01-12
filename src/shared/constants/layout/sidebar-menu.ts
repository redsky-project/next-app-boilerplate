import { Component, FileSliders } from 'lucide-react';

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
];
