import { useCallback, useState } from 'react';

interface UseMarkerSelectionParams {
  map: google.maps.Map | null;
}

export default function useMarkerSelection({ map }: UseMarkerSelectionParams) {
  const [selectedLodgingId, setSelectedLodgingId] = useState<number | null>(
    null
  );

  // 마커 클릭 => 마커 위치로 이동 + 지도 확대 + InfoWindow 열기/닫기
  const onClickMarker = useCallback(
    ({ id, position }: { id: number; position: google.maps.LatLngLiteral }) =>
      () => {
        if (!map) return;

        // 숙소 마커 클릭 시 InfoWindow 열기/닫기
        setSelectedLodgingId((prev) => (prev === id ? null : id));

        if (id === selectedLodgingId) return;

        map.panTo({ lat: position.lat - 0.001, lng: position.lng });
        const currentZoom = map.getZoom();
        map.setZoom(!currentZoom || currentZoom < 16 ? 16 : currentZoom);
      },
    [map, selectedLodgingId]
  );

  return { selectedLodgingId, onClickMarker };
}
