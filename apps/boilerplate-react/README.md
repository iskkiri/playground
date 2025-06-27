# React + TypeScript + Vite 보일러플레이트

이 프로젝트는 **독립적인 React 프로젝트 생성을 위한 예시 보일러플레이트**입니다.

## 📋 주요 특징

### 🎯 독립성 우선

- **완전한 독립성**: workspace 의존성 완전 제거로 다른 프로젝트로 복사하거나 새로운 저장소로 이동하기 쉽게 설계
- **자체 완결적**: 모든 설정이 프로젝트 내부에 포함되어 있어 외부 의존성 없이 독립적으로 실행 가능
- **유연한 선택**: 프로젝트 성격에 따라 스타일링 방식을 선택할 수 있도록 구성

### 🛠 기술 스택

- **React 19** + **TypeScript**
- **Vite** - 빠른 개발 서버 및 빌드 도구
- **React Router v7** - 단순하고 효율적인 라우팅
- **TanStack Query** - 강력한 서버 상태 관리 및 데이터 패칭
- **Jotai** - 원자적 상태 관리
- **React Feather** - 아이콘 라이브러리
- **Storybook** - 컴포넌트 문서화 및 개발

### 🎨 스타일링 옵션 (선택적 사용)

- **Tailwind CSS v4**: 유틸리티 퍼스트 CSS 프레임워크
- **Emotion**: CSS-in-JS 라이브러리 (JSX importSource 설정 포함)

> **⚠️ 중요**: Tailwind와 Emotion은 프로젝트 성격에 따라 **선택적으로 사용**합니다. 둘 다 동시에 사용하지 않습니다.

### 🔧 주요 설정

- **React Router v7**: createBrowserRouter로 깔끔한 라우팅 구성
- **TanStack Query**: 강력한 캐싱과 백그라운드 업데이트 기능
- **SVGR 플러그인**: SVG 파일을 React 컴포넌트로 자동 변환
- **절대 경로 설정**: `@/` 별칭으로 src 폴더 참조 가능
- **ESLint + TypeScript**: 코드 품질 관리
- **선택적 스타일링**: Tailwind 또는 Emotion 중 프로젝트에 맞는 방식 선택

## 🚀 사용법

### 개발 서버 실행

```bash
pnpm dev
```

### 빌드

```bash
pnpm build
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
├── App.tsx                 # 메인 앱 컴포넌트 (단순화됨)
├── main.tsx                # 엔트리 포인트
├── components/
│   └── Providers.tsx       # 전역 상태 관리 Provider
├── layouts/                # 레이아웃 컴포넌트들
│   └── RootLayout.tsx      # 공통 레이아웃 컴포넌트
├── pages/                  # 페이지 컴포넌트
│   ├── HomePage.tsx        # 홈 페이지 (useQuery 예제)
│   ├── AboutPage.tsx       # 소개 페이지 (useMutation 예제)
│   └── ContactPage.tsx     # 연락처 페이지 (고급 TanStack Query 예제)
├── routes/                 # 라우터 설정
│   └── router.tsx          # 단순한 라우팅 설정
├── atoms/                  # Jotai 상태 관리
├── libs/                   # 라이브러리 설정
└── styles/                 # 전역 스타일
```

### 🗂️ 개선된 폴더 구조의 장점

- **🔧 관심사 분리**: 라우팅, 레이아웃, 페이지, 데이터 로직을 각각 분리
- **📈 확장성**: 새로운 페이지나 레이아웃 추가 시 체계적 관리
- **🧹 유지보수성**: 각 기능별로 명확한 위치 지정으로 코드 찾기 쉬움
- **👥 협업 친화적**: 팀원들이 직관적으로 파일 위치를 파악 가능

## 🚀 TanStack Query 핵심 기능

### 📊 useQuery로 데이터 패칭

