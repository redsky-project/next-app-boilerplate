/**
 * 문자열을 32비트 정수 해시로 변환
 * @param str - 해시로 변환할 문자열
 * @returns 32비트 정수 해시 값
 */
export function hashStringTo32BitInteger(str: string): number {
	let hash = 0;
	if (str.length === 0) return hash;

	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32bit integer
	}

	return hash;
}
