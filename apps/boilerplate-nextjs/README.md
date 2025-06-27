# Next.js + TypeScript 보일러플레이트

이 프로젝트는 **독립적인 Next.js 프로젝트 생성을 위한 예시 보일러플레이트**입니다.

## 📋 주요 특징

### 🎯 독립성 우선

- **완전한 독립성**: workspace 의존성 완전 제거로 다른 프로젝트로 복사하거나 새로운 저장소로 이동하기 쉽게 설계
- **자체 완결적**: 모든 설정이 프로젝트 내부에 포함되어 있어 외부 의존성 없이 독립적으로 실행 가능
- **유연한 선택**: 프로젝트 성격에 따라 스타일링 방식을 선택할 수 있도록 구성

### 🛠 기술 스택

- **Next.js 15** + **TypeScript** - React 기반 풀스택 프레임워크 (App Router 사용)
- **TanStack Query v5** - 강력한 서버 상태 관리 및 데이터 패칭
- **Jotai** - 원자적 클라이언트 상태 관리
- **React 19** - 최신 React 버전
- **Tailwind CSS v4** - 유틸리티 퍼스트 CSS 프레임워크
- **Storybook** - 컴포넌트 문서화 및 개발

### 🎨 스타일링 옵션 (선택적 사용)

- **Tailwind CSS v4**: 유틸리티 퍼스트 CSS 프레임워크 (기본 설정)
- **Emotion**: CSS-in-JS 라이브러리 (Next.js 컴파일러 설정 포함)

> **⚠️ 중요**: Tailwind와 Emotion은 프로젝트 성격에 따라 **선택적으로 사용**합니다. 둘 다 동시에 사용하지 않습니다.

### 🔧 주요 설정

- **App Router**: Next.js 13+ 새로운 라우팅 시스템 사용
- **Route Groups**: `(client)`, `(admin)` 등으로 라우트 구조화
- **TanStack Query**: SSR 최적화와 강력한 캐싱 기능
- **SVGR 플러그인**: SVG 파일을 React 컴포넌트로 자동 변환
- **절대 경로 설정**: `@/` 별칭으로 src 폴더 참조 가능
- **Turbopack**: 빠른 개발 서버 (개발 모드에서 사용)
- **SEO 최적화**: 메타데이터 API 및 sitemap 설정
- **ESLint + TypeScript**: 코드 품질 관리

## 🚀 사용법

### 개발 서버 실행

```bash
pnpm dev
```

### 빌드

```bash
pnpm build
```

### 프로덕션 실행

```bash
pnpm start
```

### 타입 체크

```bash
pnpm check-types
```

### Storybook 실행

```bash
pnpm storybook
```

## 📁 프로젝트 구조

```
src/
├── app/                    # App Router 기반 라우팅
│   ├── (client)/          # 클라이언트 라우트 그룹
│   │   ├── page.tsx       # 홈 페이지
│   │   ├── test/          # 테스트 페이지들
│   │   ├── _api/          # 클라이언트 API 로직
│   │   ├── _hooks/        # 클라이언트 전용 훅
│   │   └── _storages/     # 클라이언트 저장소 로직
│   ├── (admin)/           # 어드민 라우트 그룹 (예약됨)
│   ├── layout.tsx         # 루트 레이아웃
│   ├── favicon.ico        # 파비콘
│   └── icons.ts           # 아이콘 설정
├── components/
│   └── Providers.tsx      # 전역 상태 관리 Provider
├── lib/
│   └── react-query.ts     # TanStack Query 설정
├── styles/
│   └── globals.css        # 전역 스타일 (Tailwind 포함)
├── theme/
│   └── fonts.ts           # 폰트 설정 (Pretendard)
├── utils/                 # 유틸리티 함수들
├── schemas/               # Zod 스키마 정의
├── common/                # 공통 타입 및 DTO
└── atoms/                 # Jotai 상태 관리
```

### 🗂️ Next.js App Router 구조의 장점

- **🔧 Route Groups**: `(client)`, `(admin)` 등으로 라우트 논리적 분리
- **📈 확장성**: 새로운 페이지나 레이아웃 추가 시 체계적 관리
- **🚀 성능**: 자동 코드 분할 및 최적화된 번들링
- **🔍 SEO**: 메타데이터 API로 페이지별 SEO 최적화
- **👥 협업 친화적**: 팀원들이 직관적으로 라우트 구조를 파악 가능

## 🚀 TanStack Query 핵심 기능 (SSR 최적화)

### 📊 Server-Side Rendering과 함께 사용

```tsx
// 서버 컴포넌트에서 데이터 prefetch
async function HomePage() {
  const queryClient = getQueryClient();

  // 서버에서 데이터 미리 로드
  await queryClient.prefetchQuery({
    queryKey: ['welcome-data'],
    queryFn: fetchWelcomeData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientComponent />
    </HydrationBoundary>
  );
}
```

