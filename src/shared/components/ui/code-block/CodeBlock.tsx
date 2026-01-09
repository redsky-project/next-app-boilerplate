import { codeToHtml } from 'shiki';

export interface ICodeBlockProps {
	code: string;
	lang: string;
	theme?: string;
	highlightLines?: number[];
}

export default async function CodeBlock({ code, lang, theme = 'github-dark', highlightLines = [] }: ICodeBlockProps) {
	const html = await codeToHtml(code, {
		lang,
		theme,
		decorations: highlightLines.map((line) => ({
			start: { line: line - 1, character: 0 },
			end: { line: line - 1, character: 0 },
			properties: { class: 'highlighted-line' },
		})),
	});
	return (
		<div
			className="rounded-lg overflow-auto p-4 bg-[#24292e] text-[#e1e4e8]"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
