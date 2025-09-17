import { useMutation } from '@tanstack/react-query';
import { logoutApi } from '../_api/auth.api';
import authStorage from '@/app/(client)/refresh-token-rotation/_storages/authStorage';

export default function useLogout() {
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      authStorage.clear();
    },
  });
}
