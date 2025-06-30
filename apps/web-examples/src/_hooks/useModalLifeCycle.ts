import { useCallback } from 'react';
import { CLOSE_TIMEOUT_MS } from '@/_constants';
import { updateScrollbarWidth } from '@repo/utils/scrollbar';

export default function useModalLifeCycle() {
  const onAfterOpen = useCallback(() => {
    updateScrollbarWidth();
  }, []);

  const onAfterClose = useCallback(() => {
    /**
     * React Modal은 조건부 렌더링을 할 경우 모달이 닫히더라도
     * body에 ReactModal__Body--open 클래스가 남아있는 이슈가 있어서 직접 제거해줘야 함
     * @docs https://github.com/reactjs/react-modal/issues/888
     */
    setTimeout(() => {
      const existsOpenModal = document.querySelector('.ReactModal__Content--after-open');
      if (existsOpenModal) return;

      document.body.classList.remove('ReactModal__Body--open');
    }, CLOSE_TIMEOUT_MS + 10);
  }, []);

  return { onAfterOpen, onAfterClose };
}
