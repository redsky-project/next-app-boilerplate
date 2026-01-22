# 업무(Domain)별 공통함수 구현 가이드

> example 도메인에서만 사용하는 공통 함수를 `_common` 폴더에 생성하고, Function 방식과 Class 방식 두 가지 패턴을 제공합니다.

## 개요

현재 프로젝트는 DDD 패턴으로 구성되어 있으며, 각 도메인은 독립적으로 작업합니다. `src/app/(domains)/example` 도메인에서만 사용하는 공통 함수를 `_common` 폴더에 생성합니다.

참고 URL의 패턴을 따라 Function 방식과 Class 방식 두 가지를 제공하고, 실제 사용 예제도 함께 작성합니다.

## 현재 프로젝트 구조

`src/app/(domains)/example` 폴더는 다음 구조를 가집니다:

- `_action/` - Server Actions
- `_types/` - 타입 정의
- `_components/` - 공통 컴포넌트
- `(pages)/` - 페이지 컴포넌트
- `api/` - API Route Handlers

여기에 `_common/` 폴더를 추가합니다.

## 구현 사항

### 1. 폴더 구조 생성

```
src/app/(domains)/example/
├─ _common/                          # 새로 생성 ✅
│  ├─ string-utils.ts                # Function 방식 예제 ✅
│  ├─ format-utils.ts                # Class 방식 예제 ✅
│  └─ index.ts                       # 통합 export ✅
```

### 2. Function 방식 공통함수 (`string-utils.ts`)

참고 URL의 `maskCardNumber` 함수 패턴을 따라, example 도메인에서 사용할 문자열 처리 함수들을 작성합니다:

- `maskEmail`: 이메일 마스킹 처리
- `formatPhoneNumber`: 전화번호 포맷팅
- `truncateString`: 문자열 자르기
- 각 함수는 TypeScript 인터페이스로 옵션을 정의
- JSDoc 주석으로 상세 설명 추가

**함수 예시**:

```typescript
export interface EmailMaskOptions {
  maskChar?: string;
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
 * maskEmail('example@domain.com');
 * // 결과: 'ex*****@domain.com'
 */
export const maskEmail = (email: string, options?: EmailMaskOptions): string => {
  // 이메일 마스킹 로직
}
```

**구현된 함수들**:

1. **maskEmail(email, options?)** - 이메일 마스킹
   - `maskChar`: 마스킹 문자 (기본값: '*')
   - `visibleStart`: @ 앞에서 보여줄 자릿수 (기본값: 2)

2. **formatPhoneNumber(phoneNumber, options?)** - 전화번호 포맷팅
   - `separator`: 구분자 (기본값: '-')
   - `includeCountryCode`: 국가 코드 포함 여부
   - 한국 전화번호 형식 지원 (010, 02, 지역번호)

3. **truncateString(str, maxLength, options?)** - 문자열 자르기
   - `ellipsis`: 생략 문자 (기본값: '...')
   - `wordBoundary`: 단어 단위로 자를지 여부

### 3. Class 방식 공통함수 (`format-utils.ts`)

참고 URL의 `CardUtils` 클래스 패턴을 따라, Singleton 클래스로 구현합니다:

- 금액 포맷팅 함수
- 날짜 포맷팅 함수
- 파일 크기 포맷팅 함수
- 퍼센트 포맷팅 함수
- 숫자 축약 포맷팅 함수
- 즉시 인스턴스를 생성하여 export (Singleton 패턴)

**클래스 예시**:

```typescript
/**
 * example 업무에서만 사용하는 공통 포맷팅 유틸리티 클래스
 * Singleton 패턴으로 구현
 */
export default new (class FormatUtils {
  formatCurrency(amount: number, options?: CurrencyFormatOptions): string {
    // 금액 포맷팅 로직
  }
  
  formatDate(date: Date | string, format?: string, options?: DateFormatOptions): string {
    // 날짜 포맷팅 로직
  }
  
  formatFileSize(bytes: number, decimals?: number): string {
    // 파일 크기 포맷팅 로직
  }
  
  formatPercent(value: number, isDecimal?: boolean, decimals?: number): string {
    // 퍼센트 포맷팅 로직
  }
  
  formatCompactNumber(value: number, decimals?: number): string {
    // 숫자 축약 포맷팅 로직
  }
})();
```

**구현된 메서드들**:

1. **formatCurrency(amount, options?)** - 금액 포맷팅
   - KRW, USD, EUR, JPY, CNY, GBP 지원
   - 천 단위 구분자, 소수점 자릿수 설정 가능

2. **formatDate(date, format?, options?)** - 날짜 포맷팅
   - 다양한 포맷 지원 (YYYY-MM-DD, YYYY.MM.DD 등)
   - 시간, 초 포함 옵션

3. **formatFileSize(bytes, decimals?)** - 파일 크기 포맷팅
   - Bytes, KB, MB, GB, TB, PB 단위 자동 변환

4. **formatPercent(value, isDecimal?, decimals?)** - 퍼센트 포맷팅
   - 소수(0-1) 또는 정수(0-100) 입력 지원

5. **formatCompactNumber(value, decimals?)** - 숫자 축약
   - 1K, 1M, 1B, 1T 형식으로 축약

### 4. 통합 Export (`index.ts`)

`_common` 폴더의 모든 유틸리티를 한 곳에서 export하여 사용 편의성을 높입니다:

```typescript
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
```

### 5. 사용 예제 페이지 생성

실제 사용 방법을 보여주는 데모 페이지를 작성합니다:

**위치**: `src/app/(domains)/example/(pages)/biz-common/page.tsx`

