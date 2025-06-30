import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useClearModals } from 'react-use-hook-modal';

export default function useCloseModalsWhenRouteChange() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { clearModals } = useClearModals();

  useEffect(() => {
    clearModals();
  }, [clearModals, pathname, searchParams]);
}
