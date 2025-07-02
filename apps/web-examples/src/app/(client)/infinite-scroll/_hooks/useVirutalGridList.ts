import { useRef } from 'react';
import { virtualGridListScrollInfoAtom } from '@/app/(client)/infinite-scroll/_atoms/scroll.atom';
import type { MockUser } from '@/_features/user/api/dtos/getUser.dto';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useAtom } from 'jotai';

interface UseVirutalGridListParams {
  flatList: MockUser[];
}

export default function useVirutalGridList({ flatList }: UseVirutalGridListParams) {
  const listRef = useRef<HTMLDivElement>(null);
  // 스크롤 복원
  const [scrollCache, setScrollCache] = useAtom(virtualGridListScrollInfoAtom);

  const virtualizer = useWindowVirtualizer({
    count: Math.ceil(flatList.length / 12), // 2,3,4 최소 공배수로 설정
    estimateSize: (_index) => 400,
    gap: 20,
    /**
     * 현재 보이는 영역(viewport) 외에 추가로 렌더링할 아이템의 수
     * 목적: 사용자가 스크롤할 때 비어있는 공간이 보이지 않도록 "미리" 아이템을 렌더링합니다.
     * 값이 4인 경우: 현재 화면에 보이는 아이템 외에 위로 4개, 아래로 4개의 추가 아이템을 렌더링합니다.
     * 장점: 스크롤 시 더 매끄러운 경험을 제공하고, 빠른 스크롤에서도 빈 공간이 보이지 않습니다.
     * 주의점: 너무 높은 값을 설정하면 불필요한 렌더링이 증가하여 성능이 저하될 수 있습니다.
     */
    overscan: 1,
    /**
     * 가상 리스트의 시작 위치를 조정하는 값
     * 목적: 페이지에서 리스트가 상단에서 바로 시작하지 않는 경우(예: 헤더가 있는 경우) 스크롤 계산을 정확하게 조정합니다.
     * 이 코드에서: listRef.current?.offsetTop은 리스트 컴포넌트의 상단에서 페이지 상단까지의 거리(픽셀)를 가져옵니다.
     * 효과: 스크롤 위치를 계산할 때 리스트의 실제 시작 위치를 고려합니다. 이렇게 하면 스크롤 시 올바른 아이템이 표시됩니다.
     * 필요성: 특히 윈도우 기반 가상화(useWindowVirtualizer)에서 중요합니다. 리스트가 페이지 상단에 없을 때 스크롤 위치 계산을 정확하게 하기 위해 필요합니다.
     */
    scrollMargin: listRef.current?.offsetTop ?? 0,
    /** Scroll Restoration */
    initialOffset: scrollCache?.scrollOffset,
    initialMeasurementsCache: scrollCache?.measurementsCache,
    onChange: (virtualizer) => {
      if (!virtualizer.isScrolling) {
        setScrollCache({
          scrollOffset: virtualizer.scrollOffset ?? 0,
          measurementsCache: virtualizer.measurementsCache,
        });
      }
    },
  });

  return {
    listRef,
    virtualizer,
  };
}
