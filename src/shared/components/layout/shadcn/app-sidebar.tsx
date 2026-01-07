'use client';

import * as React from 'react';
//import { Frame, LifeBuoy, Map, PieChart, Send } from 'lucide-react';
import Image from 'next/image';

import { Icon } from '@components/ui';
import { NavMain } from '@/shared/components/layout/shadcn/nav-main';
//import { NavProjects } from '@/shared/components/layout/shadcn/nav-projects';
//import { NavSecondary } from '@/shared/components/layout/shadcn/nav-secondary';
import { NavUser } from '@/shared/components/layout/shadcn/nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/core/components/shadcn/ui/sidebar';
import { SIDEBAR_MENU } from '@/shared/constants/layout/sidebar-menu';

const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '',
	},
	navMain: SIDEBAR_MENU || [],
	navSecondary: [
		{
			title: 'Support',
			url: '#',
			icon: <Icon name="LifeBuoy" />,
		},
		{
			title: 'Feedback',
			url: '#',
			icon: <Icon name="Send" />,
		},
	],
	projects: [
		{
			name: 'Design Engineering',
			url: '#',
			icon: <Icon name="Frame" />,
		},
		{
			name: 'Sales & Marketing',
			url: '#',
			icon: <Icon name="PieChart" />,
		},
		{
			name: 'Travel',
			url: '#',
			icon: <Icon name="Map" />,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar
			className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
			{...props}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							asChild
						>
							<a href="#">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent">
									{/*<Command className="size-4" />*/}
									<Image
										src="/nb-logo.png"
										alt="next-app-boilerplate Logo"
										width={32}
										height={32}
										className="size-8 bg-transparent"
									/>
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Next.js App v16.1.1</span>
									<span className="truncate text-xs">next-app-boilerplate</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain menu={data.navMain as any[]} />
				{/*<NavProjects projects={data.projects} />
				<NavSecondary
					items={data.navSecondary}
					className="mt-auto"
				/>*/}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
