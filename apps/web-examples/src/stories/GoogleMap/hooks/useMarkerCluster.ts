import { useEffect, useState, useCallback, useMemo } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

interface UseMarkerClusterParams {
  map: google.maps.Map | null;
  clusterStyle: string;
}

export default function useMarkerClusterer({
  map,
  clusterStyle,
}: UseMarkerClusterParams) {
  const [markers, setMarkers] = useState<
    Record<number, google.maps.marker.AdvancedMarkerElement>
  >({});

  // 클러스터를 생성하기 위해서는 마커의 정보가 필요
  const setMarkerRef = useCallback(
    ({
      marker,
      key,
    }: {
      marker: google.maps.marker.AdvancedMarkerElement | null;
      key: number;
    }) => {
      setMarkers((markers) => {
        // !marker && !markers[key]: 새 마커가 없고(marker === null), 해당 키에 기존 마커도 없으면 상태를 변경할 필요가 없음
        // marker && markers[key]: 새 마커(marker)가 있고, 이미 해당 키(key)에 마커가 있다면 상태를 변경할 필요가 없음
        // ex) 필터를 했을 때, 필터하기 이전과 동일한 값이 존재한다면 마커가 중복으로 추가되면 안됨
        if ((!marker && !markers[key]) || (marker && markers[key]))
          return markers;

        // key-value에 마커가 없고 새롭게 업데이트된 marker가 null이 아니면 해당 키에 마커를 추가
        if (marker) {
          return { ...markers, [key]: marker };
        } else {
          // 기존 key-value에 마커가 존재하고, 새롭게 업데이트된 marker가 null이면 해당 키에 대한 마커를 제거
          const { [key]: _, ...newMarkers } = markers;

          return newMarkers;
        }
      });
    },
    []
  );

  // *중요
  // 주석처리된 부분은 마커에 대한 정보를 주입하는 부분
  // 그러나 cluster 인스턴스 생성 시 마커에 대한 정보를 넣어서 생성하면
  // 리렌더링 시 기존 클러스터가 제거되지 않고 누적됨
  // 따라서 cluster 인스턴스 생성 시 마커에 대한 정보를 제외한 채로 생성
  const clusters = useMemo(() => {
    if (!map) return;

    return new MarkerClusterer({
      map,
      // markers: Object.values(markers),
      renderer: {
        render: ({ count, position }) => {
          const div = document.createElement('div');
          div.style.background = clusterStyle;
          div.style.borderRadius = '50%';
          div.style.width = '50px';
          div.style.height = '50px';
          div.style.display = 'flex';
          div.style.justifyContent = 'center';
          div.style.alignItems = 'center';
          div.style.color = '#FFFFFF';
          div.style.fontSize = '14px';
          div.textContent = String(count);

          return new google.maps.marker.AdvancedMarkerElement({
            position,
            content: div,
          });
        },
      },
      onClusterClick: (e) => {
        if (!e.latLng) return;
        map.panTo(e.latLng.toJSON());
        map.setZoom(16);
      },
    });
  }, [clusterStyle, map]);

  // 마커에 대한 정보가 변경되었을 때, 클러스터가 누적되어 생성되지 않도록 처리
  useEffect(() => {
    if (!clusters) return;

    clusters.clearMarkers();
    clusters.addMarkers(Object.values(markers));
  }, [clusters, markers]);

  return setMarkerRef;
}
