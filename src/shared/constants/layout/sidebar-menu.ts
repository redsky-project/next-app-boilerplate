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
		title: 'API',
		url: '#',
		icon: FileSliders,
		isActive: false,
		items: [
			{
				title: '◉ $router',
				type: 'group',
			},
			{
				title: '$router.goBack()',
				url: '/example/api-guides/router-goback',
			},
		],
	},
];
