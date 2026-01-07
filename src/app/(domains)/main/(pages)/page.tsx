'use client';

import { Button } from '@/core/components/ui';

import { Code2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Props Type(Props가 있을경우 타입을 정의)
interface IMainIndexProps {
	// test?: string;
}

export default function MainIndex({}: IMainIndexProps) {
	const router = useRouter();

	return (
		<div className="w-full py-20 px-6">
			{/* Hero Section */}
			<div className="max-w-5xl mx-auto text-center mb-24">
				<h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 tracking-tight">
					Build faster with
					<br />
					<span className="font-semibold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
						ready-to-use components
					</span>
				</h1>

				<p className="text-lg text-slate-1000 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
					<strong>next-app-boilerplate</strong> 라이브러리의 실제 동작 컴포넌트를 미리보기하고, 예제 코드를 복사하여
					작업 중인 프로젝트에 즉시 반영할 수 있습니다.
				</p>

				<div className="flex items-center justify-center gap-3 mb-16">
					<Button
						size="lg"
						className="h-11 px-6 bg-slate-900 hover:bg-slate-800 text-sm font-medium"
						onClick={() => router.push('/example/components/accordion')}
					>
						Examples
						<Code2 className="w-4 h-4 ml-2" />
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="h-11 px-6 text-sm font-medium"
						onClick={() => (location.href = 'http://redsky0212.dothome.co.kr/entec/react_assets/guide/')}
					>
						Documents
					</Button>
				</div>
				<div className="mb-10 flex flex-col items-center">
					<span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-blue-700 font-medium text-sm mb-3 tracking-wide shadow-sm">
						Made with <span className="font-semibold text-blue-600">next-app-boilerplate</span>
					</span>
					<p className="text-slate-400 text-base">
						이 사이트는 <span className="font-semibold text-blue-600">next-app-boilerplate</span> 라이브러리를 기반으로
						제작되었습니다.
					</p>
				</div>
			</div>
		</div>
	);
}
