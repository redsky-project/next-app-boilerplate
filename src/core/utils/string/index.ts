/**
 * 문자열을 camelCase로 변환
 * @param str - 변환할 문자열
 * @returns camelCase로 변환된 문자열
 * @example
 * toCamelCase('hello-world') // 'helloWorld'
 * toCamelCase('hello_world') // 'helloWorld'
 * toCamelCase('hello world') // 'helloWorld'
 */
export function toCamelCase(str: string): string {
	return str
		.replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
		.replace(/^(.)/, (char) => char.toLowerCase());
}
