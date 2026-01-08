import { codeToHtml } from 'shiki';

export interface IUiCodeBlockProps {
	code: string;
	lang: string;
	theme?: string;
}

export default async function UiCodeBlock({ code, lang, theme = 'github-dark' }: IUiCodeBlockProps) {
	const html = await codeToHtml(code, {
		lang,
		theme,
	});
	return (
		<div
			className="rounded-lg overflow-auto p-4 bg-[#24292e] text-[#e1e4e8]"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
