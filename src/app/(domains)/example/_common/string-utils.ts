/**
 * 이메일 마스킹 옵션 인터페이스
 */
export interface EmailMaskOptions {
	/** 마스킹 문자 (기본값: '*') */
	maskChar?: string;
	/** @ 앞에서 보여줄 자릿수 (기본값: 2) */
	visibleStart?: number;
}

/**
 * 이메일 주소를 마스킹 처리합니다.
 *
 * @param email - 마스킹할 이메일 주소
 * @param options - 마스킹 옵션
 * @returns 마스킹된 이메일 주소
 *
 * @example
 * ```typescript
 * maskEmail('example@domain.com');
 * // 결과: 'ex*****@domain.com'
 *
 * maskEmail('example@domain.com', { maskChar: '#', visibleStart: 3 });
 * // 결과: 'exa####@domain.com'
 * ```
 */
export const maskEmail = (email: string, options: EmailMaskOptions = {}): string => {
	const { maskChar = '*', visibleStart = 2 } = options;

	// 이메일 유효성 검사
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return email; // 유효하지 않은 경우 원본 반환
	}

	const [localPart, domain] = email.split('@');

	// localPart가 너무 짧은 경우 처리
	if (localPart.length <= visibleStart) {
		return email;
	}

	const visiblePart = localPart.slice(0, visibleStart);
	const maskedPart = maskChar.repeat(localPart.length - visibleStart);

	return `${visiblePart}${maskedPart}@${domain}`;
};

/**
 * 전화번호 포맷팅 옵션 인터페이스
 */
export interface PhoneNumberFormatOptions {
	/** 구분자 (기본값: '-') */
	separator?: string;
	/** 국가 코드 포함 여부 (기본값: false) */
	includeCountryCode?: boolean;
	/** 국가 코드 (기본값: '+82') */
	countryCode?: string;
}

/**
 * 전화번호를 포맷팅합니다.
 * 한국 전화번호 형식 (010-XXXX-XXXX, 02-XXX-XXXX 등)을 지원합니다.
 *
 * @param phoneNumber - 포맷팅할 전화번호 (숫자만 또는 하이픈 포함)
 * @param options - 포맷팅 옵션
 * @returns 포맷팅된 전화번호
 *
 * @example
 * ```typescript
 * formatPhoneNumber('01012345678');
 * // 결과: '010-1234-5678'
 *
 * formatPhoneNumber('01012345678', { separator: ' ' });
 * // 결과: '010 1234 5678'
 *
 * formatPhoneNumber('01012345678', { includeCountryCode: true });
 * // 결과: '+82-10-1234-5678'
 * ```
 */
export const formatPhoneNumber = (
	phoneNumber: string,
	options: PhoneNumberFormatOptions = {},
): string => {
	const { separator = '-', includeCountryCode = false, countryCode = '+82' } = options;

	// 숫자만 추출
	const digitsOnly = phoneNumber.replace(/\D/g, '');

	if (!digitsOnly) {
		return phoneNumber; // 숫자가 없으면 원본 반환
	}

	let formatted = '';
	let digits = digitsOnly;

	// 국가 코드 처리
	if (includeCountryCode) {
		// 010으로 시작하는 경우 0 제거
		if (digits.startsWith('010')) {
			digits = '10' + digits.slice(3);
		} else if (digits.startsWith('0')) {
			digits = digits.slice(1);
		}
		formatted = countryCode + separator;
	}

	// 전화번호 포맷팅
	if (digits.startsWith('02')) {
		// 서울 지역번호 (02-XXX-XXXX 또는 02-XXXX-XXXX)
		if (digits.length === 9) {
			formatted += `02${separator}${digits.slice(2, 5)}${separator}${digits.slice(5)}`;
		} else if (digits.length === 10) {
			formatted += `02${separator}${digits.slice(2, 6)}${separator}${digits.slice(6)}`;
		} else {
			formatted += digits;
		}
	} else if (digits.startsWith('010') || digits.startsWith('011') || digits.startsWith('016') || digits.startsWith('017') || digits.startsWith('018') || digits.startsWith('019')) {
		// 휴대폰 번호 (010-XXXX-XXXX)
		if (digits.length === 11) {
			formatted += `${digits.slice(0, 3)}${separator}${digits.slice(3, 7)}${separator}${digits.slice(7)}`;
		} else if (digits.length === 10) {
			formatted += `${digits.slice(0, 3)}${separator}${digits.slice(3, 6)}${separator}${digits.slice(6)}`;
		} else {
			formatted += digits;
		}
	} else if (digits.startsWith('10')) {
		// 국가 코드 포함된 휴대폰 번호 (10-XXXX-XXXX)
		if (digits.length === 10) {
			formatted += `${digits.slice(0, 2)}${separator}${digits.slice(2, 6)}${separator}${digits.slice(6)}`;
		} else if (digits.length === 9) {
			formatted += `${digits.slice(0, 2)}${separator}${digits.slice(2, 5)}${separator}${digits.slice(5)}`;
		} else {
			formatted += digits;
		}
	} else if (digits.length >= 9) {
		// 지역번호 (0XX-XXX-XXXX 또는 0XX-XXXX-XXXX)
		if (digits.length === 10) {
			formatted += `${digits.slice(0, 3)}${separator}${digits.slice(3, 6)}${separator}${digits.slice(6)}`;
		} else if (digits.length === 11) {
			formatted += `${digits.slice(0, 3)}${separator}${digits.slice(3, 7)}${separator}${digits.slice(7)}`;
		} else {
			formatted += digits;
		}
	} else {
		formatted += digits;
	}

	return formatted;
};

/**
 * 문자열 자르기 옵션 인터페이스
 */
export interface TruncateOptions {
	/** 생략 문자 (기본값: '...') */
	ellipsis?: string;
	/** 단어 단위로 자를지 여부 (기본값: false) */
	wordBoundary?: boolean;
}

/**
 * 문자열을 지정된 길이로 자르고 생략 문자를 추가합니다.
 *
 * @param str - 자를 문자열
 * @param maxLength - 최대 길이
 * @param options - 자르기 옵션
 * @returns 잘린 문자열
 *
 * @example
 * ```typescript
 * truncateString('Hello World Example', 10);
 * // 결과: 'Hello W...'
 *
 * truncateString('Hello World Example', 10, { wordBoundary: true });
 * // 결과: 'Hello...'
 *
 * truncateString('Hello World Example', 10, { ellipsis: '›' });
 * // 결과: 'Hello Wor›'
 * ```
 */
export const truncateString = (
	str: string,
	maxLength: number,
	options: TruncateOptions = {},
): string => {
	const { ellipsis = '...', wordBoundary = false } = options;

	if (str.length <= maxLength) {
		return str;
	}

	const truncatedLength = maxLength - ellipsis.length;

	if (truncatedLength <= 0) {
		return ellipsis;
	}

	let truncated = str.slice(0, truncatedLength);

	if (wordBoundary) {
		const lastSpaceIndex = truncated.lastIndexOf(' ');
		if (lastSpaceIndex > 0) {
			truncated = truncated.slice(0, lastSpaceIndex);
		}
	}

	return truncated + ellipsis;
};
