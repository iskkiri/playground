# 라이브러리 설치

```bash
pnpm add @vis.gl/react-google-maps
```

- 마커 클러스터 설정이 필요한 경우, 추가적으로 아래 라이브러리를 설치합니다.

```bash
pnpm add @googlemaps/markerclusterer
```

> `@react-google-maps/api`가 아닌 `@vis.gl/react-google-maps` 를 사용하는 이유는 [리액트 환경에서 구글맵 팀이 공식적으로 권장하는 라이브러리](https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#0)이기 때문입니다.
> 개인적인 의견을 덧붙이자면 마커를 클릭했을 때 나타나는 InfoWindow를 커스텀하는 작업은 생각보다 까다롭습니다.
> 하지만 [Advanced Markers](https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElement)를 사용하면 마커와 InfoWindow를 훨씬 더 쉽게 커스텀할 수 있습니다.
> 특히, `@vis.gl/react-google-maps`에서는 [<AdvancedMaker />](https://visgl.github.io/react-google-maps/docs/api-reference/components/advanced-marker) 컴포넌트를 제공하여 마커와 InfoWindow를 간단하게 커스텀할 수 있는 장점을 제공합니다.

# 설정

프로젝트 최상위에서 `APIProvider` 로 감싸줍니다. apiKey는 구글맵 자바스크립트 api 키입니다.

```tsx
<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>...</APIProvider>
```
