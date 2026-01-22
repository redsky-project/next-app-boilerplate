---
name: Router Utility Implementation
overview: $router 객체를 생성하여 push, replace, back 등의 메서드를 제공하고, 클라이언트에서는 내부적으로 Next.js의 useRouter를 자동으로 사용합니다.
todos:
  - id: update-tsconfig
    content: tsconfig.json에 "@router/*" 별칭 추가
    status: completed
  - id: create-router-types
    content: app-common-types.ts에 RouterOptions, IRouter 등 타입 정의 추가
    status: completed
  - id: create-router-util
    content: src/core/router/index.ts 파일 생성 및 $router 객체 구현 (내부 인스턴스 저장 방식)
    status: completed
  - id: create-router-provider
    content: src/core/router/RouterProvider.tsx 컴포넌트 생성하여 $router 내부 인스턴스 업데이트
    status: completed
  - id: integrate-providers
    content: AppProviders에 RouterProvider 통합
    status: completed
  - id: integrate-global-init
    content: global-init.ts에 $router 전역 객체 초기화 추가
    status: completed
---

# $router 객체 구현

## 개요

`redirect`와 `router.push`를 통합한 `$router` 전역 객체를 생성하여 `push`, `replace`, `back` 등의 메서드를 제공합니다. 클라이언트 환경에서는 내부적으로 Next.js의 `useRouter`를 자동으로 사용하여 SPA 네비게이션을 지원합니다.

## 구현 위치

