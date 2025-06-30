import useCloseModalsWhenRouteChange from '@/_hooks/useCloseModalsWhenRouteChange';
// import { useMswInitialize } from '@/_hooks/useMsw';
// import { useInterceptor } from '@/app/(client)/_hooks/useInterceptor';
import { useEffect } from 'react';
import ReactModal from 'react-modal';

export default function GlobalInitialization() {
  // MSW 초기화 (Only for development)
  // useMswInitialize();
  // request, response 인터셉터 설정
  // useInterceptor();
  /**
   * @docs https://react.dev/reference/react/useTransition#usetransition
   * "Call useTransition at the top level of your component to mark some state updates as Transitions."
   * 페이지 이동을 감지하기 위해서는 useTransition을 최상위 요소에서 호출해야 함
   */
  // 모달이 열려있는 상태에서 다른 페이지로 이동할 때 모달 닫기
  useCloseModalsWhenRouteChange();

  useEffect(() => {
    ReactModal.setAppElement('body');
  }, []);

  return null;
}
