'use client';

import { JSX, useState } from 'react';

import { CodeBlockClient } from '@components/ui';
import { useApiMutation } from '@hooks/api';
import { IPost } from '@/app/(domains)/example/_types';
import { Button } from '@components/ui';
import { Input } from '@/core/components/shadcn/ui/input';

export interface IBasicUseApiDataDemoProps {
	// test?: string;
}

export default function BasicUseApiDataDemo({}: IBasicUseApiDataDemoProps): JSX.Element {
	// useApiMutation 인스턴스 생성
	const createPostMutation = useApiMutation<IPost, { title: string; content: string }>('@routes/example/api/posts', {
		method: 'POST',
		mutationOptions: {
			onSuccess: (data) => {
				console.log('Post created successfully!', data);
				// 캐시 무효화(선택적)
				createPostMutation.invalidateQueries('@routes/example/api/posts');
			},
			onError: (error) => {
				console.error('Error creating post:', error);
			},
		},
	});

	// 입력 상태 관리
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	// 버튼 클릭 핸들러
	const handleMutate = () => {
		createPostMutation.mutate({
			title,
			content,
		});
	};

	return (
		<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800">
			<div className="max-h-152 overflow-auto p-4 space-y-3">
				<div className="space-y-2">
					<Input
						type="text"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Input
						type="text"
						placeholder="Content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<Button
					onClick={handleMutate}
					disabled={createPostMutation.isPending || !title || !content}
					className="w-full"
				>
					{createPostMutation.isPending ? 'Creating...' : 'Create Post'}
				</Button>
				{createPostMutation.isSuccess && (
					<div className="text-sm text-green-600 dark:text-green-400">✓ Post created successfully!</div>
				)}
				{createPostMutation.isError && (
					<div className="text-sm text-red-600 dark:text-red-400">✗ Error: {createPostMutation.error?.message}</div>
				)}
				{createPostMutation.data && (
					<div className="text-xs bg-neutral-50 dark:bg-neutral-900 p-2 rounded">
						<pre>{JSON.stringify(createPostMutation.data, null, 2)}</pre>
					</div>
				)}
			</div>
			<CodeBlockClient
				code={`import { JSX } from 'react';
import { useApiMutation } from '@hooks/api';
import { Button, Input } from '@components/ui';

// 내부 API - Posts(업무 폴더 내부의 _types 폴더에 선언된 타입 사용)
export interface IPost {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	UserId: number;
}

// 페이지 컴포넌트의 Props 타입 정의
export interface ISamplePageProps {
	// test?: string;
}

// 페이지 컴포넌트 함수
export default function SamplePage({}: ISamplePageProps): JSX.Element {
	// useApiMutation 인스턴스 생성
	const createPostMutation = useApiMutation<IPost, { title: string; content: string }>('/posts', {
		method: 'POST',
		mutationOptions: {
			onSuccess: (data) => {
				console.log('Post created successfully!', data);
				// 캐시 무효화(선택적)
				createPostMutation.invalidateQueries('/posts');
			},
			onError: (error) => {
				console.error('Error creating post:', error);
			},
		},
	});
	
	// 입력 상태 관리
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	// 버튼 클릭 핸들러
	const handleMutate = () => {
		createPostMutation.mutate({
			title,
			content,
		});
	};

	return (
		<div>
			<Input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Input
				type="text"
				placeholder="Content"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<Button
				onClick={handleMutate}
				disabled={createPostMutation.isPending || !title || !content}
				className="w-full"
			>
				{createPostMutation.isPending ? 'Creating...' : 'Create Post'}
			</Button>
			{createPostMutation.isSuccess && (
				<div className="text-sm text-green-600 dark:text-green-400">✓ Post created successfully!</div>
			)}
		</div>
	);
}`}
				lang="tsx"
			/>
		</div>
	);
}
