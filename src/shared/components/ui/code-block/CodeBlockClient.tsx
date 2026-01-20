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
	const [isExpanded, setIsExpanded] = useState(true);

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
			<div className="w-full rounded-lg overflow-auto p-4 bg-[#24292e] text-[#e1e4e8]">
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
					font-size: 0.9em !important;
				}
				pre code {
					tab-size: 2 !important;
					-moz-tab-size: 2 !important;
				}
			`}</style>
			<div className="w-full rounded-lg bg-[#24292e] text-[#e1e4e8] overflow-hidden">
				<div
					className="rounded-t-lg flex items-center justify-between p-4 cursor-pointer hover:bg-[#2d3338] transition-colors"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					<span className="text-sm font-medium text-gray-400">{lang}</span>
					<svg
						className={`w-5 h-5 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
				{isExpanded && (
					<div
						//className="overflow-x-auto overflow-y-auto max-h-[600px] p-4 border-t border-gray-700"
						className="overflow-x-auto overflow-y-auto p-4 border-t border-gray-700"
						dangerouslySetInnerHTML={{ __html: html }}
					/>
				)}
			</div>
		</>
	);
}
