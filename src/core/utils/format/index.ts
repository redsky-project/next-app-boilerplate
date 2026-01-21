// 숫자 포맷
export const number = (value: number | string, decimals: number = 0): string => {
	const num = typeof value === 'string' ? parseFloat(value) : value;
	if (isNaN(num)) return '0';
	return num.toLocaleString('ko-KR', {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});
};

export const currency = (value: number | string, currency: string = 'KRW'): string => {
	const num = typeof value === 'string' ? parseFloat(value) : value;
	if (isNaN(num)) return '₩0';

	switch (currency.toUpperCase()) {
		case 'KRW':
			return `₩${number(num, 0)}`;
		case 'USD':
			return `$${number(num, 2)}`;
		case 'EUR':
			return `€${number(num, 2)}`;
		case 'JPY':
			return `¥${number(num, 0)}`;
		default:
			return `${currency} ${number(num, 2)}`;
	}
};

export const percent = (value: number | string, decimals: number = 2): string => {
	const num = typeof value === 'string' ? parseFloat(value) : value;
	if (isNaN(num)) return '0%';
	return `${number(num, decimals)}%`;
};

// 금융 포맷
export const account = (value: string): string => {
	const cleaned = value.replace(/[^0-9]/g, '');
	if (cleaned.length <= 4) return cleaned;
	
	// 계좌번호 포맷: 앞 3-4자리 - 중간 - 마지막 3자리
	if (cleaned.length <= 8) {
		return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
	}
	
	const lastPart = cleaned.slice(-3);
	const firstPart = cleaned.slice(0, 4);
	const middlePart = cleaned.slice(4, -3);
	
	return `${firstPart}-${middlePart}-${lastPart}`;
};

export const card = (value: string): string => {
	const cleaned = value.replace(/[^0-9]/g, '');
	const chunks: string[] = [];
	
	for (let i = 0; i < cleaned.length; i += 4) {
		chunks.push(cleaned.slice(i, i + 4));
	}
	
	return chunks.join('-');
};

export const amount = (value: number | string, showSign: boolean = false): string => {
	const num = typeof value === 'string' ? parseFloat(value) : value;
	if (isNaN(num)) return '0';
	
	const formatted = number(Math.abs(num), 0);
	
	if (num === 0) return formatted;
	
	if (showSign) {
		return num > 0 ? `+${formatted}` : `-${formatted}`;
	}
	
	return num < 0 ? `-${formatted}` : formatted;
};

// 개인정보 포맷
export const phone = (value: string, type: 'default' | 'dash' | 'dot' = 'default'): string => {
	const cleaned = value.replace(/[^0-9]/g, '');
	
	if (cleaned.length === 0) return '';
	
	const separator = type === 'dot' ? '.' : '-';
	
	// 휴대폰: 010-1234-5678 또는 010-123-4567
	if (cleaned.startsWith('010')) {
		if (cleaned.length <= 3) return cleaned;
		if (cleaned.length <= 7) {
			return type === 'default' 
				? cleaned 
				: `${cleaned.slice(0, 3)}${separator}${cleaned.slice(3)}`;
		}
		if (cleaned.length <= 11) {
			return type === 'default'
				? cleaned
				: `${cleaned.slice(0, 3)}${separator}${cleaned.slice(3, 7)}${separator}${cleaned.slice(7)}`;
		}
		return type === 'default'
			? cleaned.slice(0, 11)
			: `${cleaned.slice(0, 3)}${separator}${cleaned.slice(3, 7)}${separator}${cleaned.slice(7, 11)}`;
	}
	
	// 지역번호 (02, 031, 032 등)
	if (cleaned.startsWith('02')) {
		if (cleaned.length <= 2) return cleaned;
		if (cleaned.length <= 5) {
			return type === 'default'
				? cleaned
				: `${cleaned.slice(0, 2)}${separator}${cleaned.slice(2)}`;
		}
		if (cleaned.length <= 10) {
			return type === 'default'
				? cleaned
				: `${cleaned.slice(0, 2)}${separator}${cleaned.slice(2, 6)}${separator}${cleaned.slice(6)}`;
		}
		return type === 'default'
			? cleaned.slice(0, 10)
			: `${cleaned.slice(0, 2)}${separator}${cleaned.slice(2, 6)}${separator}${cleaned.slice(6, 10)}`;
	}
	
	// 기타 지역번호 (031, 032 등)
	if (cleaned.length <= 3) return cleaned;
	if (cleaned.length <= 6) {
		return type === 'default'
			? cleaned
			: `${cleaned.slice(0, 3)}${separator}${cleaned.slice(3)}`;
	}
	if (cleaned.length <= 11) {
		return type === 'default'
			? cleaned
			: `${cleaned.slice(0, 3)}${separator}${cleaned.slice(3, 7)}${separator}${cleaned.slice(7)}`;
	}
	return type === 'default'
		? cleaned.slice(0, 11)
		: `${cleaned.slice(0, 3)}${separator}${cleaned.slice(3, 7)}${separator}${cleaned.slice(7, 11)}`;
};

