import { useEffect, useMemo } from 'react';

interface UseGoogleMapDefaultCenterParams {
  map: google.maps.Map | null;
  lat: number;
  lng: number;
}

export default function useGoogleMapDefaultCenter({
  map,
  lat,
  lng,
}: UseGoogleMapDefaultCenterParams) {
  const defaultCenter = useMemo(() => ({ lat, lng }), [lat, lng]);

  // 숙소 목록이 초기화되거나 변경되었을 때 지도 중심 설정
  useEffect(() => {
    if (!map) return;

    map.setCenter({ lat, lng });
    map.setZoom(12);
  }, [lat, lng, map]);

  return { defaultCenter };
}