- **라우터 유틸**: [`src/core/router/index.ts`](src/core/router/index.ts) (신규)
- **라우터 프로바이더**: [`src/core/router/RouterProvider.tsx`](src/core/router/RouterProvider.tsx) (신규)
- **타입 정의**: [`src/core/types/common/app-common-types.ts`](src/core/types/common/app-common-types.ts) (업데이트)
- **전역 초기화**: [`src/core/common/providers/global-init.ts`](src/core/common/providers/global-init.ts) (업데이트)
- **프로바이더 통합**: [`src/core/common/providers/AppProviders.tsx`](src/core/common/providers/AppProviders.tsx) (업데이트)
- **TypeScript 설정**: [`tsconfig.json`](tsconfig.json) (업데이트 - @router/* 별칭 추가)

## 핵심 기능

### $router 객체 메서드

```typescript
// 페이지 이동 (히스토리 추가)
$router.push(url: string, options?: RouterOptions)

// 페이지 이동 (히스토리 대체)
$router.replace(url: string, options?: RouterOptions)

// 뒤로 가기
$router.back()

// URL 빌드 헬퍼
$router.buildUrl(path: string, params?: Record<string, any>)
```

### RouterOptions 인터페이스

```typescript
interface RouterOptions {
  scroll?: boolean;           // 스크롤 위치 제어 (기본: true)
  params?: Record<string, any>; // 쿼리 파라미터 객체
}
```

## 아키텍처

### 0. TypeScript 별칭 설정

`tsconfig.json`에 `@router/*` 별칭을 추가하여 깔끔한 import 경로를 제공합니다.

```json
{
  "compilerOptions": {
    "paths": {
      "@router/*": ["./src/core/router/*"]
    }
  }
}
```

### 1. RouterProvider 컴포넌트

클라이언트 환경에서 Next.js의 `useRouter()`를 호출하고 `$router` 객체 내부에 라우터 인스턴스를 저장합니다.

```typescript
// RouterProvider.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { $router } from '@router';

export function RouterProvider({ children }) {
  const router = useRouter();
  
  useEffect(() => {
    // $router 내부 인스턴스만 업데이트
    $router._setRouterInstance(router);
  }, [router]);
  
  return <>{children}</>;
}
```

### 2. $router 객체 구현

환경을 자동 감지하여 적절한 네비게이션 방법을 사용합니다.

```typescript
// src/core/router/index.ts
let nextRouterInstance: any = null;

export const $router = {
  // 내부 메서드: RouterProvider에서 호출
  _setRouterInstance(router: any) {
    nextRouterInstance = router;
  },
  
  push(url: string, options?: RouterOptions) {
    const finalUrl = this.buildUrl(url, options?.params);
    
    // 서버: redirect 사용
    if (typeof window === 'undefined') {
      const { redirect } = require('next/navigation');
      redirect(finalUrl);
    }
    // 클라이언트: 내부 저장된 router 사용
    else if (nextRouterInstance) {
      nextRouterInstance.push(finalUrl, { scroll: options?.scroll ?? true });
    }
  },
  // ... replace, back 등
}
```

**서버 환경**:

- `redirect()` 함수 사용 (Next.js 서버 전용)
- `back()`은 서버에서 사용 불가 (경고 출력)

**클라이언트 환경**:

- `$router` 내부에 저장된 Next.js router 인스턴스 사용 (SPA 네비게이션)
- Next.js의 `router.push()`, `router.replace()`, `router.back()` 호출

### 3. 전역 객체 초기화

`global-init.ts`에서 `window.$router` 전역 객체로 접근 가능하게 설정합니다.

```typescript
// global-init.ts
import { $router } from '@router';

if (typeof window !== 'undefined') {
  window.$router = $router;  // window.$router 하나만!
}
```

## 구현 상세

### push() 메서드 동작

```typescript
let nextRouterInstance: any = null;

export const $router = {
  _setRouterInstance(router: any) {
    nextRouterInstance = router;
  },
  
  push(url: string, options?: RouterOptions) {
    const finalUrl = this.buildUrl(url, options?.params);
    
    if (typeof window === 'undefined') {
      // 서버: redirect 사용
      const { redirect } = require('next/navigation');
      redirect(finalUrl);
    } else if (nextRouterInstance) {
      // 클라이언트: 내부 저장된 router 사용
      nextRouterInstance.push(finalUrl, { scroll: options?.scroll ?? true });
    }
  }
};
```

### replace() 메서드 동작

`push()`와 동일하지만 히스토리 스택을 대체합니다.

```typescript
replace(url: string, options?: RouterOptions) {
  const finalUrl = this.buildUrl(url, options?.params);
  
  if (typeof window === 'undefined') {
    const { redirect } = require('next/navigation');
    redirect(finalUrl);
  } else if (nextRouterInstance) {
    nextRouterInstance.replace(finalUrl, { scroll: options?.scroll ?? true });
  }
}
```

### back() 메서드 동작

```typescript
back() {
  if (typeof window === 'undefined') {
    console.warn('[Router] back() is not available on server');
    return;
  }
  
  if (nextRouterInstance) {
    nextRouterInstance.back();
  }
}
```

### buildUrl() 헬퍼 함수

쿼리 파라미터를 자동으로 URLSearchParams로 변환합니다.

```typescript
buildUrl(path: string, params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) {
    return path;
  }
  
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
}
```

## 사용 예시

### 서버 액션에서 사용

```typescript
'use server';
import { $router } from '@router';

export async function createPostAction(formData: FormData) {
  const result = await createPost(formData);
  
  // 성공 시 결과 페이지로 이동
  $router.push('/posts/success', {
    params: {
      id: result.id,
      message: '게시글이 생성되었습니다'
    }
  });
}
```

### 클라이언트 컴포넌트에서 사용

```typescript
'use client';

export default function MyButton() {
  const handleClick = () => {
    // 방법 1: import하여 사용
    $router.push('/example', {
      scroll: false,
      params: { tab: 'settings' }
    });
    
    // 방법 2: window 전역 객체로 사용
    window.$router.replace('/profile');
  };
  
  return <button onClick={handleClick}>이동</button>;
}
```

### 뒤로 가기

```typescript
'use client';

export default function BackButton() {
  return (
    <button onClick={() => $router.back()}>
      뒤로 가기
    </button>
  );
}
```

### 기존 코드 마이그레이션

**Before**:

```typescript
// 서버 액션
import { redirect } from 'next/navigation';
redirect('/success?id=123');

// 클라이언트
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/example');
```

**After**:

```typescript
// 서버/클라이언트 공통
import { $router } from '@router';

$router.push('/success', { params: { id: 123 } });
$router.push('/example');
```

## 타입 정의

```typescript
// app-common-types.ts
export interface RouterOptions {
  scroll?: boolean;
  params?: Record<string, any>;
}

export interface IRouter {
  _setRouterInstance: (router: any) => void;  // 내부 메서드
  push: (url: string, options?: RouterOptions) => void;
  replace: (url: string, options?: RouterOptions) => void;
  back: () => void;
  buildUrl: (path: string, params?: Record<string, any>) => string;
}

// global.d.ts
declare global {
  interface Window {
    $router: IRouter;  // window.$router만 존재
  }
}
```

## 장점

1. **통일된 API**: 서버/클라이언트 구분 없이 동일한 방식으로 네비게이션
2. **자동 최적화**: 클라이언트에서 자동으로 SPA 네비게이션 사용 (페이지 리로드 없음)
3. **타입 안전성**: TypeScript로 완전한 타입 지원
4. **간편한 쿼리 파라미터**: 객체를 자동으로 query string으로 변환
5. **전역 접근**: `window.$router`로 어디서든 접근 가능
6. **최소 전역 오염**: `window.$router` 하나만 사용하여 깔끔한 전역 네임스페이스
7. **깔끔한 import**: `@router` 별칭으로 간결한 import 경로 제공

## back() 메서드에 대한 이해

### 서버에서 back()이 불가능한 이유

**HTTP 요청-응답 모델의 한계**:

- 서버는 브라우저의 히스토리 스택에 접근할 수 없습니다
- 서버는 HTTP 요청을 받고 응답을 보낼 뿐, 브라우저 환경이 없습니다
- `back()`은 브라우저의 `history.back()` API를 사용하므로 클라이언트 전용입니다

**redirect vs back의 차이**:

```typescript
// redirect: 서버가 HTTP 302/307 리다이렉트 응답 전송
redirect('/new-page');  // ✅ 서버 가능

// back: 브라우저 히스토리 스택 조작
history.back();  // ❌ 서버 불가능 (브라우저에만 존재)
```

### 전통적인 SSR 사이트들의 back 처리 방법

일반적인 SSR 사이트(PHP, JSP, Django 등)도 서버에서 back을 처리하지 않습니다:

1. **브라우저 기본 back 버튼**: 사용자가 브라우저의 ← 버튼 클릭
2. **클라이언트 스크립트**: `<button onclick="history.back()">뒤로 가기</button>`
3. **이전 URL 직접 전달**: `<a href="/previous-page">뒤로 가기</a>`

### 실제 사용 패턴

**Client Component에서 사용**:

```typescript
'use client';

export function BackButton() {
  return (
    <button onClick={() => $router.back()}>
      뒤로 가기
    </button>
  );
}
```

**Server Action에서는 redirect 사용**:

```typescript
'use server';

export async function createPostAction(formData: FormData) {
  const result = await savePost(formData);
  
  // ✅ back()이 아닌 다음 페이지로 이동
  $router.push('/posts/success', {
    params: { id: result.id }
  });
}
```

**왜 Server Action에서 back()을 호출하지 않나?**:

- back()은 사용자 인터랙션(버튼 클릭)의 결과 → 항상 Client Component에서 처리
- Server Action의 목적은 데이터 처리 후 결과 페이지로 이동 → redirect() 사용

## 주의사항

1. **서버에서의 back()**

   - `back()`은 클라이언트 전용 메서드입니다
   - 서버에서 호출 시 경고 메시지만 출력하고 동작하지 않습니다
   - 실제 프로젝트에서 Server Action 내에서 back()을 호출할 일은 없습니다

2. **redirect의 특성**

   - 서버 환경에서 `redirect()`는 내부적으로 에러를 throw하여 함수를 종료시킵니다
   - `$router.push()` 이후의 코드는 실행되지 않습니다

3. **RouterProvider 필수**

   - 클라이언트에서 정상 동작하려면 `RouterProvider`가 반드시 필요합니다
   - `AppProviders`에서 자동으로 포함됩니다
