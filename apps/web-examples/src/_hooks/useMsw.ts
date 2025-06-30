import { useCallback, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { mswAtom } from '@/_atoms/msw.atom';
// import { appEnv } from '@/_schemas/env.schema';

// MSW 초기화 상태 관리 (MSW 초기화 여부 / MSW가 초기화되기 이전에 API요청을 보내는 것을 컨트롤하기 위해 사용)
export function useIsMswInitialized() {
  const [isMswInitialized, setIsMswInitialized] = useAtom(mswAtom);

  return {
    isMswInitialized,
    setIsMswInitialized,
  };
}

// MSW 초기화
export function useMswInitialize() {
  const isInitialized = useRef(false);
  const { setIsMswInitialized } = useIsMswInitialized();

  const initializeMsw = useCallback(async () => {
    if (typeof window !== 'undefined' && !isInitialized.current) {
      isInitialized.current = true;

      try {
        const { worker } = await import('@/_mocks/browser');
        await worker.start({ onUnhandledRequest: 'bypass' });
        setIsMswInitialized(true);
      } catch (error) {
        console.error('MSW 초기화 중 오류 발생:', error);
        setIsMswInitialized(false);
      }
    }
  }, [setIsMswInitialized]);

  useEffect(() => {
    // 개발 환경이 아닌 경우 MSW 초기화 하지 않음
    // if (appEnv.NODE_ENV !== 'development') return;

    initializeMsw();
  }, [initializeMsw]);
}
