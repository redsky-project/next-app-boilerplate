/**
 * 날짜 포맷팅 유틸리티 함수
 */

export function formatDate(date: string, format: string = 'yyyy-MM-dd'): string {
	const d = new Date(date);

	if (isNaN(d.getTime())) {
		return 'Invalid Date';
	}

	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	const hours = String(d.getHours()).padStart(2, '0');
	const minutes = String(d.getMinutes()).padStart(2, '0');
	const seconds = String(d.getSeconds()).padStart(2, '0');

	let formatted = format;
	formatted = formatted.replace('yyyy', String(year));
	formatted = formatted.replace('MM', month);
	formatted = formatted.replace('dd', day);
	formatted = formatted.replace('HH', hours);
	formatted = formatted.replace('mm', minutes);
	formatted = formatted.replace('ss', seconds);

	return formatted;
}

export function formatRelativeTime(date: string): string {
	const d = new Date(date);
	const now = new Date();
	const diffMs = now.getTime() - d.getTime();
	const diffSecs = Math.floor(diffMs / 1000);
	const diffMins = Math.floor(diffSecs / 60);
	const diffHours = Math.floor(diffMins / 60);
	const diffDays = Math.floor(diffHours / 24);

	if (diffSecs < 60) {
		return 'just now';
	} else if (diffMins < 60) {
		return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
	} else if (diffHours < 24) {
		return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
	} else if (diffDays < 30) {
		return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
	} else {
		return formatDate(date, 'yyyy-MM-dd');
	}
}
