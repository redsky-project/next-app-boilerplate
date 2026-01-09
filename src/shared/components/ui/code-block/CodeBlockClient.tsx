'use client';

import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

export interface ICodeBlockClientProps {
	code: string;
	lang: string;
	theme?: string;
}

export default function CodeBlockClient({ code, lang, theme = 'github-dark' }: ICodeBlockClientProps) {
	const [html, setHtml] = useState<string>('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const highlightCode = async () => {
			try {
				setIsLoading(true);
				const highlighted = await codeToHtml(code, {
					lang,
					theme,
				});
				setHtml(highlighted);
			} catch (error) {
				console.error('Failed to highlight code:', error);
				// Fallback to plain text
				setHtml(`<pre><code>${code}</code></pre>`);
			} finally {
				setIsLoading(false);
			}
		};

		highlightCode();
	}, [code, lang, theme]);

	if (isLoading) {
		return (
			<div className="rounded-lg overflow-auto p-4 bg-[#24292e] text-[#e1e4e8]">
				<div className="animate-pulse">
					<div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
					<div className="h-4 bg-gray-700 rounded w-1/2"></div>
				</div>
			</div>
		);
	}

	return (
		<>
			<style>{`
				pre {
					tab-size: 2 !important;
					-moz-tab-size: 2 !important;
				}
				pre code {
					tab-size: 2 !important;
					-moz-tab-size: 2 !important;
				}
			`}</style>
			<div
				className="rounded-lg overflow-auto p-4 bg-[#24292e] text-[#e1e4e8]"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</>
	);
}
