# Claude Code Project Documentation

이 문서는 Claude Code가 프로젝트를 이해하고 일관성 있는 작업을 수행할 수 있도록 작성된 가이드입니다.

## 프로젝트 개요

**React UI Component Library Monorepo** - Next.js 기반의 재사용 가능한 UI 컴포넌트 라이브러리

### 핵심 기술 스택

- **React 19.1.0** + TypeScript 5.8.2
- **pnpm workspaces** + **Turborepo** (모노레포 관리)
- **Tailwind CSS v4** (주요 스타일링)
- **Radix UI** (접근성 높은 컴포넌트 기반)
- **Storybook** (컴포넌트 문서화)
- **Vitest** (단위 테스트)

## 패키지 구조

### Apps (`/apps/`)

- **`web-examples`** - 모든 UI 컴포넌트 데모 애플리케이션
- **`boilerplate-nextjs`** - Next.js 보일러플레이트
- **`boilerplate-react`** - React 보일러플레이트
- **`server-examples`** - 백엔드 예제

### 핵심 패키지 (`/packages/`)

#### 설정 패키지

- **`@repo/eslint-config`** - ESLint 공통 설정
- **`@repo/prettier-config`** - Prettier 포맷팅 규칙
- **`@repo/tailwind-config`** - Tailwind CSS 공통 설정
- **`@repo/typescript-config`** - TypeScript 컴파일러 설정
- **`@repo/vitest-config`** - 테스트 설정

#### 유틸리티 패키지

- **`@repo/types`** - 공통 TypeScript 타입 정의
- **`@repo/design-tokens`** - 디자인 시스템 토큰 (색상, 타이포그래피, 브레이크포인트)
- **`@repo/hooks`** - 공통 React 훅
- **`@repo/icons`** - 아이콘 컴포넌트 (react-feather 사용)
- **`@repo/utils`** - 유틸리티 함수 (`cn` 클래스 병합 포함)

#### UI 컴포넌트 패키지

- **`@repo/ui`** - Tailwind CSS + Radix UI 기반 메인 컴포넌트 라이브러리
- **`@repo/ui-third-party`** - 써드파티 라이브러리 통합 컴포넌트
- **`@repo/ui-emotion`** - Emotion CSS-in-JS 컴포넌트
- **`@repo/ui-next`** - Next.js 전용 컴포넌트

## 컴포넌트 구조 패턴

### 기본 폴더 구조

```
ComponentName/
├── ComponentName.tsx          # 메인 컴포넌트 구현
├── ComponentName.stories.tsx  # Storybook 스토리
├── ComponentName.test.tsx     # Vitest 단위 테스트 (선택적)
├── styles/                   # 컴포넌트별 스타일 (선택적)
├── context/                  # React 컨텍스트 (복잡한 컴포넌트용)
├── hooks/                    # 컴포넌트별 훅 (선택적)
└── types/                    # 컴포넌트별 TypeScript 타입 (선택적)
```

### 컴포넌트 작성 패턴

#### 1. Modal 패턴 (복잡한 컴포넌트)

```typescript
// Modal.tsx - 메인 컴포넌트
export default function Modal({ children, isOpen, onOpenChange }: ModalProps) {
  // 컨텍스트와 상태 관리 로직
}

// 서브컴포넌트들을 별도 파일로 분리
Modal.Trigger = ModalTrigger; // ModalTrigger.tsx
Modal.Content = ModalContent; // ModalContent.tsx
Modal.Header = ModalHeader; // ModalHeader.tsx
// ...
```

#### 2. Drawer 패턴 (새로 구현된 패턴)

- 각 서브컴포넌트를 개별 파일로 분리
- 메인 컴포넌트에서 default export 사용
- 서브컴포넌트들을 메인 컴포넌트에 연결

#### 3. 단순 컴포넌트 패턴

```typescript
// Button.tsx - 단일 파일에 모든 것 포함
export default function Button({ variant, size, children, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }))} {...props}>{children}</button>
}
```

### 디자인 패턴

1. **Compound Component Pattern** - `Component.SubComponent` 형태
2. **Controlled/Uncontrolled Components** - 유연성을 위한 두 가지 모드 지원
3. **Class Variance Authority (CVA)** - 컴포넌트 변형 관리
4. **Context API** - 복잡한 상태 관리
5. **Radix UI 기반** - 접근성이 보장된 기본 컴포넌트

## 개발 워크플로

### 주요 스크립트 (Turborepo 기반)

```bash
pnpm dev          # 개발 서버 시작
pnpm build        # 모든 패키지 빌드
pnpm lint         # ESLint 실행
pnpm format       # Prettier 포맷팅
pnpm check-types  # TypeScript 타입 체크
pnpm test         # Vitest 테스트 실행
pnpm storybook    # Storybook 시작
```

### Git 워크플로

- **Husky** pre-commit 훅 사용
- **lint-staged**로 커밋 전 코드 품질 검사
- **커밋 메시지 규칙**:
  - **한글 작성** 필수
  - **패턴**: `feat: 컴포넌트명 - 설명` 또는 `chore: 설명`
  - **예시**: `feat: drawer - shadcn/ui 컴포넌트 추가`

## 코딩 컨벤션

### 파일 네이밍

