import { useState, useCallback, useMemo, useEffect } from 'react';
import type {
  DragStartEvent,
  UniqueIdentifier,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';

interface UseDragAndDropProps<T extends { id: UniqueIdentifier }> {
  hiddenItemList: T[];
  visibleItemList: T[];
  onMaxVisibleItemsExceeded: () => void;
  maxVisibleItems: number;
}

export function useExposureAndOrderDragAndDrop<
  T extends { id: UniqueIdentifier },
>({
  hiddenItemList,
  visibleItemList,
  onMaxVisibleItemsExceeded,
  maxVisibleItems,
}: UseDragAndDropProps<T>) {
  // 미노출 배너 목록
  const [hiddenItems, setHiddenItems] = useState<T[]>([]);
  // 노출 배너 목록
  const [visibleItems, setVisibleItems] = useState<T[]>([]);

  // 초기화
  useEffect(() => {
    setHiddenItems(hiddenItemList);
    setVisibleItems(visibleItemList);
  }, [hiddenItemList, visibleItemList]);

  // 드래그 중인 아이템 ID
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const activeItem = useMemo(
    () =>
      (hiddenItems.find((item) => item.id === activeId) ||
        visibleItems.find((item) => item.id === activeId)) ??
      null,
    [hiddenItems, visibleItems, activeId]
  );
  // 최대 개수를 초과했을 때 원래 상태로 복구하기 위한 인덱스
  const [hiddenItemIndex, setHiddenItemIndex] = useState<number>(-1);

  const onDragStart = useCallback((e: DragStartEvent) => {
    setActiveId(e.active.id);
  }, []);

  const onDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeContainer = active.data.current?.containerId as
        | 'hidden'
        | 'visible';
      const overContainer = over.data.current?.containerId as
        | 'hidden'
        | 'visible';

      // 같은 컨테이너면 처리하지 않음 (순서 변경은 onDragEnd에서 처리)
      if (activeContainer === overContainer) return;

      const activeItems =
        activeContainer === 'hidden' ? hiddenItems : visibleItems;
      const activeItem = activeItems.find((item) => item.id === active.id);

      if (!activeItem) return;

      // 미노출 -> 노출로 이동 시도할 때
      if (activeContainer === 'hidden' && overContainer === 'visible') {
        // 최대 개수를 초과했을 때 원래 상태로 복구하기 위한 인덱스
        setHiddenItemIndex(
          hiddenItems.findIndex((item) => item.id === active.id)
        );

        setHiddenItems((prev) => prev.filter((item) => item.id !== active.id));
        setVisibleItems((prev) => {
          const overIndex = prev.findIndex((item) => item.id === over.id);
          const newItems = [...prev];
          // over.id가 없는 경우(컨테이너 자체에 드롭하는 경우) 마지막에 추가
          if (overIndex === -1) {
            return [...newItems, activeItem];
          }
          // 아이템 위에 드롭하는 경우 해당 위치에 삽입
          newItems.splice(overIndex, 0, activeItem);
          return newItems;
        });
      } else if (activeContainer === 'visible' && overContainer === 'hidden') {
        setVisibleItems((prev) => prev.filter((item) => item.id !== active.id));
        setHiddenItems((prev) => {
          const overIndex = prev.findIndex((item) => item.id === over.id);
          const newItems = [...prev];
          if (overIndex === -1) {
            return [...newItems, activeItem];
          }
          newItems.splice(overIndex, 0, activeItem);
          return newItems;
        });
      }
    },
    [hiddenItems, visibleItems, setHiddenItems, setVisibleItems]
  );

  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      if (!e.over) return;

      const { active, over } = e;
      const activeContainer = active.data.current?.containerId as
        | 'hidden'
        | 'visible';
      const overContainer = over.data.current?.containerId as
        | 'hidden'
        | 'visible';

      // 다른 아이템 위치로 드롭했을 때만 순서 변경 처리
      const activeItems =
        activeContainer === 'hidden' ? hiddenItems : visibleItems;
      const activeItem = activeItems.find((item) => item.id === active.id);
      if (!activeItem) return;

      // 미노출 -> 노출로 이동 or 노출 -> 노출로 이동
      if (activeContainer === 'visible' && overContainer === 'visible') {
        // 현재 visibleItems의 길이가 이미 (maxVisibleItems + 1) 보다 크거나 같다면
        // (onDragOver에서 이미 추가된 상태이므로 (maxVisibleItems + 1)과 비교)
        if (visibleItems.length >= maxVisibleItems + 1) {
          onMaxVisibleItemsExceeded();

          setHiddenItems((prev) => {
            const newItems = [...prev];
            newItems.splice(hiddenItemIndex, 0, activeItem);
            return newItems;
          });
          setVisibleItems(
            visibleItems.filter((banner) => banner.id !== active.id)
          );
          return;
        }
      }

      const setState =
        activeContainer === 'visible' ? setVisibleItems : setHiddenItems;
      setState((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);

        const newItems = [...prev];
        newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, activeItem);
        return newItems;
      });

      setActiveId(null);
    },
    [
      hiddenItems,
      visibleItems,
      hiddenItemIndex,
      maxVisibleItems,
      onMaxVisibleItemsExceeded,
      setHiddenItems,
      setVisibleItems,
    ]
  );

  return {
    hiddenItems,
    visibleItems,
    activeId,
    activeItem,
    onDragStart,
    onDragOver,
    onDragEnd,
  };
}
