import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function useResetSearchFilter() {
  const router = useRouter();
  const pathname = usePathname();

  const onReset = useCallback(
    () => router.replace(pathname),
    [pathname, router]
  );

  return { onReset };
}
