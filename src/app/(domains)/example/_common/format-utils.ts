/**
 * 금액 포맷팅 옵션 인터페이스
 */
export interface CurrencyFormatOptions {
	/** 통화 코드 (기본값: 'KRW') */
	currency?: string;
	/** 소수점 자릿수 (기본값: 0) */
	decimalPlaces?: number;
	/** 천 단위 구분자 (기본값: ',') */
	separator?: string;
	/** 통화 기호 표시 여부 (기본값: true) */
	showSymbol?: boolean;
}

/**
 * 날짜 포맷팅 옵션 인터페이스
 */
export interface DateFormatOptions {
	/** 시간 포함 여부 (기본값: false) */
	includeTime?: boolean;
	/** 초 포함 여부 (기본값: false) */
	includeSeconds?: boolean;
	/** 구분자 (기본값: '-') */
	separator?: string;
}

/**
 * example 업무에서만 사용하는 공통 포맷팅 유틸리티 클래스
 *
 * Singleton 패턴으로 구현되어 즉시 인스턴스가 생성됩니다.
 *
 * @example
 * ```typescript
 * import FormatUtils from '@/app/(domains)/example/_common/format-utils';
 *
 * const formatted = FormatUtils.formatCurrency(1234567);
 * // 결과: '₩1,234,567'
 * ```
 */