```tsx
// src/pages/HomePage.tsx - 강력한 캐싱과 백그라운드 업데이트
function HomePage() {
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

### 📝 useMutation으로 폼 처리

```tsx
// src/pages/AboutPage.tsx - 상태 관리가 포함된 폼 처리
function AboutPage() {
  const [feedback, setFeedback] = useState('');

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => setFeedback(''), // 폼 리셋
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate(feedback);
      }}
    >
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        disabled={isPending}
      />
      <button disabled={isPending}>{isPending ? '전송 중...' : '피드백 전송'}</button>
      {isSuccess && <p>전송 완료!</p>}
      {error && <p>오류: {error.message}</p>}
    </form>
  );
}
```

### 🔄 고급 TanStack Query 기능

```tsx
// src/pages/ContactPage.tsx - 고급 기능 활용 예제
function ContactPage() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['contact-info'],
    queryFn: fetchContactInfo,
    staleTime: 15 * 60 * 1000, // 15분간 fresh
    refetchOnWindowFocus: true, // 탭 포커스 시 자동 업데이트
  });

  const { mutate } = useMutation({
    mutationFn: subscribeNewsletter,
    onSuccess: () => {
      // 다른 쿼리 무효화하여 데이터 동기화
      queryClient.invalidateQueries({ queryKey: ['user-data'] });
    },
  });

  return <NewsletterForm onSubmit={mutate} />;
}
```

## 💡 새 프로젝트 생성 시 참고사항

1. **독립적 복사**: 이 폴더 전체를 복사하여 새로운 프로젝트의 기반으로 사용할 수 있습니다
2. **스타일링 방식 선택**:
   - **Tailwind CSS 프로젝트**: `vite.config.ts`에서 emotion 관련 설정 제거
   - **Emotion 프로젝트**: `vite.config.ts`에서 tailwindcss 플러그인 제거
3. **설정 수정**: `package.json`, `vite.config.ts` 등의 설정을 프로젝트에 맞게 수정하세요
4. **의존성 정리**: 사용하지 않는 라이브러리는 제거하여 번들 크기를 최적화하세요
5. **환경변수**: 필요에 따라 `.env` 파일을 추가하고 환경별 설정을 구성하세요

## 🎨 스타일링 가이드

### Tailwind CSS 사용 시

```bash
# Emotion 관련 의존성 제거
pnpm remove @emotion/react @emotion/babel-plugin

# vite.config.ts에서 emotion 설정 제거 후 tailwindcss만 사용
```

### Emotion 사용 시

```bash
# Tailwind 관련 의존성 제거
pnpm remove tailwindcss @tailwindcss/vite

# vite.config.ts에서 tailwindcss 플러그인 제거 후 emotion만 사용
```

이 보일러플레이트는 두 가지 스타일링 방식을 모두 지원하도록 설정되어 있지만,
실제 프로젝트에서는 하나의 방식만 선택하여 사용하는 것을 권장합니다.

## 🏗️ 구조화된 아키텍처

### 📋 관심사 분리 (Separation of Concerns)

- **`src/App.tsx`**: 단순한 Provider와 Router 연결만 담당
- **`src/routes/router.tsx`**: 순수한 라우팅 설정만 집중 관리
- **`src/layouts/`**: 공통 레이아웃 컴포넌트들을 별도 관리
- **`src/pages/`**: TanStack Query를 활용한 데이터 관리와 UI 구현

### 🔧 확장성 고려 설계

- **다중 라우터 지원**: 필요시 admin, public 등 별도 라우터 추가 가능
- **레이아웃 시스템**: DashboardLayout, AuthLayout 등 추가 레이아웃 구성 용이
- **모듈별 분리**: 각 기능이 독립적으로 관리되어 팀 개발에 최적화

## 🎨 컴포넌트 개발

이 보일러플레이트는 완전히 독립적으로 설계되어 있으며, 외부 UI 패키지 의존성이 없습니다.
프로젝트에 필요한 컴포넌트는 다음과 같은 방식으로 구현할 수 있습니다:

- **자체 컴포넌트 라이브러리 구축**
- **외부 UI 라이브러리 사용** (Material-UI, Ant Design, Chakra UI 등)
- **선택한 스타일링 방식에 맞는 컴포넌트 개발**
