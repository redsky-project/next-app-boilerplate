/**
 * example 도메인 공통 유틸리티 통합 Export
 *
 * 이 파일은 example 도메인에서만 사용하는 공통 함수들을 한 곳에서 관리합니다.
 *
 * @example
 * ```typescript
 * // Function 방식 사용
 * import { maskEmail, formatPhoneNumber } from '@/app/(domains)/example/_common';
 *
 * // Class 방식 사용
 * import { FormatUtils } from '@/app/(domains)/example/_common';
 *
 * // 개별 파일에서 직접 import
 * import { maskEmail } from '@/app/(domains)/example/_common/string-utils';
 * import FormatUtils from '@/app/(domains)/example/_common/format-utils';
 * ```
 */

// Function 방식 - string-utils.ts
export {
	maskEmail,
	formatPhoneNumber,
	truncateString,
	type EmailMaskOptions,
	type PhoneNumberFormatOptions,
	type TruncateOptions,
} from './string-utils';

// Class 방식 - format-utils.ts
export { default as FormatUtils } from './format-utils';
export type { CurrencyFormatOptions, DateFormatOptions } from './format-utils';