- **PascalCase** - 컴포넌트 파일 (`Button.tsx`)
- **camelCase** - 유틸리티 파일 (`cn.ts`)
- **kebab-case** - 설정 파일 (`lint-staged.config.mjs`)

### Import/Export 패턴

- **Subpath imports** - `#src/*` 패키지 내부 import
- **Workspace dependencies** - `workspace:*` 워크스페이스 의존성
- **Default exports** - 컴포넌트는 기본적으로 default export

### 스타일링 컨벤션

- **Tailwind CSS v4** 우선 사용
- **`cn()` 유틸리티** - 클래스 병합 (clsx + tailwind-merge)
- **CSS Custom Properties** - 디자인 토큰용
- **SCSS modules** - 복잡한 스타일링 시

#### Tailwind CSS 설정 규칙

- **Spacing 단위**: `1px` 기준 (1~600px 범위)
  - 예시: `p-16` = `padding: 16px`, `m-32` = `margin: 32px`
  - 모든 spacing 값은 픽셀 단위로 직관적 사용
- **Border Radius**: 0~100px 범위
  - 예시: `rounded-8` = `border-radius: 8px`, `rounded-32` = `border-radius: 32px`
- **Font Size**: 0~100px 범위
  - 예시: `text-16` = `font-size: 16px`, `text-24` = `font-size: 24px`

#### 프로젝트 색상 시스템

```css
/* 브랜드 색상 */
--color-primary: #2563eb /* 기본 브랜드 색상 */ --color-primary-hover: #3b82f6
  /* 브랜드 호버 색상 */ /* 상태 색상 */ --color-danger: #ef4444 /* 에러/위험 */
  --color-danger-hover: #f87171 /* 에러 호버 */ --color-warning: #fdbd47 /* 경고 */
  --color-success: #14b856 /* 성공 */ /* 기본 색상 */ --color-white: #ffffff --color-black: #000000
  /* Neutral 색상 (50~950) */ --color-neutral-50: #fafafa /* 가장 밝은 배경 */
  --color-neutral-100: #f5f5f5 /* 밝은 배경 */ --color-neutral-500: #737373 /* 중간 텍스트 */
  --color-neutral-900: #171717 /* 어두운 텍스트 */ /* Gray 색상 (50~950) */ --color-gray-50: #f9fafb
  /* 가장 밝은 회색 */ --color-gray-500: #6b7280 /* 중간 회색 */ --color-gray-900: #111827
  /* 어두운 회색 */;
```

#### 색상 사용 예시

- `bg-primary` - 브랜드 색상 배경
- `text-neutral-900` - 어두운 텍스트
- `border-gray-200` - 연한 회색 테두리
- `hover:bg-primary-hover` - 호버 시 브랜드 색상

## 테스트 전략

1. **Unit Testing** - Vitest + React Testing Library
2. **Component Testing** - 각 컴포넌트별 전용 테스트 파일
3. **E2E Testing** - Playwright (web-examples 앱)
4. **Visual Testing** - Storybook 컴포넌트 문서화
5. **한국어 테스트** - 개발자 경험 향상을 위한 한국어 테스트 작성

## Claude Code 작업 가이드

### 새 컴포넌트 추가 시

1. **패키지 선택** - ui (기본), ui-third-party (써드파티 라이브러리 필요시)
2. **구조 결정** - 단순(단일 파일) vs 복잡(분리된 서브컴포넌트)
3. **Storybook 스토리 작성** 필수
4. **기존 패턴 참조** - Modal/Drawer 패턴 또는 Button 같은 단순 패턴

### 컴포넌트 수정 시

1. **기존 구조 유지** - 파일 구조와 import/export 패턴 보존
2. **Storybook 업데이트** - 변경사항 반영
3. **타입 안정성** - TypeScript 타입 정의 유지

### 커밋 시

1. **lint와 typecheck 실행** - `pnpm lint`, `pnpm check-types`
2. **Claude Code 태그 포함** - 커밋 메시지에 Claude 생성 표시

### 빌드 도구 명령어

```bash
# 타입 체크
pnpm check-types

# 린트
pnpm lint

# 테스트
pnpm test

# 빌드
pnpm build
```

### 주의사항

- **기존 파일 우선 수정** - 새 파일 생성보다는 기존 파일 편집 선호
- **Modal 패턴 참조** - 복잡한 컴포넌트 구조 시 `/packages/ui-third-party/src/Modal/` 참조
- **디자인 토큰 사용** - `/packages/design-tokens/` 의 토큰 활용
- **접근성 고려** - Radix UI 프리미티브 우선 사용

## 자주 사용하는 라이브러리

### 스타일링

- **Tailwind CSS v4** - 유틸리티 우선 CSS
- **Class Variance Authority** - 컴포넌트 변형
- **clsx + tailwind-merge** - 클래스 병합

### UI 프리미티브

- **Radix UI** - 접근성 보장된 기본 컴포넌트
- **React Hook Form** - 폼 처리
- **Floating UI** - 팝오버 위치 지정

### 상태 관리

- **Jotai** - 원자적 상태 관리
- **TanStack Query** - 서버 상태

### 개발 도구

- **Storybook** - 컴포넌트 문서화
- **Vitest** - 테스트 프레임워크
- **Playwright** - E2E 테스트
