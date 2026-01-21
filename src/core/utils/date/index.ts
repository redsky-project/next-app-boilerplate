import dayjs, { type Dayjs, type ConfigType } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/ko';

// dayjs 플러그인 및 로케일 설정
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.locale('ko');

/**
 * 날짜를 지정된 형식으로 포맷팅
 * @param date - 포맷팅할 날짜 (Date 객체, 문자열, 숫자, 또는 Dayjs 객체)
 * @param format - 날짜 형식 (기본값: 'YYYY-MM-DD')
 * @returns 포맷팅된 날짜 문자열
 * @example
 * formatDate(new Date(2024, 0, 15), 'YYYY-MM-DD') // '2024-01-15'
 * formatDate('2024-01-15', 'YYYY/MM/DD') // '2024/01/15'
 * formatDate(1705276800000, 'YYYY.MM.DD HH:mm:ss') // '2024.01.15 00:00:00'
 */
export function formatDate(date: ConfigType, format = 'YYYY-MM-DD'): string {
	const d = dayjs(date);
	return d.isValid() ? d.format(format) : '';
}

/**
 * 현재 날짜와 시간을 가져옴
 * @returns Dayjs 객체
 * @example
 * const now = getNow() // 현재 날짜/시간
 */
export function getNow(): Dayjs {
	return dayjs();
}

/**
 * 상대 시간을 반환 (예: "3시간 전", "2일 후")
 * @param date - 비교할 날짜
 * @param withoutSuffix - 접미사 제거 여부 (기본값: false)
 * @returns 상대 시간 문자열
 * @example
 * getRelativeTime('2024-01-15') // '3일 전'
 * getRelativeTime('2024-01-15', true) // '3일'
 */
export function getRelativeTime(date: ConfigType, withoutSuffix = false): string {
	const d = dayjs(date);
	return d.isValid() ? d.fromNow(withoutSuffix) : '';
}

/**
 * 두 날짜 간의 상대 시간을 반환
 * @param date - 기준 날짜
 * @param compareDate - 비교할 날짜
 * @param withoutSuffix - 접미사 제거 여부 (기본값: false)
 * @returns 상대 시간 문자열
 * @example
 * getRelativeTimeTo('2024-01-15', '2024-01-20') // '5일 후'
 */
export function getRelativeTimeTo(
	date: ConfigType,
	compareDate: ConfigType,
	withoutSuffix = false
): string {
	const d = dayjs(date);
	const compare = dayjs(compareDate);
	return d.isValid() && compare.isValid() ? d.from(compare, withoutSuffix) : '';
}

/**
 * 날짜에 일수를 더함
 * @param date - 기준 날짜
 * @param days - 더할 일수
 * @returns Dayjs 객체
 * @example
 * addDays('2024-01-15', 5) // 2024-01-20
 */
export function addDays(date: ConfigType, days: number): Dayjs {
	return dayjs(date).add(days, 'day');
}

/**
 * 날짜에 월수를 더함
 * @param date - 기준 날짜
 * @param months - 더할 월수
 * @returns Dayjs 객체
 * @example
 * addMonths('2024-01-15', 2) // 2024-03-15
 */
export function addMonths(date: ConfigType, months: number): Dayjs {
	return dayjs(date).add(months, 'month');
}

/**
 * 날짜에 년수를 더함
 * @param date - 기준 날짜
 * @param years - 더할 년수
 * @returns Dayjs 객체
 * @example
 * addYears('2024-01-15', 1) // 2025-01-15
 */
export function addYears(date: ConfigType, years: number): Dayjs {
	return dayjs(date).add(years, 'year');
}

/**
 * 날짜에서 일수를 뺌
 * @param date - 기준 날짜
 * @param days - 뺄 일수
 * @returns Dayjs 객체
 * @example
 * subtractDays('2024-01-15', 5) // 2024-01-10
 */
export function subtractDays(date: ConfigType, days: number): Dayjs {
	return dayjs(date).subtract(days, 'day');
}

/**
 * 날짜에서 월수를 뺌
 * @param date - 기준 날짜
 * @param months - 뺄 월수
 * @returns Dayjs 객체
 * @example
 * subtractMonths('2024-01-15', 2) // 2023-11-15
 */
export function subtractMonths(date: ConfigType, months: number): Dayjs {
	return dayjs(date).subtract(months, 'month');
}

