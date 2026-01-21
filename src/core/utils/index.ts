import { IUtils } from '@app-types/common';
import * as string from './string';
import * as date from './date';
import * as format from './format';
import { hashStringTo32BitInteger } from './common';

/**
 * 전역 유틸리티 객체
 * Server Component와 Client Component 모두에서 사용 가능
 * 
 * @example
 * // Server Component에서
 * import { $utils } from '@/core/utils';
 * const result = $utils.string.toCamelCase('hello-world');
 * 
 * @example
 * // Client Component에서
 * import { $utils } from '@/core/utils';
 * // 또는 window.$utils 사용 가능
 * const result = window.$utils.string.toCamelCase('hello-world');
 */
export const $utils: IUtils = {
	hashStringTo32BitInteger,
	string,
	date,
	format,
};

// 개별 모듈도 export하여 tree-shaking 지원
export { string, date, format, hashStringTo32BitInteger };