export default new (class FormatUtils {
	/**
	 * 숫자를 금액 형식으로 포맷팅합니다.
	 *
	 * @param amount - 포맷팅할 금액
	 * @param options - 포맷팅 옵션
	 * @returns 포맷팅된 금액 문자열
	 *
	 * @example
	 * ```typescript
	 * FormatUtils.formatCurrency(1234567);
	 * // 결과: '₩1,234,567'
	 *
	 * FormatUtils.formatCurrency(1234.567, { currency: 'USD', decimalPlaces: 2 });
	 * // 결과: '$1,234.57'
	 *
	 * FormatUtils.formatCurrency(1234567, { showSymbol: false });
	 * // 결과: '1,234,567'
	 * ```
	 */
	formatCurrency(amount: number, options: CurrencyFormatOptions = {}): string {
		const {
			currency = 'KRW',
			decimalPlaces = 0,
			separator = ',',
			showSymbol = true,
		} = options;

		// 통화 기호 매핑
		const currencySymbols: Record<string, string> = {
			KRW: '₩',
			USD: '$',
			EUR: '€',
			JPY: '¥',
			CNY: '¥',
			GBP: '£',
		};

		// 소수점 자릿수 처리
		const fixedAmount = amount.toFixed(decimalPlaces);
		const [integerPart, decimalPart] = fixedAmount.split('.');

		// 천 단위 구분자 추가
		const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

		// 결과 조합
		let result = formattedInteger;
		if (decimalPlaces > 0 && decimalPart) {
			result += `.${decimalPart}`;
		}

		// 통화 기호 추가
		if (showSymbol) {
			const symbol = currencySymbols[currency] || currency;
			result = `${symbol}${result}`;
		}

		return result;
	}

	/**
	 * Date 객체를 지정된 형식의 문자열로 변환합니다.
	 *
	 * @param date - 포맷팅할 날짜 (Date 객체 또는 ISO 문자열)
	 * @param format - 날짜 포맷 ('YYYY-MM-DD', 'YYYY.MM.DD', 'YYYYMMDD' 등)
	 * @param options - 포맷팅 옵션
	 * @returns 포맷팅된 날짜 문자열
	 *
	 * @example
	 * ```typescript
	 * const date = new Date('2026-01-22T15:30:45');
	 *
	 * FormatUtils.formatDate(date, 'YYYY-MM-DD');
	 * // 결과: '2026-01-22'
	 *
	 * FormatUtils.formatDate(date, 'YYYY.MM.DD', { includeTime: true });
	 * // 결과: '2026.01.22 15:30'
	 *
	 * FormatUtils.formatDate(date, 'YYYY/MM/DD', { includeTime: true, includeSeconds: true });
	 * // 결과: '2026/01/22 15:30:45'
	 * ```
	 */
	formatDate(
		date: Date | string,
		format: string = 'YYYY-MM-DD',
		options: DateFormatOptions = {},
	): string {
		const { includeTime = false, includeSeconds = false, separator = '-' } = options;

		const dateObj = typeof date === 'string' ? new Date(date) : date;

		if (isNaN(dateObj.getTime())) {
			return 'Invalid Date';
		}

		const year = dateObj.getFullYear();
		const month = String(dateObj.getMonth() + 1).padStart(2, '0');
		const day = String(dateObj.getDate()).padStart(2, '0');
		const hours = String(dateObj.getHours()).padStart(2, '0');
		const minutes = String(dateObj.getMinutes()).padStart(2, '0');
		const seconds = String(dateObj.getSeconds()).padStart(2, '0');

		// 포맷 문자열의 구분자 감지
		let dateSeparator = separator;
		if (format.includes('.')) dateSeparator = '.';
		else if (format.includes('/')) dateSeparator = '/';
		else if (format.includes('-')) dateSeparator = '-';
		else dateSeparator = '';

		// 날짜 부분 포맷팅
		let result = format
			.replace('YYYY', String(year))
			.replace('MM', month)
			.replace('DD', day);

		// 시간 부분 추가
		if (includeTime) {
			const timeFormat = includeSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
			result += ` ${timeFormat}`;
		}

		return result;
	}

	/**
	 * 파일 크기를 읽기 쉬운 형식으로 변환합니다.
	 *
	 * @param bytes - 바이트 단위 파일 크기
	 * @param decimals - 소수점 자릿수 (기본값: 2)
	 * @returns 포맷팅된 파일 크기 문자열
	 *
	 * @example
	 * ```typescript
	 * FormatUtils.formatFileSize(1024);
	 * // 결과: '1.00 KB'
	 *
	 * FormatUtils.formatFileSize(1536000);
	 * // 결과: '1.46 MB'
	 *
	 * FormatUtils.formatFileSize(1536000, 0);
	 * // 결과: '1 MB'
	 * ```
	 */
	formatFileSize(bytes: number, decimals: number = 2): string {
		if (bytes === 0) return '0 Bytes';

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
	}

	/**
	 * 숫자를 퍼센트 형식으로 변환합니다.
	 *
	 * @param value - 변환할 값 (0-1 사이의 소수 또는 0-100 사이의 정수)
	 * @param isDecimal - 입력값이 소수(0-1)인지 여부 (기본값: true)
	 * @param decimals - 소수점 자릿수 (기본값: 2)
	 * @returns 포맷팅된 퍼센트 문자열
	 *
	 * @example
	 * ```typescript
	 * FormatUtils.formatPercent(0.1234);
	 * // 결과: '12.34%'
	 *
	 * FormatUtils.formatPercent(75, false);
	 * // 결과: '75.00%'
	 *
	 * FormatUtils.formatPercent(0.1234, true, 1);
	 * // 결과: '12.3%'
	 * ```
	 */
	formatPercent(value: number, isDecimal: boolean = true, decimals: number = 2): string {
		const percentValue = isDecimal ? value * 100 : value;
		return `${percentValue.toFixed(decimals)}%`;
	}

	/**
	 * 숫자를 축약 형식으로 변환합니다 (1K, 1M, 1B 등).
	 *
	 * @param value - 변환할 숫자
	 * @param decimals - 소수점 자릿수 (기본값: 1)
	 * @returns 축약된 숫자 문자열
	 *
	 * @example
	 * ```typescript
	 * FormatUtils.formatCompactNumber(1234);
	 * // 결과: '1.2K'
	 *
	 * FormatUtils.formatCompactNumber(1234567);
	 * // 결과: '1.2M'
	 *
	 * FormatUtils.formatCompactNumber(1234567890);
	 * // 결과: '1.2B'
	 * ```
	 */
	formatCompactNumber(value: number, decimals: number = 1): string {
		if (value < 1000) {
			return value.toString();
		}

		const suffixes = ['', 'K', 'M', 'B', 'T'];
		const tier = Math.floor(Math.log10(Math.abs(value)) / 3);
		const suffix = suffixes[tier];
		const scale = Math.pow(10, tier * 3);
		const scaled = value / scale;

		return `${scaled.toFixed(decimals)}${suffix}`;
	}
})();