/**
 * 날짜에서 년수를 뺌
 * @param date - 기준 날짜
 * @param years - 뺄 년수
 * @returns Dayjs 객체
 * @example
 * subtractYears('2024-01-15', 1) // 2023-01-15
 */
export function subtractYears(date: ConfigType, years: number): Dayjs {
	return dayjs(date).subtract(years, 'year');
}

/**
 * 첫 번째 날짜가 두 번째 날짜보다 이전인지 확인
 * @param date1 - 비교할 첫 번째 날짜
 * @param date2 - 비교할 두 번째 날짜
 * @returns boolean
 * @example
 * isBefore('2024-01-15', '2024-01-20') // true
 */
export function isBefore(date1: ConfigType, date2: ConfigType): boolean {
	return dayjs(date1).isBefore(dayjs(date2));
}

/**
 * 첫 번째 날짜가 두 번째 날짜보다 이후인지 확인
 * @param date1 - 비교할 첫 번째 날짜
 * @param date2 - 비교할 두 번째 날짜
 * @returns boolean
 * @example
 * isAfter('2024-01-20', '2024-01-15') // true
 */
export function isAfter(date1: ConfigType, date2: ConfigType): boolean {
	return dayjs(date1).isAfter(dayjs(date2));
}

/**
 * 두 날짜가 같은지 확인
 * @param date1 - 비교할 첫 번째 날짜
 * @param date2 - 비교할 두 번째 날짜
 * @param unit - 비교 단위 (기본값: 'day')
 * @returns boolean
 * @example
 * isSame('2024-01-15', '2024-01-15') // true
 * isSame('2024-01-15 10:00', '2024-01-15 20:00', 'day') // true
 */
export function isSame(
	date1: ConfigType,
	date2: ConfigType,
	unit: dayjs.OpUnitType = 'day'
): boolean {
	return dayjs(date1).isSame(dayjs(date2), unit);
}

/**
 * 날짜가 오늘인지 확인
 * @param date - 확인할 날짜
 * @returns boolean
 * @example
 * isToday(new Date()) // true
 */
export function isToday(date: ConfigType): boolean {
	return dayjs(date).isSame(dayjs(), 'day');
}

/**
 * 날짜가 어제인지 확인
 * @param date - 확인할 날짜
 * @returns boolean
 * @example
 * isYesterday(subtractDays(new Date(), 1)) // true
 */
export function isYesterday(date: ConfigType): boolean {
	return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
}

/**
 * 날짜가 내일인지 확인
 * @param date - 확인할 날짜
 * @returns boolean
 * @example
 * isTomorrow(addDays(new Date(), 1)) // true
 */
export function isTomorrow(date: ConfigType): boolean {
	return dayjs(date).isSame(dayjs().add(1, 'day'), 'day');
}

/**
 * 날짜의 시작 시간을 반환 (00:00:00)
 * @param date - 기준 날짜
 * @returns Dayjs 객체
 * @example
 * getStartOfDay('2024-01-15 15:30:45') // 2024-01-15 00:00:00
 */
export function getStartOfDay(date: ConfigType): Dayjs {
	return dayjs(date).startOf('day');
}

/**
 * 날짜의 종료 시간을 반환 (23:59:59)
 * @param date - 기준 날짜
 * @returns Dayjs 객체
 * @example
 * getEndOfDay('2024-01-15 15:30:45') // 2024-01-15 23:59:59
 */
export function getEndOfDay(date: ConfigType): Dayjs {
	return dayjs(date).endOf('day');
}

/**
 * 두 날짜 간의 일수 차이를 계산
 * @param date1 - 첫 번째 날짜
 * @param date2 - 두 번째 날짜
 * @returns 일수 차이
 * @example
 * diffInDays('2024-01-20', '2024-01-15') // 5
 */
export function diffInDays(date1: ConfigType, date2: ConfigType): number {
	return dayjs(date1).diff(dayjs(date2), 'day');
}

/**
 * 두 날짜 간의 시간 차이를 계산
 * @param date1 - 첫 번째 날짜
 * @param date2 - 두 번째 날짜
 * @returns 시간 차이
 * @example
 * diffInHours('2024-01-15 15:00', '2024-01-15 10:00') // 5
 */
export function diffInHours(date1: ConfigType, date2: ConfigType): number {
	return dayjs(date1).diff(dayjs(date2), 'hour');
}

/**
 * 두 날짜 간의 분 차이를 계산
 * @param date1 - 첫 번째 날짜
 * @param date2 - 두 번째 날짜
 * @returns 분 차이
 * @example
 * diffInMinutes('2024-01-15 15:30', '2024-01-15 15:00') // 30
 */
