import { AppSidebar } from '@/core/components/shadcn/layout/app-sidebar';
import { SiteHeader } from '@/core/components/shadcn/layout/site-header';
import { SidebarInset, SidebarProvider } from '@/core/components/shadcn/ui/sidebar';

export const iframeHeight = '800px';

export const description = 'A sidebar with a header and a search form.';

interface IDefaultLayoutProps {
	children: React.ReactNode;
}

export default function DefaultLayout({ children }: IDefaultLayoutProps) {
	return (
		<div className="[--header-height:calc(--spacing(14))]">
			<SidebarProvider className="flex flex-col">
				<SiteHeader />
				<div className="flex flex-1">
					<AppSidebar />
					<SidebarInset>
						<div className="flex flex-1 flex-col gap-4 p-4">
							{/* next-app-boilerplate-contents 클래스를 이용해서 내부 컨텐츠의 h2, h3 태그 찾는 aside 화면 로직 때문에 추가 */}
							<div className="next-app-boilerplate-contents">{children}</div>
							<div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
						</div>
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	);
}