- Function 방식 사용 예제
- Class 방식 사용 예제
- 각 함수의 결과를 화면에 표시
- 인터랙티브한 데모 제공

**접속 경로**: `http://localhost:3000/example/biz-common`

## 사용 방법

### Import 방법

```typescript
// 방법 1: 통합 import (권장)
import { 
  maskEmail, 
  formatPhoneNumber, 
  truncateString,
  FormatUtils 
} from '@/app/(domains)/example/_common';

// 방법 2: 개별 파일에서 import
import { maskEmail } from '@/app/(domains)/example/_common/string-utils';
import FormatUtils from '@/app/(domains)/example/_common/format-utils';

// 방법 3: 타입까지 함께 import
import { 
  maskEmail, 
  type EmailMaskOptions,
  FormatUtils,
  type CurrencyFormatOptions 
} from '@/app/(domains)/example/_common';
```

### Function 방식 사용 예제

```typescript
import { maskEmail, formatPhoneNumber, truncateString } from '@/app/(domains)/example/_common';

// 이메일 마스킹
const masked = maskEmail('example@domain.com');
// 결과: 'ex*****@domain.com'

const masked2 = maskEmail('example@domain.com', { maskChar: '#', visibleStart: 3 });
// 결과: 'exa####@domain.com'

// 전화번호 포맷팅
const phone = formatPhoneNumber('01012345678');
// 결과: '010-1234-5678'

const phone2 = formatPhoneNumber('01012345678', { separator: ' ' });
// 결과: '010 1234 5678'

const phone3 = formatPhoneNumber('01012345678', { includeCountryCode: true });
// 결과: '+82-10-1234-5678'

// 문자열 자르기
const truncated = truncateString('Hello World Example', 10);
// 결과: 'Hello W...'

const truncated2 = truncateString('Hello World Example', 10, { wordBoundary: true });
// 결과: 'Hello...'
```

### Class 방식 사용 예제

```typescript
import { FormatUtils } from '@/app/(domains)/example/_common';

// 금액 포맷팅
const currency = FormatUtils.formatCurrency(1234567);
// 결과: '₩1,234,567'

const currency2 = FormatUtils.formatCurrency(1234.567, { currency: 'USD', decimalPlaces: 2 });
// 결과: '$1,234.57'

// 날짜 포맷팅
const date = FormatUtils.formatDate(new Date('2026-01-22T15:30:45'), 'YYYY-MM-DD');
// 결과: '2026-01-22'

const date2 = FormatUtils.formatDate(new Date('2026-01-22T15:30:45'), 'YYYY.MM.DD', { 
  includeTime: true 
});
// 결과: '2026.01.22 15:30'

// 파일 크기 포맷팅
const fileSize = FormatUtils.formatFileSize(1536000);
// 결과: '1.46 MB'

// 퍼센트 포맷팅
const percent = FormatUtils.formatPercent(0.1234);
// 결과: '12.34%'

// 숫자 축약
const compact = FormatUtils.formatCompactNumber(1234567);
// 결과: '1.2M'
```

## 주요 특징

1. **TypeScript 지원**: 모든 함수에 타입 정의 제공
2. **두 가지 패턴**: Function과 Class 방식 모두 제공하여 선택 가능
3. **문서화**: JSDoc 주석으로 각 함수 설명
4. **실전 예제**: 실제 사용 가능한 유틸리티 함수들
5. **DDD 패턴 준수**: 도메인 내부에서만 사용하는 공통 함수
6. **옵션 커스터마이징**: 다양한 옵션으로 유연한 사용 가능

## Import 경로 규칙

- **절대 경로**: `@/app/(domains)/example/_common/...`
- **상대 경로**: example 도메인 내부에서는 상대 경로도 사용 가능
- **권장 방식**: 통합 export를 통한 import

## 다른 도메인에 적용하기

다른 도메인(예: account, training 등)에도 동일한 패턴을 적용할 수 있습니다:

```
src/app/(domains)/account/
├─ _common/
│  ├─ account-utils.ts      # account 도메인 전용 유틸리티
│  └─ index.ts

src/app/(domains)/training/
├─ _common/
│  ├─ training-utils.ts     # training 도메인 전용 유틸리티
│  └─ index.ts
```

**중요**: 각 도메인의 공통 함수는 해당 도메인 내에서만 사용해야 합니다. 도메인 간 공통으로 사용해야 하는 함수는 `src/core/utils`에 위치시키세요.

## 참고

- **전역 공통 유틸리티**: `src/core/utils`에 있으며 `@utils`로 import
- **도메인별 공통 함수**: 각 도메인의 `_common` 폴더에 위치
- **프라이빗 폴더**: `_`로 시작하는 폴더는 Next.js App Router에서 라우팅 경로에 포함되지 않음
- **참고 URL**: http://redsky0212.dothome.co.kr/entec/react_assets/guide/docs/assets-docs/dev/use-biz-common-func

## 체크리스트

- [x] `_common` 폴더 생성
- [x] `string-utils.ts` - Function 방식 유틸리티 구현
- [x] `format-utils.ts` - Class 방식 유틸리티 구현
- [x] `index.ts` - 통합 export 파일 작성
- [x] 데모 페이지 작성 (`biz-common/page.tsx`)
- [x] 모든 함수에 TypeScript 타입 정의
- [x] JSDoc 주석으로 문서화
- [x] 린터 에러 없음 확인

---

**작성일**: 2026-01-22  
**프로젝트**: Next.js App Router Boilerplate  
**패턴**: DDD (Domain-Driven Design)
