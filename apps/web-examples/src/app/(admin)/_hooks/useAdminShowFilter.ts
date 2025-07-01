import { useCallback } from 'react';
import { parseAsBoolean, useQueryState } from 'nuqs';

export default function useAdminShowFilter() {
  // 전체: null, 노출: true, 숨김: false
  const [showStatus, setShowStatus] = useQueryState(
    'isShow',
    parseAsBoolean.withOptions({
      history: 'push',
    })
  );

  // 노출 상태 필터 변경
  const onChangeIsShow = useCallback(
    (isShow: boolean | null) => () => setShowStatus(isShow),
    [setShowStatus]
  );

  return { showStatus, onChangeIsShow };
}
