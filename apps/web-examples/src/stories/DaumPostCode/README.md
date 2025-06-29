# 다음 우편 번호

다음 주소 API는 우편번호 및 주소만 조회를 할 수 있습니다. 만약 `위도`와 `경도`를 조회해야 하는 경우에는 카카오맵을 추가적으로 연동하여야 합니다.

## 1. 설치

```bash
   pnpm add -D kakao.maps.d.ts
```

## 2. 설정

### 스크립트 추가

```javascript
<script
  type="text/javascript"
  src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 넣으면 됩니다.&libraries=services"
></script>
```

### tsconfig.json에 카카오맵 타입 추가

```typescript
// tsconfig.json
{
  "compilerOptions": {
          .
          .
          .
    "types": ["kakao.maps.d.ts", ...]
  },
          .
          .
          .
}
```
