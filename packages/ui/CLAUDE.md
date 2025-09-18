# @repo/ui 컴포넌트 가이드

이 문서는 `@repo/ui` 패키지의 컴포넌트 카테고리 및 배치 가이드를 정의합니다.

## 컴포넌트 카테고리

### 📂 `disclosure/` - 정보 공개/숨김
정보를 보여주거나 숨기는 인터랙션 컴포넌트

- **Accordion** - 섹션별 정보 접기/펼치기

### 📂 `feedback/` - 사용자 피드백
사용자에게 상태나 액션 결과를 알리는 컴포넌트

- **AlertModal** - 중요한 알림 모달
- **ConfirmModal** - 확인/취소 액션 모달
- **ToastSonner** - Sonner 라이브러리 기반 토스트
- **Toastify** - React-Toastify 기반 토스트

### 📂 `form/` - 폼 입력
사용자 입력을 받는 폼 관련 컴포넌트

- **Calendar** - 날짜 선택 캘린더
- **CheckBox** - 체크박스 입력
- **DatePicker** - 날짜 선택기
- **PhoneNumberInput** - 전화번호 입력
- **Radio** - 라디오 버튼
- **Select** - 드롭다운 선택
- **Slider** - 범위 슬라이더
- **Switch** - 토글 스위치
- **TextInput** - 텍스트 입력
- **Textarea** - 다중 행 텍스트 입력
- **ThousandSeparatorInput** - 천 단위 구분자 숫자 입력

### 📂 `general/` - 범용
일반적으로 사용되는 기본 컴포넌트

- **Button** - 버튼 컴포넌트

### 📂 `loading/` - 로딩
로딩 상태를 표시하는 컴포넌트

- **BarLoading** - 바 형태 로딩
- **FullPageLoading** - 전체 페이지 로딩
- **MultipleCircleLoading** - 다중 원형 로딩
- **PulseLoading** - 펄스 애니메이션 로딩
- **SpinLoading** - 회전 로딩

### 📂 `navigation/` - 내비게이션
페이지 이동이나 탐색과 관련된 컴포넌트

- **Pagination** - 페이지네이션
- **PaginationWithFixedRange** - 고정 범위 페이지네이션

### 📂 `overlay/` - 오버레이
화면 위에 표시되는 레이어 컴포넌트

- **Drawer** - 사이드 서랍 패널
- **Modal** - 모달 다이얼로그
- **Popover** - 팝오버 컨테이너
- **Tooltip** - 툴팁

### 📂 `rich-content/` - 리치 콘텐츠
복잡한 콘텐츠 편집 및 표시 컴포넌트

- **CkEditor** - CKEditor 기반 에디터
- **EditorViewer** - 에디터 내용 뷰어
- **Tiptap** - Tiptap 기반 에디터

## 새 컴포넌트 추가 가이드

### 컴포넌트 배치 기준

1. **disclosure/** - 정보를 보여주거나 숨기는 컴포넌트
   - 예: Accordion, Collapsible, DropdownMenu

2. **feedback/** - 사용자에게 피드백을 제공하는 컴포넌트
   - 예: Alert, Toast, Notification, Progress

3. **form/** - 사용자 입력을 받는 컴포넌트
   - 예: Input, Select, Checkbox, FileUpload

4. **general/** - 범용적으로 사용되는 기본 컴포넌트
   - 예: Button, Badge, Avatar, Card

5. **loading/** - 로딩 상태를 표시하는 컴포넌트
   - 예: Spinner, Skeleton, LoadingBar

6. **navigation/** - 페이지나 섹션 간 이동을 돕는 컴포넌트
   - 예: Breadcrumb, Pagination, Stepper, Tabs

7. **overlay/** - 기존 콘텐츠 위에 표시되는 컴포넌트
   - 예: Modal, Drawer, Popover, Dialog

8. **rich-content/** - 복잡한 콘텐츠 작성/표시 컴포넌트
   - 예: Editor, Table, DataGrid, Chart

### 네이밍 컨벤션

- **PascalCase** 사용 (예: `TextInput`, `DatePicker`)
- **기능을 명확히 표현**하는 이름 선택
- **기존 컴포넌트와 일관성** 유지

### 컴포넌트 구조

각 컴포넌트는 다음 구조를 따름:
```
ComponentName/
├── ComponentName.tsx          # 메인 컴포넌트
├── ComponentName.stories.tsx  # Storybook 스토리
└── ComponentName.test.tsx     # 테스트 (선택적)
```