export function diffInMinutes(date1: ConfigType, date2: ConfigType): number {
	return dayjs(date1).diff(dayjs(date2), 'minute');
}

/**
 * 요일을 반환 (0: 일요일, 1: 월요일, ..., 6: 토요일)
 * @param date - 확인할 날짜
 * @returns 요일 숫자
 * @example
 * getDayOfWeek('2024-01-15') // 1 (월요일)
 */
export function getDayOfWeek(date: ConfigType): number {
	return dayjs(date).day();
}

/**
 * 요일 이름을 반환
 * @param date - 확인할 날짜
 * @param locale - 로케일 (기본값: 'ko')
 * @returns 요일 이름
 * @example
 * getDayOfWeekName('2024-01-15') // '월요일'
 * getDayOfWeekName('2024-01-15', 'en') // 'Monday'
 */
export function getDayOfWeekName(date: ConfigType, locale = 'ko'): string {
	return dayjs(date).locale(locale).format('dddd');
}

/**
 * 월의 시작일을 반환
 * @param date - 기준 날짜
 * @returns Dayjs 객체
 * @example
 * getStartOfMonth('2024-01-15') // 2024-01-01 00:00:00
 */
export function getStartOfMonth(date: ConfigType): Dayjs {
	return dayjs(date).startOf('month');
}

/**
 * 월의 마지막 날을 반환
 * @param date - 기준 날짜
 * @returns Dayjs 객체
 * @example
 * getEndOfMonth('2024-01-15') // 2024-01-31 23:59:59
 */
export function getEndOfMonth(date: ConfigType): Dayjs {
	return dayjs(date).endOf('month');
}

/**
 * 월의 총 일수를 반환
 * @param date - 기준 날짜
 * @returns 월의 총 일수
 * @example
 * getDaysInMonth('2024-02-15') // 29 (윤년)
 * getDaysInMonth('2023-02-15') // 28
 */
export function getDaysInMonth(date: ConfigType): number {
	return dayjs(date).daysInMonth();
}

/**
 * 날짜가 유효한지 확인
 * @param date - 확인할 날짜
 * @returns boolean
 * @example
 * isValidDate('2024-01-15') // true
 * isValidDate('invalid-date') // false
 */
export function isValidDate(date: ConfigType): boolean {
	return dayjs(date).isValid();
}

/**
 * 날짜가 두 날짜 사이에 있는지 확인
 * @param date - 확인할 날짜
 * @param startDate - 시작 날짜
 * @param endDate - 종료 날짜
 * @param inclusivity - 포함 여부 ('[]', '()', '[)', '(]') (기본값: '[]')
 * @returns boolean
 * @example
 * isBetween('2024-01-15', '2024-01-10', '2024-01-20') // true
 * isBetween('2024-01-10', '2024-01-10', '2024-01-20', '()') // false
 */
export function isBetweenDates(
	date: ConfigType,
	startDate: ConfigType,
	endDate: ConfigType,
	inclusivity: '[]' | '()' | '[)' | '()' = '[]'
): boolean {
	return dayjs(date).isBetween(dayjs(startDate), dayjs(endDate), null, inclusivity);
}

/**
 * 타임스탬프를 날짜로 변환
 * @param timestamp - Unix 타임스탬프 (초 단위)
 * @param format - 날짜 형식 (기본값: 'YYYY-MM-DD HH:mm:ss')
 * @returns 포맷팅된 날짜 문자열
 * @example
 * timestampToDate(1705276800) // '2024-01-15 00:00:00'
 */
export function timestampToDate(timestamp: number, format = 'YYYY-MM-DD HH:mm:ss'): string {
	return dayjs.unix(timestamp).format(format);
}

/**
 * 날짜를 Unix 타임스탬프로 변환 (초 단위)
 * @param date - 변환할 날짜
 * @returns Unix 타임스탬프
 * @example
 * dateToTimestamp('2024-01-15') // 1705276800
 */
export function dateToTimestamp(date: ConfigType): number {
	return dayjs(date).unix();
}

/**
 * dayjs 인스턴스를 직접 반환 (고급 사용을 위해)
 * @param date - 날짜
 * @returns Dayjs 객체
 * @example
 * const d = toDayjs('2024-01-15')
 * d.format('YYYY-MM-DD') // '2024-01-15'
 */
export function toDayjs(date?: ConfigType): Dayjs {
	return dayjs(date);
}
