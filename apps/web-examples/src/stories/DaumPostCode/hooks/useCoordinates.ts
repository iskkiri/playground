import { useCallback } from 'react';
import type { ICoordinates } from '../types/coordinates.types';

/**
 * @docs https://apis.map.kakao.com/web/documentation/#services_Geocoder_addressSearch
 */
export default function useCoordinates() {
  const getCoordinatesFromAddress = useCallback((address: string): Promise<ICoordinates | null> => {
    return new Promise((resolve) => {
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (results, status) => {
        if (status !== kakao.maps.services.Status.OK || results.length === 0) {
          resolve(null);
          return;
        }

        const { x, y } = results[0];
        resolve({ latitude: parseFloat(y), longitude: parseFloat(x) });
      });
    });
  }, []);

  return { getCoordinatesFromAddress };
}