### 📝 클라이언트 컴포넌트에서 사용

```tsx
'use client';

// 클라이언트 컴포넌트에서 캐시된 데이터 사용
function ClientComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['welcome-data'],
    queryFn: fetchWelcomeData,
    staleTime: 5 * 60 * 1000, // 5분간 fresh
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return <div>{data.welcomeMessage}</div>;
}
```

### 🔄 Server Actions와 함께 사용

```tsx
'use client';

function FormComponent() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: submitFormAction, // Server Action
    onSuccess: () => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['form-data'] });
    },
  });

  return (
    <form action={mutate}>
      <input name="data" />
      <button disabled={isPending}>{isPending ? '제출 중...' : '제출'}</button>
    </form>
  );
}
```

## 🎯 라우팅 구조 예시

### Route Groups 활용

```
app/
├── (client)/              # 클라이언트 면 라우트
│   ├── page.tsx          # / (홈)
│   ├── about/page.tsx    # /about
│   ├── products/         # /products
│   └── contact/page.tsx  # /contact
└── (admin)/              # 어드민 면 라우트
    ├── page.tsx          # /admin (관리자 홈)
    ├── users/page.tsx    # /admin/users
    └── settings/page.tsx # /admin/settings
```

### 동적 라우팅

```tsx
// app/(client)/products/[id]/page.tsx
interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  return <div>상품 ID: {params.id}</div>;
}
```

## 🔍 SEO 최적화 설정

### 정적 메타데이터

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'Amazing Next.js application',
  openGraph: {
    title: 'My Next.js App',
    description: 'Amazing Next.js application',
    type: 'website',
  },
};
```

### 동적 메타데이터

```tsx
// app/(client)/products/[id]/page.tsx
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await fetchProduct(params.id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}
```

## 💡 새 프로젝트 생성 시 참고사항

1. **독립적 복사**: 이 폴더 전체를 복사하여 새로운 프로젝트의 기반으로 사용할 수 있습니다

2. **스타일링 방식 선택**:

   - **Tailwind CSS 프로젝트**: `next.config.ts`에서 emotion 컴파일러 설정 제거
   - **Emotion 프로젝트**: `src/styles/globals.css`에서 Tailwind import 제거

3. **라우트 구조 설계**:

   - Route Groups을 활용하여 논리적으로 라우트 분리
   - 클라이언트/어드민 또는 기능별로 그룹화

4. **환경변수 설정**:

   - `.env.local` 파일 생성 및 필요한 환경변수 추가
   - `src/schemas/env.schema.ts`에서 환경변수 스키마 정의

5. **SEO 설정**:

   - `app/layout.tsx`에서 기본 메타데이터 수정
   - `next-sitemap.config.js`에서 사이트맵 설정

6. **의존성 정리**: 사용하지 않는 라이브러리는 제거하여 번들 크기를 최적화하세요

## 🎨 스타일링 가이드

### Tailwind CSS 사용 시 (권장)

```bash
# 기본 설정으로 바로 사용 가능
# globals.css에 이미 @import 'tailwindcss' 포함됨
```

```typescript
// next.config.ts에서 emotion 컴파일러 설정 제거
const nextConfig: NextConfig = {
  // compiler: {
  //   emotion: true,  // 이 부분 제거 또는 주석 처리
  // },
  // ... 나머지 설정
};
```

### Emotion 사용 시

```bash
# Tailwind 관련 의존성 제거
pnpm remove tailwindcss @tailwindcss/postcss

# globals.css에서 tailwindcss import 제거
# next.config.ts의 emotion 컴파일러 설정은 이미 포함됨
```

## 🚀 성능 최적화 팁

### 1. 번들 분석

```bash
# 번들 분석기 설치
pnpm add -D @next/bundle-analyzer

# 번들 분석 실행
ANALYZE=true pnpm build
```

### 2. 이미지 최적화

```tsx
import Image from 'next/image';

// Next.js Image 컴포넌트 사용
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority // 중요한 이미지에 priority 설정
/>;
```

### 3. 폰트 최적화

```tsx
// src/theme/fonts.ts에 이미 설정됨
import { Pretendard } from './fonts';

// 폰트 preload 및 display swap 최적화 적용됨
```

## 🔧 개발 도구

- **Turbopack**: 개발 서버 고속화 (자동 활성화)
- **TanStack Query DevTools**: 쿼리 상태 모니터링
- **Jotai DevTools**: 원자 상태 디버깅
- **Next.js DevTools**: 성능 및 라우팅 분석
- **TypeScript**: 타입 안전성 및 개발자 경험 향상

이 보일러플레이트는 최신 Next.js 기능들을 활용하여 **확장 가능하고 유지보수가 용이한 웹 애플리케이션**을 빠르게 구축할 수 있도록 설계되었습니다.