export const email = (value: string, maskLevel: number = 0): string => {
	if (!value.includes('@')) return value;
	
	const [localPart, domain] = value.split('@');
	
	if (maskLevel === 0) return value;
	
	if (maskLevel === 1) {
		// 앞 3글자만 보이기
		const visibleLength = Math.min(3, localPart.length);
		const masked = localPart.slice(0, visibleLength) + '*'.repeat(Math.max(0, localPart.length - visibleLength));
		return `${masked}@${domain}`;
	}
	
	if (maskLevel === 2) {
		// 앞뒤 1글자만 보이기
		if (localPart.length <= 2) {
			return `${localPart[0]}*@${domain}`;
		}
		const masked = localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1];
		return `${masked}@${domain}`;
	}
	
	// maskLevel >= 3: 거의 전부 마스킹
	return `${localPart[0]}***@${domain}`;
};

export const residentNumber = (value: string, maskBack: boolean = true): string => {
	const cleaned = value.replace(/[^0-9]/g, '');
	
	if (cleaned.length <= 6) return cleaned;
	
	if (maskBack) {
		return `${cleaned.slice(0, 6)}-*******`;
	}
	
	return `${cleaned.slice(0, 6)}-${cleaned.slice(6, 13)}`;
};

export const name = (value: string, maskLevel: number = 0): string => {
	if (value.length === 0) return '';
	if (maskLevel === 0) return value;
	
	if (value.length === 1) return value;
	
	if (value.length === 2) {
		// 2글자: 김*
		return `${value[0]}*`;
	}
	
	if (maskLevel === 1) {
		// 3글자 이상: 김*동
		return `${value[0]}${'*'.repeat(value.length - 2)}${value[value.length - 1]}`;
	}
	
	// maskLevel >= 2: 첫글자만
	return `${value[0]}${'*'.repeat(value.length - 1)}`;
};

// 날짜/시간 포맷
export const date = (value: string | Date, format: string = 'YYYY-MM-DD'): string => {
	const d = typeof value === 'string' ? new Date(value) : value;
	
	if (isNaN(d.getTime())) return '';
	
	const year = d.getFullYear();
	const month = d.getMonth() + 1;
	const day = d.getDate();
	
	return format
		.replace('YYYY', String(year))
		.replace('YY', String(year).slice(-2))
		.replace('MM', String(month).padStart(2, '0'))
		.replace('M', String(month))
		.replace('DD', String(day).padStart(2, '0'))
		.replace('D', String(day));
};

export const datetime = (value: string | Date): string => {
	const d = typeof value === 'string' ? new Date(value) : value;
	
	if (isNaN(d.getTime())) return '';
	
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	const hours = String(d.getHours()).padStart(2, '0');
	const minutes = String(d.getMinutes()).padStart(2, '0');
	const seconds = String(d.getSeconds()).padStart(2, '0');
	
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const period = (start: string | Date, end: string | Date): string => {
	const startDate = typeof start === 'string' ? new Date(start) : start;
	const endDate = typeof end === 'string' ? new Date(end) : end;
	
	if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return '';
	
	const startFormatted = date(startDate, 'YYYY-MM-DD');
	const endFormatted = date(endDate, 'YYYY-MM-DD');
	
	return `${startFormatted} ~ ${endFormatted}`;
};

// 비즈니스 포맷
export const businessNumber = (value: string): string => {
	const cleaned = value.replace(/[^0-9]/g, '');
	
	if (cleaned.length === 0) return '';
	if (cleaned.length <= 3) return cleaned;
	if (cleaned.length <= 5) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
	if (cleaned.length <= 10) {
		return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5)}`;
	}
	
	return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 10)}`;
};

export const corporationNumber = (value: string): string => {
	const cleaned = value.replace(/[^0-9]/g, '');
	
	if (cleaned.length === 0) return '';
	if (cleaned.length <= 6) return cleaned;
	if (cleaned.length <= 13) {
		return `${cleaned.slice(0, 6)}-${cleaned.slice(6)}`;
	}
	
	return `${cleaned.slice(0, 6)}-${cleaned.slice(6, 13)}`;
};

// 파일/데이터 포맷
export const fileSize = (bytes: number, decimals: number = 2): string => {
	if (bytes === 0) return '0 Bytes';
	
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};

export const bytes = (bytes: number): string => {
	return fileSize(bytes, 0);
};

// 기타 유틸
export const ellipsis = (text: string, maxLength: number, suffix: string = '...'): string => {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength - suffix.length) + suffix;
};

export const mask = (value: string, start: number, end: number, maskChar: string = '*'): string => {
	if (start >= value.length) return value;
	
	const actualEnd = Math.min(end, value.length);
	const before = value.slice(0, start);
	const masked = maskChar.repeat(actualEnd - start);
	const after = value.slice(actualEnd);
	
	return before + masked + after;
};

export const padStart = (value: string | number, length: number, char: string = ' '): string => {
	const str = String(value);
	if (str.length >= length) return str;
	return char.repeat(length - str.length) + str;
};

export const padEnd = (value: string | number, length: number, char: string = ' '): string => {
	const str = String(value);
	if (str.length >= length) return str;
	return str + char.repeat(length - str.length);
};
