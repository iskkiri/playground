import { useCallback, useMemo } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import FeatherIcons from '@repo/icons/featherIcons';

interface HouseMarkerProps {
  housingId: number;
  latitude: number;
  longitude: number;
  setHouseMarkerRef: (params: {
    marker: google.maps.marker.AdvancedMarkerElement | null;
    key: number;
  }) => void;
}

export default function HouseMarker({
  housingId,
  latitude,
  longitude,
  setHouseMarkerRef,
}: HouseMarkerProps) {
  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement) => {
      setHouseMarkerRef({ key: housingId, marker });
    },
    [setHouseMarkerRef, housingId]
  );

  const position = useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude]);

  return (
    <AdvancedMarker
      //
      key={housingId}
      ref={ref}
      position={position}
    >
      <FeatherIcons.MapPin fill="red" color="white" size={36} />
    </AdvancedMarker>
  );
}
