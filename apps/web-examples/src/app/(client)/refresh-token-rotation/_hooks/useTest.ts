import { useQuery } from '@tanstack/react-query';
import authStorage from '../_storages/authStorage';
import { client } from '../_api/client';

export function useTest() {
  return useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      /**
       * 불필요한 API 요청을 줄이기 위해
       * 액세스 토큰이 존재하지 않는 경우에는 API 요청을 보내지 않음
       */
      const accessToken = authStorage.getAccessToken();
      if (!accessToken) throw null;
      const { data } = await client.get('/test/refresh-token-rotation-1');
      return data;
    },
  });
}
export function useTest2() {
  return useQuery({
    queryKey: ['test2'],
    queryFn: async () => {
      /**
       * 불필요한 API 요청을 줄이기 위해
       * 액세스 토큰이 존재하지 않는 경우에는 API 요청을 보내지 않음
       */
      const accessToken = authStorage.getAccessToken();
      if (!accessToken) throw null;
      const { data } = await client.get('/test/refresh-token-rotation-2');
      return data;
    },
  });
}
export function useTest3() {
  return useQuery({
    queryKey: ['test3'],
    queryFn: async () => {
      /**
       * 불필요한 API 요청을 줄이기 위해
       * 액세스 토큰이 존재하지 않는 경우에는 API 요청을 보내지 않음
       */
      const accessToken = authStorage.getAccessToken();
      if (!accessToken) throw null;
      const { data } = await client.get('/test/refresh-token-rotation-3');
      return data;
    },
  });
}
